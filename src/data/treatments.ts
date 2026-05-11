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
import imgBotox from "@/assets/treatments/treatment-hyalift-eyes.png";

/** Synkad med `booking_treatments.slug` i Supabase */
export const treatments: Treatment[] = [
  {
    slug: "fillers",
    name: "Fillers",
    category: "Filler · Revolax Fine",
    tagline: "Subtila volymer och definition med Revolax Fine",
    short:
      "Filler-behandling med Revolax Fine — en hyaluronsyrebaserad filler avsedd för fina linjer och mer subtila volymjusteringar. Första bokningen är alltid konsultation där lämplighet, mål och förväntningar gås igenom. Eventuell behandling planeras först efter 48 timmars betänketid.",
    image: imgFillers,
    what:
      "Vi inleder alltid med hälsodeklaration och en strukturerad genomgång av läkemedel, allergier och tidigare estetiska ingrepp. Du får en saklig bild av vad Revolax Fine är avsett för och vad du rimligt kan förvänta dig — utan absoluta löften om varaktighet eller grad av förändring. Första besöket är konsultation och viktig information; behandling utförs inte då. Om du vill gå vidare kan behandling planeras efter den lagstadgade betänketiden på 48 timmar. Behandling utförs med aseptisk teknik och engångsmaterial. Vanliga reaktioner kan vara rodnad, ömhet, mindre svullnad eller blåmärken i behandlade områden; dessa brukar avta inom kort tid. Vid behov rekommenderas justering eller uppföljning enligt klinikens rutiner. Journal och samtycke dokumenteras enligt GDPR och god praxis.",
    duration: "Ca 45 minuter",
    price: "Pris vid konsultation",
    includes: [
      "Medicinsk konsultation och lämplighetsbedömning",
      "Genomgång av Revolax Fine, risker, normala reaktioner och eftervård",
      "48 timmars betänketid innan eventuell behandling planeras",
      "Kontaktväg vid frågor under läkningsfasen",
    ],
  },
  {
    slug: "botox",
    name: "Botox",
    category: "Muskelavslappnande · Dysport",
    tagline: "Mjukare uttryck och mindre rynkor med Dysport",
    short:
      "Behandling med Dysport — ett botulinumtoxin-preparat som används för att tillfälligt minska aktivitet i utvalda mimiska muskler. Fokus ligger på ett naturligt och balanserat uttryck snarare än ett ’fryst’ resultat. Första bokningen är konsultation och eventuell behandling planeras först efter 48 timmars betänketid.",
    image: imgBotox,
    what:
      "Vi går först igenom hälsodeklaration, läkemedel, graviditet/amning, neurologisk historik och tidigare behandlingar. Första besöket är konsultation och viktig information; behandling utförs inte då. Efter konsultationen gäller 48 timmars betänketid innan eventuell behandling kan planeras. Vid lämplighet markerar vi injektionspunkterna utifrån din mimik och anatomi och förklarar vad som är rimligt att vänta sig — effekt brukar gradvis utvecklas under de första dagarna och nå full effekt efter ungefär två veckor. Resultat och varaktighet varierar individuellt. Möjliga reaktioner inkluderar rodnad, små blåmärken, mild huvudvärk eller tillfällig asymmetri; ovanliga komplikationer informeras du om innan samtycke. Återbesök erbjuds enligt rutin när protokollet motiverar det.",
    duration: "Ca 30 minuter",
    price: "Pris vid konsultation",
    includes: [
      "Utförlig konsultation och informerat samtycke",
      "Genomgång av Dysport, risker, realistiska mål och eftervård",
      "48 timmars betänketid innan eventuell behandling planeras",
      "Skriftlig eftervård och tydlig kontaktväg vid behov",
    ],
  },
];
