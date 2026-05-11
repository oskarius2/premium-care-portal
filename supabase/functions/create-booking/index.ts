import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { brand } from "../_shared/brand.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type InsertBookingRow = {
  treatment_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  message: string | null;
  status: "confirmed";
};

const pad = (n: number) => String(n).padStart(2, "0");
const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const toTime = (mm: number) => `${pad(Math.floor(mm / 60))}:${pad(mm % 60)}`;

/* create-booking
   Stöder två lägen:
     1) Enskild bokning (legacy):    { treatment_id, booking_date, start_time, ... }
     2) Kombinerat besök (NYTT):     { treatment_ids: [], booking_date, start_time, ... }
        – behandlingarna utförs efter varandra under samma besök, en
          databas-rad per behandling med på varandra följande tider så
          slot-search ser hela blocket som upptaget.
   Klienten anropar create-booking en gång per "besök" så flera separata
   besök blir flera anrop – inte detta endpoints ansvar att kedja samman dem. */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const body = await req.json();
    const {
      treatment_id,
      treatment_ids,
      booking_date,
      start_time,
      customer_name,
      customer_email,
      customer_phone,
      message,
    } = body;

    const ids: string[] = Array.isArray(treatment_ids) && treatment_ids.length > 0
      ? treatment_ids
      : (treatment_id ? [treatment_id] : []);

    if (ids.length === 0 || ids.length > 3 || !booking_date || !start_time || !customer_name || !customer_email) {
      return json({ error: "Missing required fields" }, 400);
    }

    // Grundvalidering av format så vi inte gör onödig DB-trafik
    if (!/^\d{4}-\d{2}-\d{2}$/.test(booking_date)) {
      return json({ error: "Ogiltigt datumformat" }, 400);
    }
    if (!/^\d{2}:\d{2}(:\d{2})?$/.test(start_time)) {
      return json({ error: "Ogiltigt tidsformat" }, 400);
    }

    // Swedish law: 48 h reflection period for aesthetic treatments.
    const BETANKETID_MS = 48 * 60 * 60 * 1000;
    const slotDateTime = new Date(`${booking_date}T${start_time.length === 5 ? start_time + ":00" : start_time}`);
    if (slotDateTime.getTime() - Date.now() < BETANKETID_MS) {
      return json({ error: "Tiden måste ligga minst 48 timmar fram i tiden enligt 48h-regeln för betänketid" }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Hämta alla behandlingar i den ordning klienten skickade dem
    const { data: treatmentRows, error: tErr } = await supabase
      .from("booking_treatments")
      .select("id, name, duration_minutes")
      .in("id", ids)
      .eq("active", true);

    if (tErr || !treatmentRows || treatmentRows.length !== ids.length) {
      return json({ error: "Treatment not found" }, 404);
    }

    // Bevara klientens ordning
    const treatments = ids.map((id) => treatmentRows.find((t) => t.id === id)!);
    const totalDuration = treatments.reduce((sum, t) => sum + t.duration_minutes, 0);

    // Total slut-tid för konfliktcheck
    const startMin = toMin(start_time);
    const endMin = startMin + totalDuration;
    const overall_end = toTime(endMin);

    // ── Server-side validering: tiden måste rymmas inom en availability_rule
    //    och får inte överlappa blocked_times. Detta dubblerar logiken i
    //    get-available-slots så att en illvillig eller buggig klient inte kan
    //    POSTa en bokning utanför öppettiderna.
    const dayOfWeek = new Date(booking_date + "T12:00:00Z").getDay() || 7;

    const { data: rules } = await supabase
      .from("availability_rules")
      .select("start_time, end_time")
      .eq("day_of_week", dayOfWeek);

    const fitsInARule = (rules ?? []).some((r) => {
      const ws = toMin(r.start_time);
      const we = toMin(r.end_time);
      return startMin >= ws && endMin <= we;
    });

    if (!fitsInARule) {
      return json({ error: "Tiden ligger utanför öppettiderna" }, 409);
    }

    const { data: blocked } = await supabase
      .from("blocked_times")
      .select("start_time, end_time, all_day")
      .eq("blocked_date", booking_date);

    const overlapsBlocked = (blocked ?? []).some((b) => {
      if (b.all_day) return true;
      if (!b.start_time || !b.end_time) return false;
      const bs = toMin(b.start_time);
      const be = toMin(b.end_time);
      return startMin < be && endMin > bs;
    });

    if (overlapsBlocked) {
      return json({ error: "Tiden är spärrad" }, 409);
    }

    // Konfliktkontroll mot hela blocket
    const { data: conflicts } = await supabase
      .from("bookings")
      .select("id")
      .eq("booking_date", booking_date)
      .neq("status", "cancelled")
      .lt("start_time", overall_end)
      .gt("end_time", start_time);

    if (conflicts && conflicts.length > 0) {
      return json({ error: "Tiden är inte längre tillgänglig" }, 409);
    }

    // Bygg en bokningsrad per behandling, på varandra följande
    const rows: InsertBookingRow[] = [];
    let cursor = startMin;
    for (const t of treatments) {
      const s = toTime(cursor);
      const e = toTime(cursor + t.duration_minutes);
      rows.push({
        treatment_id: t.id,
        booking_date,
        start_time: s,
        end_time: e,
        customer_name,
        customer_email,
        customer_phone: customer_phone ?? null,
        // Endast sätt meddelande på första raden för att inte duplicera
        message: rows.length === 0 ? (message ?? null) : null,
        status: "confirmed",
      });
      cursor += t.duration_minutes;
    }

    const { data: inserted, error: bErr } = await supabase
      .from("bookings")
      .insert(rows)
      .select("id");

    if (bErr || !inserted || inserted.length === 0) {
      console.error("Booking insert error:", bErr);
      return json({ error: "Kunde inte skapa bokning" }, 500);
    }

    // Bekräftelsemail – en mail per besök, lista alla behandlingar.
    // Slår vi ut på Resend ska bokningen ändå räknas som skapad.
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      try {
        const dateFormatted = new Date(booking_date + "T12:00:00Z").toLocaleDateString("sv-SE", {
          weekday: "long", year: "numeric", month: "long", day: "numeric",
        });
        const treatmentList = treatments.map((t) => t.name).join(" + ");
        const subject = treatments.length > 1
          ? `Konsultationsbekräftelse – ${treatments.length} områden`
          : `Konsultationsbekräftelse – ${treatments[0].name}`;

        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: brand.fromEmail,
            to: [customer_email],
            subject,
            html: emailHtml({
              name: customer_name,
              treatment: treatmentList,
              date: dateFormatted,
              time: `${start_time}–${overall_end}`,
            }),
          }),
        });

        if (!resendRes.ok) {
          const txt = await resendRes.text();
          console.error("Resend non-OK:", resendRes.status, txt);
        }
      } catch (mailErr) {
        // Logga men misslyckas inte själva bokningen pga mailfel.
        console.error("Resend send failed:", mailErr);
      }
    }

    return json({
      booking_id: inserted[0].id,
      booking_ids: inserted.map((r) => r.id),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("create-booking:", msg);
    return json({ error: msg }, 500);
  }
});

function emailHtml({ name, treatment, date, time }: {
  name: string; treatment: string; date: string; time: string;
}) {
  return `<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f1ee;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f1ee;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;max-width:560px;width:100%;">
        <tr>
          <td style="background:#1a1614;padding:40px 48px 36px;">
            <p style="margin:0;font-family:'Georgia',serif;font-size:22px;color:#ffffff;letter-spacing:2px;line-height:1.25;">
              ${escapeHtml(brand.name)}
            </p>
            <p style="margin:8px 0 0;font-size:10px;letter-spacing:3px;color:#888;text-transform:uppercase;">
              ${escapeHtml(brand.tagline)} · ${escapeHtml(brand.city)}
            </p>
          </td>
        </tr>
        <tr><td style="height:3px;background:#c0606a;"></td></tr>
        <tr>
          <td style="padding:48px 48px 40px;">
            <p style="margin:0 0 8px;font-size:10px;letter-spacing:3px;color:#c0606a;text-transform:uppercase;">
              Konsultationsbekräftelse
            </p>
            <h1 style="margin:0 0 32px;font-size:28px;font-weight:normal;color:#1a1614;line-height:1.2;">
              Välkommen, ${escapeHtml(name)}.
            </h1>
            <p style="margin:0 0 32px;font-size:15px;color:#555;line-height:1.7;font-family:sans-serif;">
              Din konsultation är bekräftad. Första besöket gäller konsultation och viktig information, inte behandling.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e2dd;margin-bottom:32px;">
              <tr>
                <td style="padding:20px 24px;border-bottom:1px solid #e8e2dd;">
                  <p style="margin:0 0 4px;font-size:9px;letter-spacing:3px;color:#999;text-transform:uppercase;font-family:sans-serif;">Konsultation om</p>
                  <p style="margin:0;font-size:16px;color:#1a1614;">${escapeHtml(treatment)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 24px;border-bottom:1px solid #e8e2dd;">
                  <p style="margin:0 0 4px;font-size:9px;letter-spacing:3px;color:#999;text-transform:uppercase;font-family:sans-serif;">Datum</p>
                  <p style="margin:0;font-size:16px;color:#1a1614;text-transform:capitalize;">${escapeHtml(date)}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0 0 4px;font-size:9px;letter-spacing:3px;color:#999;text-transform:uppercase;font-family:sans-serif;">Tid</p>
                  <p style="margin:0;font-size:16px;color:#1a1614;">${escapeHtml(time)}</p>
                </td>
              </tr>
            </table>
            <p style="margin:0 0 8px;font-size:13px;color:#777;line-height:1.7;font-family:sans-serif;">
              För estetiska injektionsbehandlingar gäller 48 timmars betänketid efter konsultation. Eventuell behandling planeras först därefter.
            </p>
            <p style="margin:0 0 8px;font-size:13px;color:#777;line-height:1.7;font-family:sans-serif;">
              Vid frågor eller avbokning (senast 24 timmar innan) — kontakta oss direkt.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 48px;border-top:1px solid #e8e2dd;">
            <p style="margin:0;font-size:10px;letter-spacing:2px;color:#aaa;text-transform:uppercase;font-family:sans-serif;">
              ${escapeHtml(brand.name)} · Legitimerade sjuksköterskor · ${escapeHtml(brand.city)}
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}
