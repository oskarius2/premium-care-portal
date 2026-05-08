/**
 * Centraliserad varumärkesdata för edge functions.
 *
 * Värdena läses från env-variabler så att en omdöpning av kliniken (eller
 * byte av avsändardomän i Resend) sker på ett ställe — inte spridd över
 * `create-booking`, `ical-feed` osv.
 *
 * Sätt följande secrets i Supabase-projektet:
 *   BRAND_NAME            t.ex. "Novum Estetik"
 *   BRAND_TAGLINE         t.ex. "Medicinsk skönhetsklinik"
 *   BRAND_CITY            t.ex. "Östersund"
 *   BRAND_FROM_EMAIL      t.ex. "Novum Estetik <bokning@novumestetik.se>"
 *   BRAND_DOMAIN          t.ex. "novumestetik.se"  (används bl.a. i iCal UID)
 */
export const brand = {
  name: Deno.env.get("BRAND_NAME") ?? "Novum Estetik",
  tagline: Deno.env.get("BRAND_TAGLINE") ?? "Medicinsk skönhetsklinik",
  city: Deno.env.get("BRAND_CITY") ?? "Östersund",
  fromEmail:
    Deno.env.get("BRAND_FROM_EMAIL") ??
    "Novum Estetik <bokning@novumestetik.se>",
  domain: Deno.env.get("BRAND_DOMAIN") ?? "novumestetik.se",
} as const;
