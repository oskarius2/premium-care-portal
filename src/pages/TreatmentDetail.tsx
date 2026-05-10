import { useParams, Link } from "react-router-dom";
import { Clock, Shield, FileText, AlertCircle, Calendar, ArrowLeft, Syringe, Activity } from "lucide-react";

const treatmentsData = {
  filler: {
    name: "Fillers",
    subtitle: "Revolax Fine – subtila volymer och fina linjer",
    description: "Hyaluronsyra för att mjuka upp linjer, återställa volym och skapa ett naturligt harmoniskt ansiktsuttryck.",
    duration: "Ca 45 minuter",
    price: "Från 3 500 kr",
    image: "https://i.imgur.com/C3mBqkF.jpeg",
    icon: Syringe,
    longDescription: `
      Vi inleder alltid med en medicinsk konsultation där vi går igenom din hälsodeklaration,
      tidigare estetiska ingrepp, allergier och läkemedel. Detta för att säkerställa att behandlingen är lämplig för just dig.
    `,
    whatIs: `
      Revolax Fine är en hyaluronsyrabaserad filler avsedd för fina linjer och mer subtila volymjusteringar.
      Hyaluronsyra är en naturligt förekommande substans i huden som binder vatten och ger volym.
    `,
    beforeTreatment: [
      "Undvik blodförtunnande medicin (t.ex. Ipren, Aspirin, Omega-3) 1 vecka före behandling om möjligt (rådfråga din läkare).",
      "Undvik alkohol 24 timmar före behandling – minskar risk för blåmärken och svullnad.",
      "Berätta alltid om du haft herpes, autoimmuna sjukdomar, är gravid/ammar eller har pågående infektioner."
    ],
    afterTreatment: [
      "Undvik att trycka eller massera behandlade områden de första 24 timmarna.",
      "Undvik intensiv träning, bastu, solarium och sprit i minst 48 timmar efter behandling.",
      "Lindrig rodnad, svullnad, ömhet eller blåmärken kan förekomma och brukar avta inom några dagar."
    ],
    risks: [
      "Vanliga: Rodnad, svullnad, ömhet, blåmärken vid injektionsstället (oftast övergående).",
      "Mindre vanliga: Knölar eller ojämnheter – går ofta att massera eller lösa upp vid behov.",
      "Sällsynta men allvarliga: Infektion, kärlocklusion (kan påverka syn/hud). Vi arbetar aseptiskt för att minimera risker.",
      "Alltid: Genomgång av risker, normala reaktioner och vad du ska göra vid ovanliga symtom."
    ],
    contraindications: [
      "Graviditet eller amning",
      "Aktiva infektioner eller inflammation i behandlingsområdet",
      "Allergi mot hyaluronsyra eller lidokain",
      "Autoimmuna sjukdomar eller blödningsrubbningar (individuell bedömning)"
    ]
  },
  botox: {
    name: "Botox",
    subtitle: "Dysport – mjukare uttryck, naturligt resultat",
    description: "Muskelavslappnande för att tillfälligt minska mimiska rynkor och skapa ett mer balanserat uttryck.",
    duration: "Ca 30 minuter",
    price: "Från 2 800 kr",
    image: "https://i.imgur.com/J0FqQ4y.jpeg",
    icon: Activity,
    longDescription: `
      Behandling med Dysport – ett botulinumtoxin-preparat som används för att tillfälligt minska aktiviteten
      i utvalda mimiska muskler. Fokus ligger på ett naturligt och balanserat uttryck snarare än ett 'fryst' resultat.
    `,
    whatIs: `
      Dysport är ett botulinumtoxin typ A som blockerar nervsignaler till musklerna. Detta gör att musklerna slappnar av,
      vilket minskar uppkomsten av dynamiska rynkor (t.ex. pannrynkor, kräkbensrynkor).
    `,
    beforeTreatment: [
      "Undvik blodförtunnande medicin 1 vecka före behandling (rådfråga din läkare).",
      "Undvik alkohol 24 timmar före behandling – minskar risk för blåmärken.",
      "Berätta om du haft neurologisk sjukdom, myasthenia gravis, är gravid/ammar eller har pågående infektion."
    ],
    afterTreatment: [
      "Undvik att böja dig framåt eller ligga ner 4 timmar efter behandling.",
      "Undvik intensiv träning, bastu, solarium och sprit i 24–48 timmar.",
      "Undvik att massera eller trycka på behandlade områden (riskerar att sprida toxinet).",
      "Fullt resultat syns efter ca 2 veckor – effekten varar 3–6 månader."
    ],
    risks: [
      "Vanliga: Lindrig rodnad, svullnad, ömhet eller blåmärken vid injektionsstället.",
      "Mindre vanliga: Huvudvärk, temporärt hängande ögonbryn eller ögonlock (övergående).",
      "Sällsynta: Allergisk reaktion, infektion, påverkan på omkringliggande muskler.",
      "Alltid: Genomgång av risker och vad du ska göra vid ovanliga symtom."
    ],
    contraindications: [
      "Graviditet eller amning",
      "Neuromuskulära sjukdomar (t.ex. myasthenia gravis)",
      "Aktiva infektioner i behandlingsområdet",
      "Allergi mot botulinumtoxin eller äggprotein (Dysport innehåller spår av mjölkprotein)"
    ]
  }
};

const TreatmentDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const treatment = slug === "filler" ? treatmentsData.filler : slug === "botox" ? treatmentsData.botox : null;

  if (!treatment) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "hsl(44, 30%, 97%)" }}>
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">Behandlingen hittades inte</h1>
          <Link to="/behandlingar" className="text-sm underline">Tillbaka till behandlingar</Link>
        </div>
      </div>
    );
  }

  const Icon = treatment.icon;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(44, 30%, 97%)" }}>
      
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end pb-12 px-4">
        <div className="absolute inset-0 z-0">
          <img src={treatment.image} alt={treatment.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <Link to="/behandlingar" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> Tillbaka till behandlingar
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <Icon className="w-8 h-8 text-white" />
            <span className="text-white/80 text-sm uppercase tracking-wider">Behandling</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-3">{treatment.name}</h1>
          <p className="text-xl text-white/90 max-w-2xl">{treatment.subtitle}</p>
        </div>
      </section>

      {/* Kort info */}
      <section className="py-10 px-4 border-b" style={{ backgroundColor: "hsl(0, 0%, 100%)", borderColor: "hsl(42, 22%, 80%)" }}>
        <div className="max-w-5xl mx-auto flex flex-wrap gap-8 justify-between items-center">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5" style={{ color: "hsl(96, 15%, 33%)" }} />
            <div>
              <p className="text-sm" style={{ color: "hsl(94, 8%, 42%)" }}>Behandlingstid</p>
              <p className="font-medium" style={{ color: "hsl(94, 10%, 24%)" }}>{treatment.duration}</p>
            </div>
          </div>
          <div className="w-px h-8" style={{ backgroundColor: "hsl(42, 22%, 80%)" }} />
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5" style={{ color: "hsl(96, 15%, 33%)" }} />
            <div>
              <p className="text-sm" style={{ color: "hsl(94, 8%, 42%)" }}>Pris från</p>
              <p className="font-medium" style={{ color: "hsl(94, 10%, 24%)" }}>{treatment.price}</p>
            </div>
          </div>
          <Link to="/boka" className="px-6 py-2.5 rounded-full text-sm font-medium transition" style={{ backgroundColor: "hsl(96, 15%, 33%)", color: "white" }}>
            Boka konsultation
          </Link>
        </div>
      </section>

      {/* Innehåll */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="space-y-12">
          
          {/* Vad är */}
          <div>
            <h2 className="text-2xl font-serif mb-4" style={{ color: "hsl(94, 10%, 24%)" }}>Vad är {treatment.name}?</h2>
            <p className="leading-relaxed" style={{ color: "hsl(94, 8%, 42%)" }}>{treatment.whatIs}</p>
          </div>

          {/* Behandlingen */}
          <div>
            <h2 className="text-2xl font-serif mb-4" style={{ color: "hsl(94, 10%, 24%)" }}>Om behandlingen</h2>
            <p className="leading-relaxed" style={{ color: "hsl(94, 8%, 42%)" }}>{treatment.longDescription}</p>
          </div>

          {/* Före */}
          <div className="rounded-xl p-6" style={{ backgroundColor: "hsl(44, 28%, 92%)" }}>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2" style={{ color: "hsl(94, 10%, 24%)" }}>
              <Shield className="w-5 h-5" /> Inför behandlingen
            </h3>
            <ul className="space-y-2 list-disc list-inside" style={{ color: "hsl(94, 8%, 42%)" }}>
              {treatment.beforeTreatment.map((item, i) => (
                <li key={i} className="text-sm">{item}</li>
              ))}
            </ul>
          </div>

          {/* Efter */}
          <div className="rounded-xl p-6" style={{ backgroundColor: "hsl(44, 28%, 92%)" }}>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2" style={{ color: "hsl(94, 10%, 24%)" }}>
              <FileText className="w-5 h-5" /> Eftervård & återhämtning
            </h3>
            <ul className="space-y-2 list-disc list-inside" style={{ color: "hsl(94, 8%, 42%)" }}>
              {treatment.afterTreatment.map((item, i) => (
                <li key={i} className="text-sm">{item}</li>
              ))}
            </ul>
          </div>

          {/* Risker */}
          <div className="rounded-xl p-6 border" style={{ borderColor: "hsl(42, 22%, 80%)" }}>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2" style={{ color: "hsl(94, 10%, 24%)" }}>
              <AlertCircle className="w-5 h-5" /> Risker & biverkningar
            </h3>
            <ul className="space-y-2 list-disc list-inside" style={{ color: "hsl(94, 8%, 42%)" }}>
              {treatment.risks.map((item, i) => (
                <li key={i} className="text-sm">{item}</li>
              ))}
            </ul>
          </div>

          {/* Kontraindikationer */}
          <div>
            <h3 className="font-semibold text-lg mb-3" style={{ color: "hsl(94, 10%, 24%)" }}>När rekommenderas inte behandling?</h3>
            <ul className="space-y-2 list-disc list-inside" style={{ color: "hsl(94, 8%, 42%)" }}>
              {treatment.contraindications.map((item, i) => (
                <li key={i} className="text-sm">{item}</li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="text-xs italic pt-6 border-t" style={{ color: "hsl(94, 8%, 42%)", borderColor: "hsl(42, 22%, 80%)" }}>
            <p>Informationen på webbplatsen är av allmän karaktär och ersätter inte individuell medicinsk bedömning, diagnostik eller behandlingsråd. Resultat av estetiska ingrepp varierar mellan individer och kan inte garanteras.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TreatmentDetail;