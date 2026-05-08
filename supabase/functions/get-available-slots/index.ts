import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/* get-available-slots
   Stöder både ett enskilt treatment_id (legacy) och en kommaseparerad
   lista treatment_ids – behandlingarnas duration summeras så vi hittar
   en sammanhängande lucka som rymmer hela besöket. */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const url = new URL(req.url);
    const date = url.searchParams.get("date");
    const treatmentIdsParam =
      url.searchParams.get("treatment_ids") ?? url.searchParams.get("treatment_id");

    if (!date || !treatmentIdsParam) {
      return json({ error: "date and treatment_ids required" }, 400);
    }

    const treatmentIds = treatmentIdsParam.split(",").map((s) => s.trim()).filter(Boolean);
    if (treatmentIds.length === 0 || treatmentIds.length > 3) {
      return json({ error: "1–3 treatment_ids required" }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Hämta alla efterfrågade behandlingar och summera duration
    const { data: treatments, error: tErr } = await supabase
      .from("booking_treatments")
      .select("id, duration_minutes")
      .in("id", treatmentIds)
      .eq("active", true);

    if (tErr || !treatments || treatments.length !== treatmentIds.length) {
      return json({ error: "Treatment not found" }, 404);
    }

    const durationMin: number = treatments.reduce(
      (sum, t) => sum + (t.duration_minutes ?? 0),
      0,
    );

    const dayOfWeek = new Date(date + "T12:00:00Z").getDay() || 7;

    const { data: rules } = await supabase
      .from("availability_rules")
      .select("start_time, end_time")
      .eq("day_of_week", dayOfWeek);

    if (!rules || rules.length === 0) return json({ slots: [] });

    const { data: blocked } = await supabase
      .from("blocked_times")
      .select("start_time, end_time, all_day")
      .eq("blocked_date", date);

    const { data: existing } = await supabase
      .from("bookings")
      .select("start_time, end_time")
      .eq("booking_date", date)
      .neq("status", "cancelled");

    const toMinutes = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };
    const pad = (n: number) => String(n).padStart(2, "0");
    const fromMinutes = (m: number) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;

    const isBlocked = (slotStart: number, slotEnd: number): boolean => {
      if (blocked) {
        for (const b of blocked) {
          if (b.all_day) return true;
          if (b.start_time && b.end_time) {
            const bs = toMinutes(b.start_time);
            const be = toMinutes(b.end_time);
            if (slotStart < be && slotEnd > bs) return true;
          }
        }
      }
      if (existing) {
        for (const e of existing) {
          const es = toMinutes(e.start_time);
          const ee = toMinutes(e.end_time);
          if (slotStart < ee && slotEnd > es) return true;
        }
      }
      return false;
    };

    const slots: string[] = [];
    for (const rule of rules) {
      const windowStart = toMinutes(rule.start_time);
      const windowEnd = toMinutes(rule.end_time);
      for (let s = windowStart; s + durationMin <= windowEnd; s += 30) {
        if (!isBlocked(s, s + durationMin)) slots.push(fromMinutes(s));
      }
    }

    return json({ slots, total_duration_minutes: durationMin });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("get-available-slots:", msg);
    return json({ error: msg }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}
