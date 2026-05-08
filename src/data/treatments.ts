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

import imgBeloteroRevive from "@/assets/treatments/treatment-belotero-revive.png";
import imgProfhilo from "@/assets/treatments/treatment-profhilo.png";
import imgProfhiloStructura from "@/assets/treatments/treatment-profhilo-structura.png";
import imgEjal40 from "@/assets/treatments/treatment-ejal40.png";
import imgSunekosPerforma from "@/assets/treatments/treatment-sunekos-performa.png";
import imgHyalift from "@/assets/treatments/treatment-hyalift-eyes.png";

/** Synkad med `booking_treatments.slug` i Supabase */
export const treatments: Treatment[] = [
  {
    slug: "belotero-revive",
    name: "Belotero® Revive",
    category: "Skinbooster",
    tagline: "Hudkvalitet – fukt, struktur och jämnare yta över tid",
    short:
      "Skinbooster baserad på stabiliserad hyaluronsyra och glycerol, främst inriktad på hudens välmående snarare än volym. Planeras efter konsultation med legitimerad sjuksköterska; utfallet varierar mellan individer.",
    image: imgBeloteroRevive,
    what:
      "Vi inleder alltid med genomgång av hälsa, läkemedel, allergier och tidigare estetiska ingrepp. Du får en saklig bild av vad preparatet är avsett för enligt tillverkarens indikationer och vad du rimligt kan förvänta dig — utan absoluta löften om varaktighet eller grad av förbättring. Behandlingen utförs med aseptisk teknik och engångsmaterial. Vanliga reaktioner kan vara rodnad, ömhet eller lätt svullnad i behandlade områden; dessa brukar avta inom kort tid. Ibland rekommenderas mer än ett tillfälle i ett definierat intervall; det beslutas utifrån hudens tillstånd och dina mål. Journal och samtycke dokumenteras enligt klinikens rutiner.",
    duration: "Ca 45 minuter",
    price: "Pris vid konsultation",
    includes: [
      "Medicinsk konsultation och lämplighetsbedömning",
      "Behandling i steril/klinisk miljö enligt protokoll",
      "Genomgång av risker, normala reaktioner och eftervård",
      "Vid behov uppföljande kontakt enligt vår policy",
    ],
  },
  {
    slug: "profhilo",
    name: "Profhilo®",
    category: "Bioremodellering",
    tagline: "Högkoncentrerad hyaluronsyra för elasticitet och djup återfuktning",
    short:
      "Profhilo® är ett högt koncentrerat hyaluronsyrepreparat som injiceras på ett förutsägbart sätt i huden för att påverka fukt och elasticitet. Det är inte främst en volymfillern utan ett protokoll för hudens biologiska kvalitet — resultat och hur många tillfällen som behövs avgörs individuellt.",
    image: imgProfhilo,
    what:
      "Efter hälsodeklaration och bedömning av hudtyp, anatomi och dina önskemål lägger vi injektionerna enligt vedertagna punkter och god injektionspraxis. Vi förklarar hur seriebehandling oftast är upplagd (två tillfällen med om några veckors mellanrum är vanligt i många protokoll), vad du kan uppleva första dagarna och när du bör höra av dig till oss. Precis som vid alla injektionsbehandlingar finns det risk för asymmetri, missnöje med utfall eller mer ovanliga komplikationer — vi informerar innan du ger samtycke. Uppföljning erbjuds enligt rutin.",
    duration: "Ca 30 minuter",
    price: "Pris vid konsultation",
    includes: [
      "Utförlig konsultation och informerat samtycke",
      "Markering och injektion enligt aktuellt behandlingsprotokoll",
      "Skriftlig eller muntlig eftervårdsinstruktion",
      "Kontaktväg vid akuta frågor under läkningsfasen",
    ],
  },
  {
    slug: "profhilo-structura",
    name: "Profhilo Structura",
    category: "Bioremodellering",
    tagline: "Structura — mer fokus på vävnad och kontur än klassisk fuktboost",
    short:
      "Structura positioneras inom samma familj som Profhilo® men med annan matris och indikation i tillverkarens material — ofta diskuterad i sammanhang med mild laxitet eller ’släppt’ uttryck i huden. Passar inte alla; beslut efter ansiktsbedömning och realistiska mål.",
    image: imgProfhiloStructura,
    what:
      "Vi jämför Structura med övriga alternativ i vårt utbud (inklusive klassisk Profhilo® och skinboosters) så att du förstår skillnad i syfte, inte bara i varumärke. Du får information om förväntad svullnad, möjlig massage eller väntetid innan social återgång, och vad vi inte kan lösa med injektion ensamt — till exempel signifikant överskottshud eller skelettrelaterad asymmetri som kräver annan åtgärd. Behandlingen dokumenteras; återbesök planeras vid behov.",
    duration: "Ca 45 minuter",
    price: "Pris vid konsultation",
    includes: [
      "Jämförande genomgång av lämpliga alternativ",
      "Behandling av legitimerad sjuksköterska",
      "Risk- och förväntningsdialog innan start",
      "Plan för uppföljning eller komplettering vid behov",
    ],
  },
  {
    slug: "ejal40",
    name: "Ejal40",
    category: "Skinbooster",
    tagline: "Trippelhyaluronsyra — fukt och struktur för ’trött’ eller solpåverkad hud",
    short:
      "Ejal40 är ett skinbooster-preparat som kombinerar olika molekylstorlekar av hyaluronsyra för att påverka hudens arkitektur och återfuktning. Används efter individuell bedömning; antal sessioner och utfall beror på hudens utgångsläge och livsstilsfaktorer.",
    image: imgEjal40,
    what:
      "Vi går igenom kontraindikationer som påverkar blödningsrisk, immunstatus eller läkning — bland annat vissa läkemedel och aktiva hudinfektioner i området. Du informeras om vad som är vanligt första dagarna efter behandling: lätt knottrighet där injektionerna lagts, rodnad eller små blåmärken som vanligtvis avklingar. Vi diskuterar realistisk tidslinje: många hudåtgärder ger gradvis förbättring snarare än omedelbar förändring. All injektion sker med strikt hygien.",
    duration: "Ca 30 minuter",
    price: "Pris vid konsultation",
    includes: [
      "Hälsodeklaration och dokumenterat samtycke",
      "Injektion med engångsnålar/kanyler enligt rutin",
      "Personlig eftervårdsplan (sol, träning, hudvård)",
      "Råd om när vård ska sökas vid avvikande symtom",
    ],
  },
  {
    slug: "sunekos-performa",
    name: "Sunekos Performa",
    category: "Skinbooster",
    tagline: "Aminosyror + hyaluronsyra — regenerativ inriktning för hudton och elasticitet",
    short:
      "Sunekos Performa kombinerar en definierad aminosyraprofil med hyaluronsyra och marknadsförs för påverkan på hudens stödjande vävnadsstrukturer. Kan ingå i en bredare plan vid fotoåldrande eller ’stressad’ hud — alltid efter medicinsk bedömning och ofta som serie.",
    image: imgSunekosPerforma,
    what:
      "Vi förklarar skillnaden mellan detta protokoll och rena fuktinjektioner: här ligger tonvikten vid biokemiska byggstenar som stödjer hudens egna processer — men biologisk respons är individuell och svår att förutsäga i detalj. Vid behov fotodokumenterar vi för uppföljning enligt GDPR. Om en serie avbryts beskriver vi vad det innebär för resultat och hur vi kan gå vidare. Vi avråder vid graviditet/amning eller vid oklar huddiagnos tills läget är utrett.",
    duration: "Ca 30 minuter",
    price: "Pris vid konsultation",
    includes: [
      "Konsultation med individuell omvårdnadsplan",
      "Steril arbetsteknik och spårbar dokumentation",
      "Information om seriens upplägg och intervaller",
      "Uppföljande rådgivning efter genomförda tillfällen",
    ],
  },
  {
    slug: "hyalift",
    name: "Hyalift & Hyalift Eyes",
    category: "Skinbooster",
    tagline: "Specifika protokoll för ansikte och känsligt ögonområde",
    short:
      "Hyalift och Hyalift Eyes är preparat och tekniker avsedda för målinriktad återfuktning och strukturstöd — ögonområdet kräver särskild noggrannhet gällande anatomi och svullnad. Genomförs endast av legitimerad sjuksköterska efter noggrann lämplighetsprövning.",
    image: imgHyalift,
    what:
      "Hudvävnaden runt ögonen är tunn; kärl och lymfdränage gör att svullnad eller blåmissfärgning kan ta längre tid att försvinna än på kind eller käklinje. Vi går igenom dessa förväntningar innan behandling och vad som är normala reaktioner efter ingrepp jämfört med symtom som ska utredas akut. Du får konkreta råd om sömnläge, kyla och vad du bör undvika första dygnen. Vi dokumenterar behandlingsområde och preparat batchnummer enligt god spårbarhetsrutin.",
    duration: "Ca 30 minuter",
    price: "Pris vid konsultation",
    includes: [
      "Utförlig riskgenomgång för ögonområdet",
      "Behandling utförd av legitimerad sjuksköterska",
      "Skriftlig sammanfattning av eftervård",
      "Instruktion om akut kontaktväg vid misstanke om komplikation",
    ],
  },
];
