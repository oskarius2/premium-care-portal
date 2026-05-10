import { Link } from "react-router-dom";
import { Syringe, Activity, ArrowRight } from "lucide-react";

const treatments = [
  {
    slug: "filler",
    title: "Fillers",
    subtitle: "Revolax Fine – subtila volymer",
    description: "Hyaluronsyra för fina linjer och subtila volymjusteringar.",
    icon: Syringe,
    time: "Ca 45 minuter",
    longDescription: "Vi inleder alltid med hälsodeklaration och en strukturerad genomgång av läkemedel, allergier och tidigare estetiska ingrepp. Du får en saklig bild av vad Revolax Fine är avsett för och vad du rimligt kan förvänta dig — utan absoluta löften om varaktighet eller grad av förändring."
  },
  {
    slug: "botox",
    title: "Botox",
    subtitle: "Dysport – naturligt uttryck",
    description: "Muskelavslappnande för ett mjukare och mer balanserat uttryck.",
    icon: Activity,
    time: "Ca 30 minuter",
    longDescription: "Behandling med Dysport — ett botulinumtoxin-preparat som används för att tillfälligt minska aktivitet i utvalda mimiska muskler. Fokus ligger på ett naturligt och balanserat uttryck snarare än ett 'fryst' resultat."
  },
];

const Treatments = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(44, 30%, 97%)" }}>
      {/* Hero */}
      <section className="px-4 py-12 md:py-16 border-b" style={{ borderColor: "hsl(42, 22%, 80%)", backgroundColor: "hsl(44, 30%, 97%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-light tracking-tight" style={{ color: "hsl(94, 10%, 24%)" }}>
            Våra behandlingar
          </h1>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto" style={{ color: "hsl(94, 8%, 42%)" }}>
            Två behandlingar. En medicinsk standard.
          </p>
        </div>
      </section>

      {/* Behandlingskort */}
      <section className="px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-5 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible" style={{ minWidth: "max-content" }}>
              {treatments.map((treatment) => {
                const Icon = treatment.icon;
                return (
                  <Link
                    key={treatment.slug}
                    to={`/behandlingar/${treatment.slug}`}
                    className="block w-72 md:w-auto rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                    style={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(42, 22%, 80%)" }}
                  >
                    <Icon className="w-10 h-10 mb-4" style={{ color: "hsl(96, 15%, 33%)" }} />
                    <h2 className="text-2xl font-serif font-light mb-1" style={{ color: "hsl(94, 10%, 24%)" }}>{treatment.title}</h2>
                    <p className="text-sm mb-2" style={{ color: "hsl(94, 8%, 42%)" }}>{treatment.subtitle}</p>
                    <p className="text-sm mt-3" style={{ color: "hsl(94, 8%, 42%)" }}>{treatment.description}</p>
                    <div className="flex items-center justify-between mt-5 pt-3" style={{ borderTop: "1px solid hsl(42, 22%, 80%)" }}>
                      <span className="text-xs" style={{ color: "hsl(94, 8%, 42%)" }}>{treatment.time}</span>
                      <span className="text-sm font-medium flex items-center gap-1" style={{ color: "hsl(96, 15%, 33%)" }}>
                        Läs mer <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Konsultationsinfo */}
      <section className="px-4 py-10 border-t" style={{ borderColor: "hsl(42, 22%, 80%)", backgroundColor: "hsl(44, 28%, 92%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-serif mb-3" style={{ color: "hsl(94, 10%, 24%)" }}>Behöver du hjälp att välja?</h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: "hsl(94, 8%, 42%)" }}>
            Vi går alltid igenom dina önskemål, hudstatus och förutsättningar under en medicinsk konsultation – så att du känner dig trygg redan från start.
          </p>
          <Link
            to="/boka"
            className="inline-block mt-6 px-6 py-2.5 rounded-full text-sm transition"
            style={{ border: "1px solid hsl(96, 15%, 33%)", color: "hsl(96, 15%, 33%)" }}
          >
            Boka konsultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Treatments;