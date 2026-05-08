/**
 * Kontaktuppgifter och öppettider — fylla i innan lansering.
 * Med null för telefon/e-post blir länkar inaktiva (text visas ändå).
 */
export const siteContact = {
  /** Visas i rubriker, meta m.m. */
  city: "TODO: ort",

  phoneDisplay: "TODO: telefonnummer",
  /** E.164 utan mellanslag, t.ex. "+46701234567" — aktiverar tel:-länkar */
  phoneTel: null as string | null,

  emailDisplay: "TODO: e-postadress",
  /** Full adress för mailto — aktiverar e-postlänkar */
  emailAddress: null as string | null,
  /** Rad under e-post på kontaktsidan */
  emailReplyHint: "TODO: svarstid (t.ex. vardagar inom 24 h)",

  addressStreet: "TODO: gatuadress",
  addressPostalLine: "TODO: postnummer och ort",
  /** En rad (footer, kompakt) */
  addressOneLine: "TODO: besöksadress",

  openingHoursWeekdays: "TODO: mån–fre",
  openingHoursSaturday: "TODO: lördag",
  openingHoursSunday: "TODO: söndag",
  /** Rad under telefon på kontaktkort */
  openingHoursSummary: "TODO: öppettider",
  /** Kort rad på startsidan (t.ex. "Öppet vardagar …") */
  openingHoursHeroLine: "TODO: öppettider",

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
