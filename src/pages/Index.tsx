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
import { siteBrand, siteMedicalDisclaimer } from "@/config/siteBrand";
import { siteContact } from "@/config/siteContact";
import { HeroMedia } from "@/components/HeroMedia";
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
    body: "Boka online eller hör av dig direkt. Vi återkopplar med tid och eventuella förberedelser inför ditt besök.",
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
  const featuredServices = treatments;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/75 min-h-[min(72vh,42rem)]">
        <div className="absolute inset-0 z-0">
          <HeroMedia variant="background" posterSrc={heroImg} alt="" />
        </div>
        {/* Beige täcke över hela hero (samma som sidans bakgrundston) */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-background/50"
          aria-hidden
        />
        {/* Extra mjuk vinjett mot textkolumnen / överst på mobil */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-background/24 via-background/10 to-transparent max-lg:bg-gradient-to-b max-lg:from-background/28 max-lg:via-background/12 max-lg:to-transparent"
          aria-hidden
        />

        <div className="container-wide relative z-10 pt-6 sm:pt-10 md:pt-14 lg:pt-16 pb-10 sm:pb-12 md:pb-16 lg:pb-20">
          <div className="fade-up max-w-[40rem]">
            <div className="rounded-[1.75rem] border border-border/60 bg-background/88 backdrop-blur-md px-5 py-6 sm:px-7 sm:py-8 shadow-[var(--shadow-card)]">
              <ul className="hidden md:flex items-center gap-5 mb-8 flex-wrap">
              {heroTrust.map(({ icon: Icon, label }, i) => (
                <li key={label} className="inline-flex items-center gap-5">
                  {i > 0 && <span className="w-px h-3 bg-border/80" aria-hidden="true" />}
                  <span className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-foreground/72">
                    <span className="icon-circle-sm scale-[0.85]">
                      <Icon size={14} strokeWidth={1.75} />
                    </span>
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <span className="eyebrow text-foreground/80">{siteBrand.tagline} · {siteContact.city}</span>
            <Ornament className="text-foreground/35 mt-4 mb-5 sm:mt-5 sm:mb-6 md:mt-6 md:mb-7" width={72} glyph="diamond" />

            <h1 className="heading-xl text-balance max-w-[14ch] sm:max-w-[11ch] [text-shadow:0_1px_0_hsl(var(--background)_/_0.95),0_0_1px_hsl(var(--background)_/_0.9),0_2px_24px_hsl(var(--background)_/_0.65)]">
              Premium känsla.
              <br />
              <em className="font-serif italic font-normal text-primary">
                Medicinsk ryggrad.
              </em>
            </h1>

            <p className="lead mt-4 sm:mt-5 md:mt-7 max-w-xl text-foreground/95 [text-shadow:0_1px_0_hsl(var(--background)_/_0.9),0_0_20px_hsl(var(--background)_/_0.55)]">
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
                  <span className="text-[0.62rem] xs:text-[0.66rem] uppercase tracking-[0.1em] text-foreground/70 leading-tight">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <ul className="mt-5 md:mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-y-2 sm:gap-x-8 sm:gap-y-3 text-[0.85rem] md:text-sm text-foreground/82">
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

            {/* Klinik — i panelen (ingen extra högerkolumn / absolute som bröt layouten) */}
            <div className="mt-6 panel px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                  Klinik · {siteContact.city}
                </p>
                <p className="font-serif text-[1.05rem] md:text-lg leading-tight text-foreground mt-1">
                  <span className="md:hidden">Lugn miljö, tydlig medicinsk struktur.</span>
                  <span className="hidden md:inline">
                    Lugn miljö, tydlig kommunikation och medicinsk struktur i varje steg.
                  </span>
                </p>
              </div>
              <Ornament className="text-foreground/25 shrink-0" width={52} glyph="diamond" />
            </div>
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
        <div className="container-wide">
          <SectionHeader
            eyebrow="Så går det till"
            title="Från första kontakt"
            accent="till uppföljning"
            lead="Varje besök följer samma struktur — så att du vet vad som händer, varför det görs och vad du kan förvänta dig efteråt."
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
            eyebrow="Vanliga frågor"
            title="Det du brukar"
            accent="undra över först"
            lead="Korta, raka svar på det de flesta tänker innan de bokar. Resten går vi igenom tillsammans i konsultationen."
            align="center"
            className="mb-10 sm:mb-14 md:mb-20 mx-auto"
          />

          <div className="max-w-3xl mx-auto">
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
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-narrow text-center py-16 sm:py-20 md:py-28 lg:py-32 flex flex-col items-center">
          <Ornament className="text-primary-foreground/40 mb-5 sm:mb-6" width={64} glyph="diamond" />

          <span className="text-[0.66rem] sm:text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground/70 mb-4 sm:mb-5">
            Boka konsultation
          </span>

          <h2 className="font-serif text-[2rem] xs:text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.12] sm:leading-[1.1] tracking-tight text-balance max-w-[18ch] sm:max-w-[20ch]">
            Ett första samtal —
            <em className="font-serif italic font-normal text-primary-foreground/90"> utan förbehåll.</em>
          </h2>

          <p className="text-primary-foreground/80 text-[0.95rem] sm:text-base md:text-lg leading-relaxed mt-5 sm:mt-6 max-w-xl">
            Konsultationen är till för att lyssna, undersöka och föreslå. Du bestämmer själv om och när du vill gå vidare med en behandling.
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
