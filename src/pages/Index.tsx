import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  Stethoscope,
  ClipboardCheck,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Check,
  ScanLine,
} from "lucide-react";
import heroImg from "@/assets/clinic/hero-clinic.png";
import clinicInterior from "@/assets/about/about-clinic.png";
import { siteBrand, siteMedicalDisclaimer } from "@/config/siteBrand";
import { siteContact } from "@/config/siteContact";
import { Ornament } from "@/components/ui/Ornament";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { treatments } from "@/data/treatments";

const heroTrust = [
  { icon: Stethoscope, label: "Legitimerad personal" },
  { icon: ClipboardCheck, label: "Medicinsk konsultation" },
  { icon: ShieldCheck, label: "Journalförd vård" },
];

const signaturePillars = [
  {
    icon: Stethoscope,
    title: "Medicinsk kompetens",
    body: "Bedömning, behandling och uppföljning hålls samman i samma kliniska flöde — utan att det känns kallt eller opersonligt.",
  },
  {
    icon: ScanLine,
    title: "Naturlig strategi",
    body: "Fokus ligger på hudkvalitet, struktur och harmoni över tid, inte på snabba eller överdrivna förändringar.",
  },
  {
    icon: ShieldCheck,
    title: "Trygg process",
    body: "Indikationer, risker, eftervård och förväntningar förklaras tydligt innan något görs — aldrig efteråt.",
  },
];

const processSteps = [
  {
    n: "01",
    title: "Första kontakt",
    body: "Du bokar online eller läser in dig på behandlingarna i lugn och ro. Sajten ska ge klarhet innan du tar nästa steg.",
  },
  {
    n: "02",
    title: "Konsultation",
    body: "Vi går igenom mål, hudstatus, historik och vad som faktiskt är rimligt att uppnå med aktuell behandling.",
  },
  {
    n: "03",
    title: "Behandling",
    body: "Varje moment utförs med aseptisk teknik, dokumentation och tydlig vägledning genom hela besöket.",
  },
  {
    n: "04",
    title: "Eftervård",
    body: "Du får konkreta råd, realistisk tidslinje och tydlig kontaktväg om något behöver följas upp efteråt.",
  },
];

const faqs = [
  {
    q: "Hur vet jag vilken behandling som passar mig?",
    a: "Det avgörs i konsultationen. Behandlingen väljs utifrån hud, anatomi, mål och historik — inte utifrån vilken produkt som låter mest exklusiv.",
  },
  {
    q: "Kommer resultatet att se naturligt ut?",
    a: "Det är ambitionen. Kliniken är utformad kring gradvisa förbättringar i hudkvalitet, balans och uttryck snarare än snabba, hårda förändringar.",
  },
  {
    q: "Vad händer om jag bokar fel behandling?",
    a: "Då justeras planen. Rätt behandling väljs först efter medicinsk bedömning, så bokningen online fungerar som ett första steg — inte ett låst beslut.",
  },
  {
    q: "Varför är tonen så medicinsk?",
    a: "För att injektionsbehandling är vårdnära. Den kan vara varm, estetisk och välkomnande — men den ska fortfarande kännas seriös, tydlig och trygg.",
  },
];

const Index = () => {
  const hasOpeningHours = Boolean(siteContact.openingHoursHeroLine.trim());
  const featured = treatments.find((t) => t.slug === "fillers") ?? treatments[0];
  const featuredServices = treatments;

  return (
    <>
      <section className="relative bg-surface border-b border-border/75 overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-32 sm:h-40 bg-[radial-gradient(circle_at_top,rgba(126,142,112,0.12),transparent_65%)]"
          aria-hidden
        />
        <div className="container-wide pt-8 sm:pt-12 md:pt-20 lg:pt-28 pb-12 sm:pb-16 md:pb-24 lg:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center relative">
          <div className="fade-up lg:col-span-6">
            <ul className="hidden md:flex items-center gap-5 mb-8 flex-wrap">
              {heroTrust.map(({ icon: Icon, label }, i) => (
                <li key={label} className="inline-flex items-center gap-5">
                  {i > 0 && <span className="w-px h-3 bg-border/80" aria-hidden="true" />}
                  <span className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground">
                    <span className="icon-circle-sm scale-[0.85]">
                      <Icon size={14} strokeWidth={1.75} />
                    </span>
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <span className="eyebrow">{siteBrand.tagline} · {siteContact.city}</span>
            <Ornament className="text-foreground/30 mt-4 mb-5 sm:mt-5 sm:mb-6 md:mt-6 md:mb-7" width={72} glyph="diamond" />

            <h1 className="heading-xl text-balance max-w-[14ch] sm:max-w-[11ch]">
              Premium känsla.
              <br />
              <em className="font-serif italic font-normal text-primary/85">
                Medicinsk ryggrad.
              </em>
            </h1>

            <p className="lead mt-4 sm:mt-5 md:mt-7 max-w-xl">
              {siteBrand.name} är byggd för dig som vill möta estetisk behandling i en miljö som känns lugn, pålitlig och professionell — med fokus på hudkvalitet, tydlighet och naturliga resultat över tid.
            </p>

            <div className="mt-6 sm:mt-7 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-3 md:gap-4">
              <Link to="/boka" className="btn-primary btn-large justify-center w-full sm:w-auto">
                <Calendar size={20} strokeWidth={1.75} /> Boka konsultation
              </Link>
              <Link to="/behandlingar" className="btn-secondary btn-large justify-center w-full sm:w-auto">
                <Sparkles size={20} strokeWidth={1.75} /> Se behandlingar
              </Link>
            </div>

            <ul className="md:hidden mt-6 grid grid-cols-3 gap-px bg-border/45 border border-border/65 rounded-xl overflow-hidden">
              {heroTrust.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="bg-background py-3.5 px-1.5 text-center flex flex-col items-center gap-1.5"
                >
                  <span className="icon-circle-sm scale-[0.78]">
                    <Icon size={15} strokeWidth={1.75} />
                  </span>
                  <span className="text-[0.62rem] xs:text-[0.66rem] uppercase tracking-[0.1em] text-muted-foreground leading-tight">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <ul className="mt-5 md:mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-y-2 sm:gap-x-8 sm:gap-y-3 text-[0.85rem] md:text-sm text-muted-foreground">
              <li className="inline-flex items-center gap-2">
                <MapPin size={15} className="text-primary shrink-0" strokeWidth={1.75} />
                <span className="leading-snug">{siteContact.addressOneLine}</span>
              </li>
              {hasOpeningHours && (
                <li className="inline-flex items-center gap-2">
                  <Clock size={15} className="text-primary shrink-0" strokeWidth={1.75} />
                  <span className="leading-snug">{siteContact.openingHoursHeroLine}</span>
                </li>
              )}
            </ul>
          </div>

          <div className="lg:col-span-6 relative">
            <img
              src={heroImg}
              alt={`Klinikmiljö hos ${siteBrand.name}`}
              className="w-full aspect-[4/5] object-cover media-frame-lift"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />

            {/* Mobil: kompakt info under bilden för bättre rytm på små skärmar */}
            <div className="md:hidden mt-4 panel px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                  Klinik · {siteContact.city}
                </p>
                <p className="font-serif text-[1.05rem] leading-tight text-foreground mt-1">
                  Lugn miljö, tydlig medicinsk struktur.
                </p>
              </div>
              <Ornament className="text-foreground/25 shrink-0" width={42} glyph="diamond" />
            </div>

            <div className="hidden md:flex absolute -bottom-6 left-8 right-8 lg:left-12 lg:right-12 bg-card/96 backdrop-blur-sm border border-border/70 rounded-2xl shadow-[var(--shadow-lift)] items-center justify-between gap-5 px-6 py-5">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                  Klinik · {siteContact.city}
                </p>
                <p className="font-serif text-lg leading-tight text-foreground mt-1">
                  Lugn miljö, tydlig kommunikation och medicinsk struktur i varje steg.
                </p>
              </div>
              <Ornament className="text-foreground/25 shrink-0" width={56} glyph="diamond" />
            </div>

            <div className="hidden lg:block absolute top-8 -left-8 panel px-5 py-4 max-w-[15rem]">
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                Adress
              </p>
              <p className="font-serif text-lg leading-tight text-foreground mt-1">
                {siteContact.addressStreet}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{siteContact.addressPostalLine}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background border-b border-border/75">
        <div className="container-wide py-10 sm:py-12 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px grid-divided">
            {signaturePillars.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-background p-6 sm:p-7 md:p-8 lg:p-9 flex flex-col gap-4 sm:gap-5">
                <span className="icon-circle-md">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="font-serif text-[1.4rem] sm:text-2xl md:text-[1.75rem] leading-tight tracking-tight text-foreground mb-2.5 sm:mb-3">
                    {title}
                  </h2>
                  <p className="text-muted-foreground text-[0.92rem] sm:text-[0.96rem] leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y-sm">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Våra behandlingar"
            title="Två behandlingar."
            accent="En medicinsk standard."
            lead="Vi har medvetet hållit utbudet smalt — fillers med Revolax Fine och botox med Dysport — för att kunna hålla riktigt hög nivå på konsultation, bedömning och utförande i varje behandling."
            align="center"
            className="mb-10 sm:mb-12 md:mb-16 mx-auto"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-7 max-w-5xl mx-auto">
            {featuredServices.map((t) => (
              <article
                key={t.slug}
                className="group bg-card rounded-[1.5rem] sm:rounded-[1.75rem] border border-border/75 shadow-[var(--shadow-card)] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="overflow-hidden border-b border-border/70">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full aspect-[16/10] sm:aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-5 sm:p-6 md:p-7 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
                    <span className="eyebrow">{t.category}</span>
                    <span className="text-[0.66rem] sm:text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                      {t.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-[1.55rem] sm:text-[1.75rem] md:text-[1.9rem] leading-tight tracking-tight text-foreground text-balance">
                    {t.name}
                  </h3>
                  <p className="font-serif italic text-[1rem] sm:text-lg text-primary/80 leading-snug mt-2 text-balance">
                    {t.tagline}
                  </p>
                  <p className="text-muted-foreground text-[0.92rem] sm:text-[0.95rem] leading-relaxed mt-4 sm:mt-5 flex-1">
                    {t.short}
                  </p>

                  <ul className="mt-5 sm:mt-6 space-y-2.5">
                    {t.includes.slice(0, 2).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[0.88rem] sm:text-sm text-foreground/85 leading-relaxed"
                      >
                        <Check size={15} strokeWidth={2} className="text-primary mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                    <Link to={`/behandlingar/${t.slug}`} className="btn-secondary btn-card-pair">
                      Läs mer <ArrowUpRight size={16} strokeWidth={1.75} />
                    </Link>
                    <Link to={`/boka?treatment=${encodeURIComponent(t.slug)}`} className="btn-primary btn-card-pair">
                      Boka
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y-sm bg-surface border-y border-border/75">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="eyebrow">Klinikupplevelsen</span>
            <Ornament className="text-foreground/30 mt-4 sm:mt-5 mb-5 sm:mb-6" width={72} glyph="diamond" />

            <h2 className="heading-lg text-balance">
              En miljö som känns genomtänkt,
              <em className="font-serif italic font-normal text-primary/80"> inte överdesignad.</em>
            </h2>

            <p className="text-muted-foreground text-[0.95rem] sm:text-base md:text-[1.0625rem] leading-relaxed mt-5 sm:mt-7 max-w-prose">
              För att sidan ska kännas premium utan att bli skrikig har layouten stramats upp runt ett tydligare rytmiskt upplägg: luft, serifrubriker, rena bildytor och diskreta kliniska signaler i stället för stora löften och hård försäljning.
            </p>

            <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 max-w-prose">
              {[
                "Mjuka övergångar mellan text, bild och call-to-action.",
                "Färre men starkare sektioner på startsidan.",
                "Bättre balans mellan estetiskt uttryck och medicinsk trovärdighet.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[0.92rem] sm:text-[0.95rem] text-muted-foreground leading-relaxed"
                >
                  <span className="icon-circle-sm scale-[0.78] sm:scale-[0.82] mt-0.5">
                    <Check size={13} strokeWidth={2} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link to="/om" className="btn-secondary mt-7 sm:mt-9 w-full sm:w-auto justify-center">
              Läs mer om kliniken <ArrowUpRight size={16} strokeWidth={1.75} />
            </Link>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <img
              src={clinicInterior}
              alt={`Interiör hos ${siteBrand.name}`}
              className="w-full aspect-[4/3] object-cover media-frame"
              loading="lazy"
              decoding="async"
            />
            <div className="hidden lg:block absolute -bottom-5 -left-5 panel px-5 py-4 max-w-[15rem]">
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                Designprincip
              </p>
              <p className="font-serif text-base leading-tight text-foreground mt-1">
                Mer vårdmiljö än salong — men fortfarande varm och inbjudande.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y-sm">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <img
              src={featured.image}
              alt={featured.name}
              className="w-full aspect-[4/5] object-cover media-frame"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="lg:col-span-5">
            <span className="eyebrow">I fokus · {featured.category}</span>
            <Ornament className="text-foreground/30 mt-4 sm:mt-5 mb-5 sm:mb-6" width={72} glyph="diamond" />

            <h2 className="heading-lg text-balance">{featured.name}</h2>
            <p className="font-serif italic text-[1.15rem] sm:text-xl md:text-2xl text-primary/80 leading-snug mt-3 max-w-md">
              {featured.tagline}
            </p>
            <p className="text-muted-foreground text-[0.95rem] sm:text-base md:text-[1.0625rem] leading-relaxed mt-5 sm:mt-7 max-w-prose">
              {featured.what}
            </p>

            <div className="mt-6 sm:mt-8 panel p-5 sm:p-6 md:p-7">
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground mb-3 sm:mb-4">
                Det här signalerar kvalitet på sidan
              </p>
              <ul className="space-y-3">
                {featured.includes.slice(0, 3).map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[0.92rem] sm:text-[0.95rem] text-foreground/85 leading-relaxed"
                  >
                    <Check size={15} strokeWidth={2} className="text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
              <Link to={`/behandlingar/${featured.slug}`} className="btn-primary justify-center w-full sm:w-auto">
                Läs mer <ArrowUpRight size={18} strokeWidth={1.75} />
              </Link>
              <Link to="/behandlingar" className="btn-secondary justify-center w-full sm:w-auto">
                Alla behandlingar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y-sm bg-surface border-y border-border/75">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Process"
            title="En tydligare väg"
            accent="från intresse till behandling"
            lead="Startsidan är ombyggd för att göra processen enklare att förstå direkt: vad kliniken står för, hur behandlingarna presenteras och vad som händer när du bokar."
            align="center"
            className="mb-10 sm:mb-14 md:mb-20 mx-auto"
          />

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {processSteps.map((step) => (
              <li
                key={step.n}
                className="panel p-6 sm:p-7 md:p-8 lg:p-9 flex flex-col min-h-full"
              >
                <div className="flex items-baseline gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <span className="font-serif italic text-[2.1rem] sm:text-[2.5rem] lg:text-[3rem] leading-none text-primary/80 select-none">
                    {step.n}
                  </span>
                  <span className="hairline flex-1" />
                </div>
                <h3 className="font-serif text-[1.4rem] sm:text-2xl leading-snug tracking-tight text-foreground mb-2 sm:mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-[0.92rem] sm:text-[0.95rem] leading-relaxed">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y-sm">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Frågor & trygghet"
            title="Sajten ska kännas"
            accent="lika tydlig som kliniken"
            lead="I den här versionen ligger större vikt vid trygghet, tonalitet och förväntningsstyrning — så att varumärket känns mer premium utan att tappa seriositeten."
            align="center"
            className="mb-10 sm:mb-14 md:mb-20 mx-auto"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16">
            <div className="lg:col-span-5 panel p-6 sm:p-7 md:p-8 lg:p-10">
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground mb-5 sm:mb-6">
                Vad som bär uttrycket
              </p>
              <ol className="space-y-6 sm:space-y-7">
                {[
                  {
                    title: "Mindre katalog, mer kuraterad klinik",
                    body: "Färre visuella distraktioner och tydligare utvalda behandlingar gör att sidan känns mer exklusiv och mer trygg samtidigt.",
                  },
                  {
                    title: "Tydligare medicinsk tonalitet",
                    body: "Copyn är omskriven för att signalera legitim bedömning, realistiska förväntningar och professionell närvaro i varje steg.",
                  },
                  {
                    title: "Samma färger, starkare hierarki",
                    body: "Paletten är kvar — men sektionerna, korten och call-to-actions har fått bättre rytm och mer premium känsla.",
                  },
                ].map((item, i) => (
                  <li key={item.title} className="flex gap-4 sm:gap-5">
                    <span className="font-serif italic text-2xl sm:text-3xl text-primary/40 leading-none shrink-0 select-none min-w-[2.25rem] sm:min-w-[2.5rem]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-serif text-[1.15rem] sm:text-xl leading-snug tracking-tight text-foreground mb-1.5 sm:mb-2 text-balance">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-[0.92rem] sm:text-[0.95rem] leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="lg:col-span-7">
              <dl className="border-t border-border/75">
                {faqs.map((f) => (
                  <div key={f.q} className="border-b border-border/75 py-4 sm:py-5 md:py-6">
                    <dt className="font-serif text-[1.05rem] sm:text-[1.125rem] md:italic md:text-[1.375rem] text-foreground leading-snug mb-2 sm:mb-2.5 md:mb-3 text-balance">
                      {f.q}
                    </dt>
                    <dd className="text-muted-foreground text-[0.92rem] sm:text-[0.95rem] md:text-base leading-relaxed">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-narrow text-center py-16 sm:py-20 md:py-28 lg:py-32 flex flex-col items-center">
          <Ornament className="text-primary-foreground/40 mb-5 sm:mb-6" width={64} glyph="diamond" />

          <span className="text-[0.66rem] sm:text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground/70 mb-4 sm:mb-5">
            Nästa steg
          </span>

          <h2 className="font-serif text-[2rem] xs:text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.12] sm:leading-[1.1] tracking-tight text-balance max-w-[18ch] sm:max-w-[20ch]">
            En renare start,
            <em className="font-serif italic font-normal text-primary-foreground/90"> starkare behandlingar och bättre första intryck.</em>
          </h2>

          <p className="text-primary-foreground/80 text-[0.95rem] sm:text-base md:text-lg leading-relaxed mt-5 sm:mt-6 max-w-xl">
            Startsidan och behandlingsöversikten är nu omritade för att kännas mer exklusiva och mer kliniskt trygga. Nästa naturliga steg är att byta namn och skriva om varje behandling så att allt speglar ert faktiska utbud.
          </p>

          <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3 w-full max-w-md sm:max-w-none sm:w-auto">
            <Link to="/behandlingar" className="btn-solid-light w-full sm:w-auto">
              Se behandlingar
            </Link>
            <Link to="/boka" className="btn-outline-light w-full sm:w-auto">
              Boka konsultation
            </Link>
          </div>

          <p className="text-[0.72rem] sm:text-[0.75rem] text-primary-foreground/60 mt-10 sm:mt-12 max-w-xl leading-relaxed">
            {siteMedicalDisclaimer}
          </p>
        </div>
      </section>
    </>
  );
};

export default Index;
