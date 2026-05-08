import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { brand } from "../_shared/brand.ts";

type BookingIcalRow = {
  id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  customer_name: string;
  treatment_id: string;
  created_at: string;
  booking_treatments?: { name?: string | null } | null;
};

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (token !== Deno.env.get("ADMIN_SECRET")) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: bookings } = await supabase
    .from("bookings")
    .select("id, booking_date, start_time, end_time, customer_name, treatment_id, created_at, booking_treatments(name)")
    .neq("status", "cancelled")
    .order("booking_date", { ascending: true });

  const now = formatIcalDate(new Date());

  const events = ((bookings ?? []) as BookingIcalRow[]).map((b) => {
    const dtstart = toIcalDateTime(b.booking_date, b.start_time);
    const dtend = toIcalDateTime(b.booking_date, b.end_time);
    const treatmentName = b.booking_treatments?.name ?? "Behandling";
    const uid = `${b.id}@${brand.domain}`;

    return [
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${now}`,
      `DTSTART;TZID=Europe/Stockholm:${dtstart}`,
      `DTEND;TZID=Europe/Stockholm:${dtend}`,
      `SUMMARY:${icalEscape(`${treatmentName} – ${b.customer_name}`)}`,
      `DESCRIPTION:${icalEscape(`Behandling: ${treatmentName}\nKund: ${b.customer_name}`)}`,
      "END:VEVENT",
    ].join("\r\n");
  });

  const calName = `${brand.name} Bokningar`;
  const fileSafe = brand.domain.replace(/[^a-z0-9.-]/gi, "-");

  const ical = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${brand.name}//Bokningar//SV`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${icalEscape(calName)}`,
    "X-WR-TIMEZONE:Europe/Stockholm",
    ...events,
    "END:VCALENDAR",
  ].join("\r\n");

  return new Response(ical, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${fileSafe}-bokningar.ics"`,
    },
  });
});

function formatIcalDate(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function toIcalDateTime(date: string, time: string): string {
  const [y, mo, day] = date.split("-");
  const [h, m] = time.split(":");
  // Lokal tid (Europe/Stockholm) — TZID sätts på DTSTART/DTEND-raden.
  return `${y}${mo}${day}T${h}${m}00`;
}

function icalEscape(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}
