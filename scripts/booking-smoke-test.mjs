#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const envPath = resolve(process.cwd(), ".env");
if (existsSync(envPath)) {
  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [rawKey, ...rawValue] = trimmed.split("=");
    const key = rawKey.trim();
    if (process.env[key]) continue;
    process.env[key] = rawValue.join("=").trim().replace(/^["']|["']$/g, "");
  }
}

const url = (process.env.VITE_SUPABASE_URL ?? "").trim().replace(/\/$/, "");
const key = (process.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "").trim();
const treatmentSlug = process.env.BOOKING_SMOKE_TREATMENT ?? "fillers";
const shouldCreate = process.env.BOOKING_SMOKE_CREATE === "true";
const customerEmail = process.env.BOOKING_SMOKE_EMAIL ?? "testbokning@example.com";

const fail = (message, details) => {
  console.error(`\nBooking smoke test failed: ${message}`);
  if (details) console.error(details);
  process.exit(1);
};

if (!url || !key || url.includes("your-project-id") || key.includes("your-anon-key")) {
  fail(
    "missing Supabase client env",
    "Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env or the shell.",
  );
}

const headers = {
  apikey: key,
  Authorization: `Bearer ${key}`,
  "Content-Type": "application/json",
};

const requestJson = async (input, init) => {
  const res = await fetch(input, init);
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  return { res, data };
};

const localDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const isLikelyMissingFunction = (res, data) =>
  res.status === 404 &&
  typeof data === "object" &&
  data !== null &&
  data.sb_error_code === "NOT_FOUND";

console.log("Checking booking_treatments...");
const treatmentsUrl = `${url}/rest/v1/booking_treatments?select=id,slug,name,duration_minutes&active=eq.true`;
const treatmentsResult = await requestJson(treatmentsUrl, { headers });
if (!treatmentsResult.res.ok || !Array.isArray(treatmentsResult.data)) {
  fail(
    `could not read booking_treatments (${treatmentsResult.res.status})`,
    JSON.stringify(treatmentsResult.data, null, 2),
  );
}

const treatment = treatmentsResult.data.find((row) => row.slug === treatmentSlug);
if (!treatment) {
  fail(
    `active treatment "${treatmentSlug}" was not found`,
    `Active treatments: ${treatmentsResult.data.map((row) => row.slug).join(", ") || "(none)"}`,
  );
}
console.log(`Found treatment: ${treatment.name} (${treatment.id})`);

console.log("Searching for available slots...");
let picked;
for (let offset = 3; offset <= 21; offset += 1) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const bookingDate = localDate(date);
  const slotsUrl = `${url}/functions/v1/get-available-slots?date=${bookingDate}&treatment_id=${encodeURIComponent(treatment.id)}`;
  const slotsResult = await requestJson(slotsUrl, { headers });

  if (isLikelyMissingFunction(slotsResult.res, slotsResult.data)) {
    fail(
      "get-available-slots is not deployed for this Supabase project",
      JSON.stringify(slotsResult.data, null, 2),
    );
  }

  if (!slotsResult.res.ok) {
    fail(
      `get-available-slots returned ${slotsResult.res.status}`,
      JSON.stringify(slotsResult.data, null, 2),
    );
  }

  const slots = Array.isArray(slotsResult.data?.slots) ? slotsResult.data.slots : [];
  if (slots.length > 0) {
    picked = { bookingDate, startTime: slots[0] };
    break;
  }
}

if (!picked) {
  fail("no available slots found in the next 21 days");
}
console.log(`Found slot: ${picked.bookingDate} ${picked.startTime}`);

if (!shouldCreate) {
  console.log("Dry run complete. Set BOOKING_SMOKE_CREATE=true to create a test booking.");
  process.exit(0);
}

console.log("Creating test booking...");
const createResult = await requestJson(`${url}/functions/v1/create-booking`, {
  method: "POST",
  headers,
  body: JSON.stringify({
    treatment_id: treatment.id,
    booking_date: picked.bookingDate,
    start_time: picked.startTime,
    customer_name: "Automatiskt test Novum",
    customer_email: customerEmail,
    customer_phone: "0700000000",
    message: "Automatiskt smoke-test från repo-script. Kan raderas.",
  }),
});

if (isLikelyMissingFunction(createResult.res, createResult.data)) {
  fail(
    "create-booking is not deployed for this Supabase project",
    JSON.stringify(createResult.data, null, 2),
  );
}

if (!createResult.res.ok) {
  fail(
    `create-booking returned ${createResult.res.status}`,
    JSON.stringify(createResult.data, null, 2),
  );
}

console.log("Created test booking:");
console.log(JSON.stringify(createResult.data, null, 2));
