import { Link } from "react-router-dom";
import {
  Phone,
  Calendar,
  MapPin,
  Clock,
  Stethoscope,
  ClipboardCheck,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Check,
} from "lucide-react";
import heroImg from "@/assets/clinic/hero-clinic.png";
import clinicInterior from "@/assets/about/about-clinic.png";
import { siteBrand, siteMedicalDisclaimer } from "@/config/siteBrand";
import { siteContact } from "@/config/siteContact";
import { TelLink } from "@/components/ContactAnchors";
import { Ornament } from "@/components/ui/Ornament";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { treatments } from "@/data/treatments";

const heroTrust = [
  { icon: Stethoscope, label: "Legitimerad personal" },
  { icon: ClipboardCheck, label: "Journalförd vård" },
  { icon: ShieldCheck, label: "Konsultation först" },
];

const trustItems = [
  { icon: Stethoscope, label: "Legitimerade sjuksköterskor", note: "vid varje ingrepp" },
  { icon: ClipboardCheck, label: "Konsultation först", note: "innan en nål rör vid huden" },
  { icon: ShieldCheck, label: "Journalförd vård", note: "GDPR och spårbarhet" },
  { icon: Sparkles, label: "Steril teknik", note: "engångsmaterial enligt rutin" },
];

const processSteps = [
  {
    n: "01",
    title: "Bokning",
    body: "Boka tid online dygnet runt eller hör av dig direkt. Du får bekräftelse via mail med adress och hälsodeklaration.",
  },
  {
    n: "02",
    title: "Konsultation",
    body: "Vi går igenom hud, mål och förväntningar — vad ett preparat är avsett för och vad du rimligt kan vänta dig.",
  },
  {
    n: "03",
    title: "Behandling",
    body: "Aseptisk teknik och engångsmaterial. Du får löpande information om vad som händer i varje steg.",
  },
  {
    n: "04",
    title: "Uppföljning",
    body: "Skriftlig eftervård och tydlig kontaktväg om något känns ovanligt under läkningen.",
  },
];

const ethicsPrinciples = [
  {
    title: "Inget ingrepp utan konsultation",
    body: "Vi säger ifrån om en behandling inte är rätt för dig — eller om du bör vänta. Lämplighet bedöms före, inte efter, att kortet är dragit.",
  },
  {
    title: "Realistiska förväntningar",
    body: "Estetiska resultat varierar mellan individer. Vi lovar inget vi inte kan stå för och förklarar tydligt vad varje preparat faktiskt är avsett för.",
  },
  {
    title: "Spårbarhet och kontaktväg",
    body: "Allt dokumenteras: hälsodeklaration, samtycke, preparat och batchnummer. Vid frågor under läkning har du en direkt väg till oss.",
  },
];

const faqs = [
  {
    q: "Är det här säkert?",
    a: "Injektionsbehandling innebär alltid risker — rodnad, svullnad, blåmärken, sällan mer. Vi minimerar dem genom legitimerad personal, aseptisk teknik och en hälsodeklaration som identifierar kontraindikationer. Vi avråder eller hänvisar vidare när det är rätt.",
  },
  {
    q: "Hur väljer ni rätt behandling för mig?",
    a: "Genom konsultation. Vi tittar på hud, anatomi, ditt mål och din historik — och jämför vilka protokoll som faktiskt är avsedda för det. Bokar du en behandling som inte passar, väljer vi om eller bokar av.",
  },
  {
    q: "Varför står inte priset på sajten?",
    a: "Rätt protokoll, rätt mängd preparat och rätt antal tillfällen varierar mellan personer. Vi vill inte sälja in ett standardpaket som kanske är för mycket eller för lite för dig — pris ges efter konsultation utifrån vad du faktiskt behöver.",
  },
  {
    q: "Vad gör jag om något känns fel efteråt?",
    a: "Du får en konkret kontaktväg innan du går hem och en skriftlig eftervård. Tveka inte — det är bättre att ringa en gång för mycket. Vid akuta symtom hänvisar vi till relevant vårdinstans.",
  },
];

const Index = () => {
  const featured = treatments.find((t) => t.slug === "profhilo") ?? treatments[0];
  const restOfTreatments = treatments.filter((t) => t.slug !== featured.slug);

  return (
    <>
      {/* HERO — split editorial */}
      <section className="relative bg-surface border-b border-border/75">
        <div className="container-wide pt-10 md:pt-20 lg:pt-28 pb-14 md:pb-28 lg:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="fade-up lg:col-span-6">
            {/* Trust-rad med ikoner — credentials identifierbara på <1s (3-sekunders-regeln) */}
            <ul className="hidden md:flex items-center gap-5 mb-8">
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

            <span className="eyebrow">Medicinsk skönhetsklinik · {siteContact.city}</span>

            <Ornament className="text-foreground/30 mt-5 mb-6 md:mt-6 md:mb-7" width={88} glyph="diamond" />

            <h1 className="heading-xl text-balance">
              Estetisk vård{" "}
              <em className="font-serif italic font-normal text-primary/85">
                med medicinsk omsorg
              </em>
              .
            </h1>

            <p className="lead mt-5 md:mt-7 max-w-xl">
              Legitimerade sjuksköterskor som arbetar med skinbooster och bioremodellering — inom en klinikstruktur som ska kännas igen från seriös vårdmiljö, men med ett varmt bemötande.
            </p>

            <div className="mt-7 md:mt-10 flex flex-col md:flex-row gap-3 md:gap-4">
              <Link to="/boka" className="btn-primary btn-large justify-center">
                <Calendar size={20} strokeWidth={1.75} /> Boka tid online
              </Link>
              <TelLink className="btn-secondary btn-large justify-center">
                <Phone size={20} strokeWidth={1.75} /> {siteContact.phoneDisplay}
              </TelLink>
            </div>

            {/* Mobil-version av trust-raden — visas bara där overlay-kortet är dolt */}
            <ul className="md:hidden mt-6 grid grid-cols-3 gap-px bg-border/45 border border-border/65 rounded-xl overflow-hidden">
              {heroTrust.map(({ icon: Icon, label }) => (
                <li key={label} className="bg-background py-4 px-2 text-center flex flex-col items-center gap-2">
                  <span className="icon-circle-sm scale-90">
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <span className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground leading-tight">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="mt-6 md:mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[0.875rem] md:text-sm text-muted-foreground">
              <div className="inline-flex items-center gap-2">
                <MapPin size={16} className="text-primary" strokeWidth={1.75} />
                <span>{siteContact.addressOneLine}</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Clock size={16} className="text-primary" strokeWidth={1.75} />
                <span>{siteContact.openingHoursHeroLine}</span>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-6 relative">
            <img
              src={heroImg}
              alt={`Välkommen till ${siteBrand.name}`}
              className="w-full aspect-[4/5] object-cover media-frame-lift"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <figcaption className="hidden md:flex absolute -bottom-6 left-8 right-8 lg:left-12 lg:right-12 bg-card/95 backdrop-blur-sm border border-border/70 rounded-2xl shadow-[var(--shadow-lift)] items-center justify-between px-6 py-5">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                  Klinik &middot; {siteContact.city}
                </p>
                <p className="font-serif text-lg leading-tight text-foreground mt-1">
                  Legitimerad personal i varje rum
                </p>
              </div>
              <Ornament className="text-foreground/25 shrink-0" width={56} glyph="diamond" />
            </figcaption>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-background border-b border-border/75">
        <div className="container-wide grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/45 border-y border-border/65">
          {trustItems.map(({ icon: Icon, label, note }) => (
            <div key={label} className="bg-background py-7 px-6 flex items-center gap-4 md:justify-center md:text-left lg:text-center lg:flex-col lg:gap-3 lg:py-10">
              <span className="icon-circle-sm">
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-sm md:text-[0.9375rem] font-medium tracking-tight text-foreground">
                  {label}
                </p>
                <p className="text-xs md:text-[0.8125rem] text-muted-foreground mt-0.5">
                  {note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VEM DU MÖTER — practitioner trust signal (research: #1 trust-builder) */}
      <section className="section-y-sm">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="eyebrow">Vem du möter</span>

            <Ornament className="text-foreground/30 mt-5 mb-6" width={72} glyph="diamond" />

            <h2 className="heading-lg text-balance">
              En legitimerad sjuksköterska.{" "}
              <em className="font-serif italic font-normal text-primary/80">
                Inte ett varumärke.
              </em>
            </h2>

            <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-relaxed mt-7 max-w-prose">
              Personen som lägger nålen är samma person som tar din historik, går igenom risker och svarar på dina frågor under läkning. Inga steg outsourcade till receptionen, inga snabba bedömningar i stolen.
            </p>

            <ul className="mt-8 space-y-4 max-w-prose">
              {[
                { label: "Lyssnar först", body: "Konsultation innan rekommendation — alltid." },
                { label: "Avråder vid behov", body: "Inte alla mål löses bäst med injektion." },
                { label: "Förklarar utfall", body: "Vad du rimligt kan vänta dig — och vad inte." },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex flex-col gap-1.5 pb-4 border-b border-border/75 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-4"
                >
                  <span className="font-serif italic text-lg text-primary/70 shrink-0 sm:min-w-[7rem]">
                    {item.label}
                  </span>
                  <span className="text-[0.9375rem] text-muted-foreground leading-relaxed">
                    {item.body}
                  </span>
                </li>
              ))}
            </ul>

            <Link to="/om" className="btn-secondary mt-9">
              Läs mer om verksamheten <ArrowUpRight size={16} strokeWidth={1.75} />
            </Link>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <img
              src={clinicInterior}
              alt={`Kliniklokal — ${siteBrand.name}`}
              className="w-full aspect-[4/3] object-cover media-frame"
              loading="lazy"
              decoding="async"
            />
            <div className="hidden lg:block absolute -bottom-5 -left-5 panel px-5 py-4 max-w-[14rem]">
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
                Vår lokal &middot; {siteContact.city}
              </p>
              <p className="font-serif text-base leading-tight text-foreground mt-1">
                Tystare än en salong — ljusare än en mottagning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BEHANDLING */}
      <section className="section-y-sm bg-surface border-y border-border/75">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <img
              src={featured.image}
              alt={featured.name}
              className="w-full aspect-[4/5] object-cover media-frame"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2">
            <span className="eyebrow">{featured.category} · I fokus</span>

            <Ornament className="text-foreground/30 mt-5 mb-6" width={72} glyph="diamond" />

            <h2 className="heading-lg text-balance">{featured.name}</h2>

            <p className="font-serif italic text-xl md:text-2xl text-primary/80 leading-snug mt-3 max-w-md">
              {featured.tagline}
            </p>

            <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-relaxed mt-7 max-w-prose">
              {featured.short}
            </p>

            <hr className="hairline my-8" />

            <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground mb-4">
              Inkluderar
            </p>
            <ul className="space-y-2.5 mb-8">
              {featured.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-foreground/85 leading-relaxed">
                  <Check size={16} strokeWidth={2} className="text-primary mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <hr className="hairline mb-7" />

            <dl className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground mb-1">
                  Tidsåtgång
                </dt>
                <dd className="font-serif text-xl text-foreground">{featured.duration}</dd>
              </div>
              <div>
                <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground mb-1">
                  Pris
                </dt>
                <dd className="font-serif text-xl text-foreground">{featured.price}</dd>
              </div>
            </dl>

            <div className="flex flex-col md:flex-row gap-3">
              <Link to={`/behandlingar/${featured.slug}`} className="btn-primary justify-center">
                Läs mer <ArrowUpRight size={18} strokeWidth={1.75} />
              </Link>
              <Link to="/boka" className="btn-secondary justify-center">
                Boka konsultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BEHANDLINGAR GRID */}
      <section className="section-y-sm">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Behandlingsutbud"
            title="Skinbooster och bioremodellering"
            accent="för individuella behov"
            lead="Varje protokoll har sin egen indikation och förväntningsbild. Läs mer per behandling, eller boka en konsultation för en personlig genomgång."
            align="center"
            className="mb-12 md:mb-16 mx-auto"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-divided">
            {restOfTreatments.map((t) => (
              <Link
                key={t.slug}
                to={`/behandlingar/${t.slug}`}
                className="group bg-background flex flex-col p-6 md:p-7 transition-all duration-300 hover:bg-card hover:shadow-[var(--shadow-lift)] relative"
              >
                <div className="overflow-hidden rounded-xl mb-6 border border-border/70">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="eyebrow mb-3">{t.category}</span>
                <h3 className="font-serif text-2xl md:text-[1.625rem] leading-snug tracking-tight text-foreground mb-3 text-balance">
                  {t.name}
                </h3>
                <p className="text-muted-foreground text-[0.9375rem] leading-relaxed flex-1 mb-6">
                  {t.tagline}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border/70">
                  <span className="text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                    {t.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-primary text-sm font-medium tracking-wide">
                    Läs mer
                    <ArrowUpRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-y-sm bg-surface border-y border-border/75">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Vägen till behandling"
            title="Så går det till"
            accent="från första kontakt"
            lead="Bokning, konsultation, behandling och uppföljning — fyra steg där vi tar dig i hand utan att tappa det medicinska ramverket."
            align="center"
            className="mb-14 md:mb-20 mx-auto"
          />

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-divided">
            {processSteps.map((step) => (
              <li key={step.n} className="bg-background p-7 md:p-8 lg:p-10 flex flex-col">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-serif italic text-[2.5rem] lg:text-[3rem] leading-none text-primary/80 select-none">
                    {step.n}
                  </span>
                  <span className="hairline flex-1" />
                </div>
                <h3 className="font-serif text-2xl leading-snug tracking-tight text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-[0.9375rem] leading-relaxed">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <p className="text-center text-sm text-muted-foreground mt-10 max-w-xl mx-auto leading-relaxed">
            Återbesök erbjuds enligt rutin när protokollet motiverar det — inte som standardpaket.
          </p>
        </div>
      </section>

      {/* TRYGGHET — etik (vänster) + FAQ (höger). Ersätter tidigare separat etik-sektion. */}
      <section className="section-y-sm">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Trygghet"
            title="Det vi står för"
            accent="och det du får svar på"
            lead="Tre principer vi inte gör avkall på — och de fyra frågorna vi får oftast innan första besöket."
            align="center"
            className="mb-14 md:mb-20 mx-auto"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Etik — vänster */}
            <div className="lg:col-span-5">
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground mb-6">
                Tre principer
              </p>
              <ol className="space-y-7">
                {ethicsPrinciples.map((p, i) => (
                  <li key={p.title} className="flex gap-5">
                    <span className="font-serif italic text-3xl text-primary/40 leading-none shrink-0 select-none min-w-[2.5rem]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl leading-snug tracking-tight text-foreground mb-2 text-balance">
                        {p.title}
                      </h3>
                      <p className="text-muted-foreground text-[0.9375rem] leading-relaxed">
                        {p.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* FAQ — höger */}
            <div className="lg:col-span-7">
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground mb-6">
                Vanliga frågor
              </p>
              <dl className="border-t border-border/75">
                {faqs.map((f) => (
                  <div key={f.q} className="border-b border-border/75 py-5 md:py-6">
                    <dt className="font-serif text-[1.125rem] md:italic md:text-[1.375rem] text-foreground leading-snug mb-2.5 md:mb-3 text-balance">
                      {f.q}
                    </dt>
                    <dd className="text-muted-foreground text-[0.9375rem] md:text-base leading-relaxed">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* SLUT-CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-narrow text-center py-20 md:py-28 lg:py-32 flex flex-col items-center">
          <Ornament className="text-primary-foreground/40 mb-6" width={72} glyph="diamond" />

          <span className="text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground/70 mb-5">
            Boka eller hör av dig
          </span>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-balance max-w-[22ch]">
            Vi tar gärna en första{" "}
            <em className="font-serif italic font-normal text-primary-foreground/90">
              dialog innan du bestämmer dig.
            </em>
          </h2>

          <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed mt-6 max-w-xl">
            När du bokar online har du redan tagit del av grundinformation. Föredrar du att ringa först — säger vi gärna ja till det också.
          </p>

          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground/55 mt-7">
            Konsultationen är förbehållslös
          </p>

          <div className="mt-9 flex flex-col md:flex-row gap-3 w-full max-w-md md:max-w-none md:w-auto">
            <Link
              to="/boka"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white text-primary font-medium text-[0.9375rem] hover:bg-white/95 transition-colors min-h-[48px] md:min-h-[52px] md:text-[1.015rem] md:px-8 md:py-4"
            >
              <Calendar size={20} strokeWidth={1.75} /> Boka online
            </Link>
            <TelLink className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-primary-foreground/30 text-primary-foreground font-medium text-[0.9375rem] hover:bg-primary-foreground/10 hover:border-primary-foreground/50 transition-colors min-h-[48px] md:min-h-[52px] md:text-[1.015rem] md:px-8 md:py-4">
              <Phone size={20} strokeWidth={1.75} /> Ring {siteContact.phoneDisplay}
            </TelLink>
          </div>

          <p className="text-[0.75rem] text-primary-foreground/60 mt-12 max-w-xl leading-relaxed">
            {siteMedicalDisclaimer}
          </p>
        </div>
      </section>
    </>
  );
};

export default Index;
