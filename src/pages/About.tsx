import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { siteBookingNotice, siteBrand, siteMedicalDisclaimer } from "@/config/siteBrand";
import { siteContact } from "@/config/siteContact";
import interior from "@/assets/about/about-clinic.png";
import consultationNook from "@/assets/clinic/about-consult-nook.png";
import { Ornament } from "@/components/ui/Ornament";
import PageFlowNav from "@/components/layout/PageFlowNav";

const expectations = [
  {
    title: "Legitimerad kompetens",
    body: "Behandling utförs av legitimerade sjuksköterskor som förstår både vävnad och omvårdnad — och som fortbildar sig inom injektionsteknik, komplikationshantering och patientsäkerhet.",
  },
  {
    title: "Konsultation före ingrepp",
    body: "Vi går igenom hälsodeklaration, läkemedel, tidigare ingrepp och dina förväntningar. Första bokningstillfället är konsultation och information; därefter gäller 48 timmars betänketid innan eventuell behandling.",
  },
  {
    title: "Struktur & integritet",
    body: "Steril teknik, spårbar dokumentation och hantering av personuppgifter enligt GDPR. Du ska känna att miljön är lika genomtänkt som förklaringarna du får.",
  },
];

const About = () => {
  return (
    <>
      {/* HERO */}
      <section className="bg-surface section-y-sm border-b border-border/75">
        <div className="container-wide max-w-3xl">
          <span className="eyebrow">Om oss</span>

          <Ornament className="text-foreground/30 mt-5 mb-6 md:mt-6 md:mb-7" width={88} glyph="diamond" />

          <h1 className="heading-xl text-balance">
            Medicinsk skönhetsvård{" "}
            <em className="font-serif italic font-normal text-primary/85">
              i {siteContact.city}.
            </em>
          </h1>

          <p className="lead mt-5 md:mt-7 max-w-2xl">
            Vi har utvecklats från klassisk frisörsalong till en klinik där injektionsbehandlingar och andra estetiska ingrepp genomförs med samma strukturer som kännetecknar seriös vård: dokumentation, steril teknik, kontinuerlig kompetensutveckling och ett tydligt patientperspektiv.
          </p>

          <p className="mt-5 text-base md:text-[1.0625rem] text-muted-foreground leading-relaxed max-w-2xl">
            Med <strong className="text-foreground font-medium">medicinsk estetik</strong> menar vi inte mirakel eller filter — utan åtgärder där kunskap om anatomi, vävnad och läkemedel krävs för att välja rätt preparat, dos och teknik. Du möter legitimerade sjuksköterskor som kan förklara varför något är lämpligt, varför vi ibland avråder och vad du realistiskt kan förvänta dig av ett protokoll över tid.
          </p>
        </div>
      </section>

      {/* OMSTÄLLNING — bild + text */}
      <section className="section-y-sm">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <img
              src={interior}
              alt={`Vår kliniklokal — ${siteBrand.name}`}
              className="w-full aspect-[4/3] object-cover media-frame"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2">
            <span className="eyebrow">Vår omställning</span>

            <Ornament className="text-foreground/30 mt-5 mb-6" width={72} glyph="diamond" />

            <h2 className="heading-lg text-balance">
              Från salong{" "}
              <em className="font-serif italic font-normal text-primary/80">
                till klinik.
              </em>
            </h2>

            <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-relaxed mt-6 max-w-prose">
              Många år nära kunder i ett lugnt, välkomnande rum har lärt oss att lyssna innan vi handlar. Idag kombinerar vi det bemötandet med journalföring enligt god praxis, infektionsrutiner anpassade för injektionsmiljö och en etisk linje:{" "}
              <strong className="text-foreground font-medium">vi behandlar inte för volymens skull</strong> — utan utifrån din hälsa, dina mål och vad evidens och tillverkarens riktlinjer medger.
            </p>

            <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-relaxed mt-5 max-w-prose">
              Vårt utbud kretsar kring skinboosters och bioremodellerande protokoll — preparat och tekniker där små skillnader i produktval, djup och punktplacering kan påverka både säkerhet och utfall. Därför lägger vi tid på konsultation, informerat samtycke och uppföljning när så behövs.
            </p>

            <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-relaxed mt-5 max-w-prose">
              Vi ser estetik som en del av välbefinnande, men aldrig som ett substitut för dermatologisk eller annan sjukvård när du har symtom eller diagnoser som kräver annan kompetens — då hänvisar vi transparent.
            </p>
          </div>
        </div>
      </section>

      {/* DET HÄR KAN DU FÖRVÄNTA DIG — editorial 3-list, inga box-cards */}
      <section className="section-y-sm bg-surface border-y border-border/75">
        <div className="container-wide">
          <div className="flex flex-col items-center text-center mb-12 md:mb-16 gap-5">
            <span className="eyebrow">Förväntan</span>
            <Ornament className="text-foreground/30" width={96} glyph="diamond" />
            <h2 className="heading-lg text-balance max-w-[28ch]">
              Det här kan du{" "}
              <em className="font-serif italic font-normal text-primary/85">
                förvänta dig av oss.
              </em>
            </h2>
            <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-relaxed max-w-[58ch]">
              Trygg medicinsk estetik handlar lika mycket om vad vi <em className="italic">inte</em> lovar som om vad vi kan erbjuda — tydlighet kring risker, alternativ och tidslinjer.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 grid-divided max-w-5xl mx-auto">
            {expectations.map((p, i) => (
              <li key={p.title} className="bg-background p-7 md:p-8 lg:p-10 flex flex-col">
                <span className="font-serif italic text-3xl text-primary/40 leading-none mb-5 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-xl md:text-2xl leading-snug tracking-tight text-foreground mb-3 text-balance">
                  {p.title}
                </h3>
                <p className="text-muted-foreground text-[0.9375rem] leading-relaxed">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>

          <p className="text-center text-sm text-muted-foreground mt-10 max-w-2xl mx-auto leading-relaxed">
            {siteBookingNotice} {siteMedicalDisclaimer}
          </p>
        </div>
      </section>

      {/* ORD FRÅN VERKSAMHETEN */}
      <section className="section-y-sm">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <span className="eyebrow">Ord från verksamheten</span>

            <Ornament className="text-foreground/30 mt-5 mb-6" width={72} glyph="diamond" />

            <blockquote className="font-serif text-2xl md:text-[1.875rem] leading-snug tracking-tight text-foreground text-balance">
              <em className="font-serif italic font-normal text-primary/85">«</em>
              Skönhetsvård som berör hud och vävnad förtjänar samma respekt som annan vård: tid för frågor, mod att avstå när det inte är rätt — och en arbetsmiljö där patienten aldrig känner sig skyldig att{" "}
              <em className="font-serif italic">köpa mer</em>.
              <em className="font-serif italic font-normal text-primary/85">»</em>
            </blockquote>

            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground mt-7">
              — {siteBrand.name} · {siteContact.city}
            </p>

            <Link to="/boka" className="btn-primary btn-large mt-9">
              <Calendar size={20} strokeWidth={1.75} /> Boka konsultation
            </Link>
          </div>

          <img
            src={consultationNook}
            alt={`Konsultationsmiljö — ${siteBrand.name}`}
            className="lg:col-span-6 order-1 lg:order-2 w-full aspect-[4/5] object-cover media-frame"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="container-wide">
          <PageFlowNav currentPath="/om" />
        </div>
      </section>
    </>
  );
};

export default About;
