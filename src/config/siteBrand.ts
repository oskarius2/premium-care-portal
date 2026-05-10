/**
 * Varumärke — ett ställe att ändra visningsnamn, tagline och SEO-texter.
 */
export const siteBrand = {
  /** Officiellt namn (rubriker, logotyp-text, copyright) */
  name: "Novum",

  /** Kort beskrivande rad under namnet */
  tagline: "Medicinsk skönhetsklinik",

  /** document.title och delade meta-taggar */
  titleDefault: "Novum — Medicinsk skönhetsklinik",

  metaDescription:
    "Novum — medicinsk skönhetsklinik med legitimerad personal. Botox med Dysport och fillers med Revolax Fine, alltid efter individuell konsultation.",

  /**
   * Fil i `public/` (utan inledande slash), t.ex. `novum-estetik-logo.png`.
   * Bygg URL med `import.meta.env.BASE_URL` så det funkar vid `base` i Vite.
   */
  logoPublicPath: "novum-estetik-logo.png",
} as const;

/** Kort juridiskt/med.-informations disclaimer — återanvänd på landningssidor */
export const siteMedicalDisclaimer =
  "Information på webbplatsen är av allmän karaktär och ersätter inte individuell medicinsk bedömning, diagnostik eller behandlingsråd. Resultat av estetiska ingrepp varierar mellan individer och kan inte garanteras.";
