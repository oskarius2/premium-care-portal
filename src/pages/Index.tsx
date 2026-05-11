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
  Tag,
} from "lucide-react";
import heroImg from "@/assets/clinic/hero-clinic.png";
import { siteBookingNotice, siteBrand } from "@/config/siteBrand";
import { siteContact } from "@/config/siteContact";
import { HeroMedia } from "@/components/HeroMedia";
import { Ornament } from "@/components/ui/Ornament";
import { SectionHeader } from "@/components/ui/SectionHeader";

const heroTrust = [
  { icon: Stethoscope, label: "Legitimerad personal" },
  { icon: ClipboardCheck, label: "Medicinsk konsultation" },
  { icon: ShieldCheck, label: "Journalförd vård" },
];

const quickLinks = [
  {
    icon: Sparkles,
    title: "Behandlingar",
    body: "Se fillers och botox, hur konsultationen fungerar och vad som ingår.",
    to: "/behandlingar",
    cta: "Se behandlingar",
  },
  {
    icon: Tag,
    title: "Priser",
    body: "Hitta prislogiken och vad som avgör kostnaden efter bedömning.",
    to: "/priser",
    cta: "Se priser",
  },
  {
    icon: Stethoscope,
    title: "Om kliniken",
    body: "Läs om arbetssättet, den medicinska ramen och miljön i kliniken.",
    to: "/om",
    cta: "Läs om oss",
  },
  {
    icon: MapPin,
    title: "Kontakt",
    body: "Adress, öppettider och kontaktvägar samlade på en tydlig sida.",
    to: "/kontakt",
    cta: "Hitta hit",
  },
];

const Index = () => {
  const hasOpeningHours = Boolean(siteContact.openingHoursHeroLine.trim());

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/75 min-h-[calc(100svh-3.5rem)] lg:min-h-[calc(100svh-5rem)] flex items-center">
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

        <div className="container-wide relative z-10 py-8 sm:py-10 md:py-12 lg:py-14">
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

      <section className="section-y-sm">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Navigera vidare"
            title="Hitta rätt sida."
            accent="Snabbt och tydligt."
            lead="Startsidan är medvetet kort. Välj den sida som passar nästa steg, så slipper du leta i ett långt flöde."
            align="center"
            className="mb-8 sm:mb-10 md:mb-12 mx-auto"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
            {quickLinks.map(({ icon: Icon, title, body, to, cta }) => (
              <Link
                key={to}
                to={to}
                className="group bg-card rounded-[1.5rem] border border-border/80 shadow-[var(--shadow-card)] p-5 sm:p-6 min-h-[15rem] flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:border-primary/30"
              >
                <span className="icon-circle-md mb-5">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <h2 className="font-serif text-[1.55rem] sm:text-[1.75rem] leading-tight tracking-tight text-foreground text-balance">
                  {title}
                </h2>
                <p className="text-[0.94rem] text-muted-foreground leading-relaxed mt-3 flex-1">
                  {body}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {cta}
                  <ArrowUpRight size={16} strokeWidth={1.75} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-narrow text-center py-12 sm:py-14 md:py-16 flex flex-col items-center">
          <span className="text-[0.66rem] sm:text-[0.7rem] uppercase tracking-[0.22em] text-primary-foreground/70 mb-4">
            Boka konsultation
          </span>

          <h2 className="font-serif text-[2rem] xs:text-[2.25rem] sm:text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight text-balance max-w-[20ch]">
            Ett första samtal
            <em className="font-serif italic font-normal text-primary-foreground/90"> med tydlig struktur.</em>
          </h2>

          <p className="text-primary-foreground/80 text-[0.95rem] sm:text-base leading-relaxed mt-5 max-w-xl">
            {siteBookingNotice}
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3 w-full max-w-md sm:max-w-none sm:w-auto">
            <Link to="/behandlingar" className="btn-solid-light w-full sm:w-auto">
              Se behandlingar
            </Link>
            <Link to="/boka" className="btn-outline-light w-full sm:w-auto">
              Boka konsultation
            </Link>
          </div>

        </div>
      </section>
    </>
  );
};

export default Index;
