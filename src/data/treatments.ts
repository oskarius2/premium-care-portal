export type Treatment = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  short: string;
  image: string;
  what: string;
  duration: string;
  price: string;
  includes: string[];
};

import imgFillers from "@/assets/treatments/treatment-belotero-revive.png";
import imgBotox from "@/assets/treatments/treatment-profhilo.png";

/** Synkad med `booking_treatments.slug` i Supabase */
export const treatments: Treatment[] = [
  {
    slug: "fillers",
    name: "Fillers",
    category: "Filler · Revolax Fine",
    tagline: "Subtila volymer och definition med Revolax Fine",
    short:
      "Filler-behandling med Revolax Fine — en hyaluronsyrebaserad filler avsedd för fina linjer och mer subtila volymjusteringar. Planeras alltid efter individuell konsultation där lämplighet, mål och förväntningar gås igenom innan behandlingen utförs.",
    image: imgFillers,
    what:
      "Vi inleder alltid med hälsodeklaration och en strukturerad genomgång av läkemedel, allergier och tidigare estetiska ingrepp. Du får en saklig bild av vad Revolax Fine är avsett för och vad du rimligt kan förvänta dig — utan absoluta löften om varaktighet eller grad av förändring. Behandlingen utförs med aseptisk teknik och engångsmaterial. Vanliga reaktioner kan vara rodnad, ömhet, mindre svullnad eller blåmärken i behandlade områden; dessa brukar avta inom kort tid. Vid behov rekommenderas justering eller uppföljning enligt klinikens rutiner. Journal och samtycke dokumenteras enligt GDPR och god praxis.",
    duration: "Ca 45 minuter",
    price: "Pris vid konsultation",
    includes: [
      "Medicinsk konsultation och lämplighetsbedömning",
      "Behandling med Revolax Fine i klinisk miljö",
      "Genomgång av risker, normala reaktioner och eftervård",
      "Kontaktväg vid frågor under läkningsfasen",
    ],
  },
  {
    slug: "botox",
    name: "Botox",
    category: "Muskelavslappnande · Dysport",
    tagline: "Mjukare uttryck och mindre rynkor med Dysport",
    short:
      "Behandling med Dysport — ett botulinumtoxin-preparat som används för att tillfälligt minska aktivitet i utvalda mimiska muskler. Fokus ligger på ett naturligt och balanserat uttryck snarare än ett ’fryst’ resultat. Lämplighet bedöms individuellt vid konsultation.",
    image: imgBotox,
    what:
      "Vi går först igenom hälsodeklaration, läkemedel, graviditet/amning, neurologisk historik och tidigare behandlingar. Vid lämplighet markerar vi injektionspunkterna utifrån din mimik och anatomi och förklarar vad som är rimligt att vänta sig — effekt brukar gradvis utvecklas under de första dagarna och nå full effekt efter ungefär två veckor. Resultat och varaktighet varierar individuellt. Möjliga reaktioner inkluderar rodnad, små blåmärken, mild huvudvärk eller tillfällig asymmetri; ovanliga komplikationer informeras du om innan samtycke. Återbesök erbjuds enligt rutin när protokollet motiverar det.",
    duration: "Ca 30 minuter",
    price: "Pris vid konsultation",
    includes: [
      "Utförlig konsultation och informerat samtycke",
      "Behandling med Dysport av legitimerad personal",
      "Markering enligt din mimik och realistiska mål",
      "Skriftlig eftervård och tydlig kontaktväg vid behov",
    ],
  },
];
