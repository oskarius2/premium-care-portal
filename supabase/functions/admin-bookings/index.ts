import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  // Auth check
  const auth = req.headers.get("Authorization") ?? "";
  const token = auth.replace("Bearer ", "");
  if (token !== Deno.env.get("ADMIN_SECRET")) {
    return json({ error: "Unauthorized" }, 401);
  }

  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SERVICE_ROLE_KEY");
  if (!serviceRoleKey) {
    return json({ error: "Supabase service role key is not configured" }, 500);
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    serviceRoleKey
  );

  const url = new URL(req.url);
  const resource = url.searchParams.get("resource") ?? "bookings";

  // ── Bookings ────────────────────────────────────────────────────
  if (resource === "bookings") {
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, booking_treatments(name, duration_minutes, category)")
        .order("booking_date", { ascending: true })
        .order("start_time", { ascending: true });
      if (error) return json({ error: error.message }, 500);
      return json({ bookings: data });
    }

    if (req.method === "PATCH") {
      const { id, status } = await req.json();
      if (!id || !status) return json({ error: "id and status required" }, 400);
      const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true });
    }
  }

  // ── Availability rules ───────────────────────────────────────────
  if (resource === "availability") {
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("availability_rules")
        .select("*")
        .order("day_of_week")
        .order("start_time");
      if (error) return json({ error: error.message }, 500);
      return json({ rules: data });
    }

    if (req.method === "POST") {
      const { day_of_week, start_time, end_time } = await req.json();
      const { error } = await supabase
        .from("availability_rules")
        .insert({ day_of_week, start_time, end_time });
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true });
    }

    if (req.method === "DELETE") {
      const id = url.searchParams.get("id");
      if (!id) return json({ error: "id required" }, 400);
      const { error } = await supabase.from("availability_rules").delete().eq("id", id);
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true });
    }
  }

  // ── Blocked times ────────────────────────────────────────────────
  if (resource === "blocked") {
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("blocked_times")
        .select("*")
        .order("blocked_date");
      if (error) return json({ error: error.message }, 500);
      return json({ blocked: data });
    }

    if (req.method === "POST") {
      const { blocked_date, start_time, end_time, all_day, reason } = await req.json();
      const { error } = await supabase
        .from("blocked_times")
        .insert({ blocked_date, start_time: all_day ? null : start_time, end_time: all_day ? null : end_time, all_day: all_day ?? false, reason });
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true });
    }

    if (req.method === "DELETE") {
      const id = url.searchParams.get("id");
      if (!id) return json({ error: "id required" }, 400);
      const { error } = await supabase.from("blocked_times").delete().eq("id", id);
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true });
    }
  }

  return json({ error: "Unknown resource" }, 404);
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}
