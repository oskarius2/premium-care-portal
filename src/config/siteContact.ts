/**
 * Kontaktuppgifter och öppettider.
 *
 * För närvarande är endast besöksadressen ifylld. Telefon, e-post och
 * öppettider hålls som `null` / tomma strängar — UI visar då fallback-text
 * och länkar inaktiveras automatiskt (se `TelLink` / `MailLink`).
 */
export const siteContact = {
  /** Visas i rubriker, meta m.m. */
  city: "Östersund",

  // Telefon — fylls i senare. När phoneTel är null blir tel:-länkar inaktiva.
  phoneDisplay: "",
  /** E.164 utan mellanslag, t.ex. "+46701234567" — aktiverar tel:-länkar */
  phoneTel: null as string | null,

  // E-post — fylls i senare. När emailAddress är null blir mailto:-länkar inaktiva.
  emailDisplay: "",
  /** Full adress för mailto — aktiverar e-postlänkar */
  emailAddress: null as string | null,
  /** Rad under e-post på kontaktsidan */
  emailReplyHint: "",

  addressStreet: "Rådhusgatan 64",
  addressPostalLine: "831 34 Östersund",
  /** En rad (footer, kompakt) */
  addressOneLine: "Rådhusgatan 64, 831 34 Östersund",

  // Öppettider — fylls i senare.
  openingHoursWeekdays: "",
  openingHoursSaturday: "",
  openingHoursSunday: "",
  /** Rad under telefon på kontaktkort */
  openingHoursSummary: "",
  /** Kort rad på startsidan (t.ex. "Öppet vardagar …") */
  openingHoursHeroLine: "",

  /** iframe src eller tom tills adress/karta finns */
  mapEmbedUrl: null as string | null,
} as const;

export function telHref(raw: string | null | undefined): string | undefined {
  if (raw == null || String(raw).trim() === "") return undefined;
  const t = String(raw).trim().replace(/\s/g, "");
  if (t.startsWith("tel:")) return t;
  const n = t.replace(/^\+/, "");
  return `tel:+${n}`;
}

export function mailtoHref(email: string | null | undefined): string | undefined {
  if (email == null || String(email).trim() === "") return undefined;
  return `mailto:${String(email).trim()}`;
}
