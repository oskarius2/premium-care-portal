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
  },
  {
    slug: "botox",
    title: "Botox",
    subtitle: "Dysport – naturligt uttryck",
    description: "Muskelavslappnande för ett mjukare och mer balanserat uttryck.",
    icon: Activity,
    time: "Ca 30 minuter",
  },
];

const Treatments = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="px-4 py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-light tracking-tight text-gray-900">
            Våra behandlingar
          </h1>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Två behandlingar. En medicinsk standard.
          </p>
        </div>
      </section>

      {/* Behandlingskort – horisontellt scroll på mobil, grid på desktop */}
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
                    className="block w-72 md:w-auto bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <Icon className="w-10 h-10 text-gray-800 mb-4" />
                    <h2 className="text-2xl font-serif font-light mb-1">{treatment.title}</h2>
                    <p className="text-sm text-gray-500 mb-2">{treatment.subtitle}</p>
                    <p className="text-gray-600 text-sm mt-3">{treatment.description}</p>
                    <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-50">
                      <span className="text-xs text-gray-400">{treatment.time}</span>
                      <span className="text-sm font-medium text-gray-900 flex items-center gap-1">
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

      {/* Kort info om konsultation */}
      <section className="px-4 py-10 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-serif mb-3">Behöver du hjälp att välja?</h2>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Vi går alltid igenom dina önskemål, hudstatus och förutsättningar under en medicinsk konsultation – så att du känner dig trygg redan från start.
          </p>
          <Link
            to="/boka"
            className="inline-block mt-6 px-6 py-2.5 border border-gray-900 rounded-full text-sm hover:bg-gray-900 hover:text-white transition"
          >
            Boka konsultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Treatments;
