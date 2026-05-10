import { useState } from "react";
import { ChevronDown, Shield, Clock, Syringe, Activity, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [openSections, setOpenSections] = useState({
    process: false,
    faq: false,
    clinic: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(44, 30%, 97%)" }}>
      {/* HERO */}
      <section className="relative px-4 py-16 md:py-24" style={{ backgroundColor: "hsl(44, 30%, 97%)" }}>
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-light tracking-tight" style={{ color: "hsl(94, 10%, 24%)" }}>
            Novum Estetik
          </h1>
          <p className="text-xl md:text-2xl mt-4 max-w-2xl mx-auto" style={{ color: "hsl(94, 8%, 42%)" }}>
            Premium känsla. Medicinsk ryggrad.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Link 
              to="/boka" 
              className="px-6 py-3 rounded-full transition" 
              style={{ backgroundColor: "hsl(96, 15%, 33%)", color: "hsl(48, 35%, 98%)" }}
            >
              Boka konsultation
            </Link>
            <Link 
              to="/behandlingar" 
              className="px-6 py-3 rounded-full transition border" 
              style={{ borderColor: "hsl(42, 22%, 80%)", color: "hsl(94, 10%, 24%)" }}
            >
              Våra behandlingar
            </Link>
          </div>
        </div>
      </section>

      {/* USP - 3 kort */}
      <section className="py-12 px-4 border-b" style={{ borderColor: "hsl(42, 22%, 80%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <Shield className="w-10 h-10 mx-auto mb-3" style={{ color: "hsl(96, 15%, 33%)" }} />
              <h3 className="font-semibold text-lg" style={{ color: "hsl(94, 10%, 24%)" }}>Legitimerad personal</h3>
              <p className="text-sm" style={{ color: "hsl(94, 8%, 42%)" }}>Alltid medicinsk kompetens</p>
            </div>
            <div className="text-center p-4">
              <Clock className="w-10 h-10 mx-auto mb-3" style={{ color: "hsl(96, 15%, 33%)" }} />
              <h3 className="font-semibold text-lg" style={{ color: "hsl(94, 10%, 24%)" }}>Journalförd vård</h3>
              <p className="text-sm" style={{ color: "hsl(94, 8%, 42%)" }}>Dokumentation enligt GDPR</p>
            </div>
            <div className="text-center p-4">
              <Sparkles className="w-10 h-10 mx-auto mb-3" style={{ color: "hsl(96, 15%, 33%)" }} />
              <h3 className="font-semibold text-lg" style={{ color: "hsl(94, 10%, 24%)" }}>Naturligt resultat</h3>
              <p className="text-sm" style={{ color: "hsl(94, 8%, 42%)" }}>Harmoni över tid</p>
            </div>
          </div>
        </div>
      </section>

      {/* BEHANDLINGAR */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-serif text-center mb-8" style={{ color: "hsl(94, 10%, 24%)" }}>Våra behandlingar</h2>
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-4 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible" style={{ minWidth: "max-content" }}>
              <Link 
                to="/behandlingar/filler" 
                className="block w-72 md:w-auto rounded-2xl p-6 transition hover:shadow-lg" 
                style={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(42, 22%, 80%)" }}
              >
                <Syringe className="w-8 h-8 mb-3" style={{ color: "hsl(96, 15%, 33%)" }} />
                <h3 className="font-semibold text-xl" style={{ color: "hsl(94, 10%, 24%)" }}>Fillers</h3>
                <p className="text-sm mt-2" style={{ color: "hsl(94, 8%, 42%)" }}>Revolax Fine – subtila volymer</p>
                <span className="inline-block mt-3 text-sm font-medium" style={{ color: "hsl(96, 15%, 33%)" }}>Läs mer →</span>
              </Link>
              <Link 
                to="/behandlingar/botox" 
                className="block w-72 md:w-auto rounded-2xl p-6 transition hover:shadow-lg" 
                style={{ backgroundColor: "hsl(0, 0%, 100%)", border: "1px solid hsl(42, 22%, 80%)" }}
              >
                <Activity className="w-8 h-8 mb-3" style={{ color: "hsl(96, 15%, 33%)" }} />
                <h3 className="font-semibold text-xl" style={{ color: "hsl(94, 10%, 24%)" }}>Botox</h3>
                <p className="text-sm mt-2" style={{ color: "hsl(94, 8%, 42%)" }}>Dysport – naturligt uttryck</p>
                <span className="inline-block mt-3 text-sm font-medium" style={{ color: "hsl(96, 15%, 33%)" }}>Läs mer →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ACCORDION – Process */}
      <section className="py-6 px-4 border-t" style={{ borderColor: "hsl(42, 22%, 80%)" }}>
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => toggleSection("process")}
            className="w-full flex justify-between items-center py-6 text-left font-serif text-xl"
            style={{ color: "hsl(94, 10%, 24%)" }}
          >
            <span>Vår process</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${openSections.process ? "rotate-180" : ""}`} />
          </button>
          {openSections.process && (
            <div className="pb-6 space-y-4" style={{ color: "hsl(94, 8%, 42%)" }}>
              <div><strong style={{ color: "hsl(96, 15%, 33%)" }}>01.</strong> Första kontakt – boka online, läs in dig</div>
              <div><strong style={{ color: "hsl(96, 15%, 33%)" }}>02.</strong> Konsultation – genomgång av mål och hudstatus</div>
              <div><strong style={{ color: "hsl(96, 15%, 33%)" }}>03.</strong> Behandling – aseptisk teknik, dokumentation</div>
              <div><strong style={{ color: "hsl(96, 15%, 33%)" }}>04.</strong> Eftervård – konkreta råd och kontaktväg</div>
            </div>
          )}
        </div>
      </section>

      {/* ACCORDION – FAQ */}
      <section className="py-6 px-4 border-t" style={{ borderColor: "hsl(42, 22%, 80%)" }}>
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => toggleSection("faq")}
            className="w-full flex justify-between items-center py-6 text-left font-serif text-xl"
            style={{ color: "hsl(94, 10%, 24%)" }}
          >
            <span>Vanliga frågor</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${openSections.faq ? "rotate-180" : ""}`} />
          </button>
          {openSections.faq && (
            <div className="pb-6 space-y-4" style={{ color: "hsl(94, 8%, 42%)" }}>
              <div><strong style={{ color: "hsl(96, 15%, 33%)" }}>Hur vet jag vilken behandling som passar mig?</strong><p className="mt-1">Det avgörs individuellt under konsultationen.</p></div>
              <div><strong style={{ color: "hsl(96, 15%, 33%)" }}>Kommer resultatet att se naturligt ut?</strong><p className="mt-1">Ja, vi fokuserar på gradvisa förbättringar och harmoni.</p></div>
              <div><strong style={{ color: "hsl(96, 15%, 33%)" }}>Vad händer om jag bokar fel behandling?</strong><p className="mt-1">Planen justeras alltid efter medicinsk bedömning.</p></div>
            </div>
          )}
        </div>
      </section>

      {/* ACCORDION – Kliniken */}
      <section className="py-6 px-4 border-t border-b" style={{ borderColor: "hsl(42, 22%, 80%)" }}>
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => toggleSection("clinic")}
            className="w-full flex justify-between items-center py-6 text-left font-serif text-xl"
            style={{ color: "hsl(94, 10%, 24%)" }}
          >
            <span>Kliniken</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${openSections.clinic ? "rotate-180" : ""}`} />
          </button>
          {openSections.clinic && (
            <div className="pb-6 space-y-2" style={{ color: "hsl(94, 8%, 42%)" }}>
              <p><strong>Adress:</strong> Rådhusgatan 64, 831 34 Östersund</p>
              <p><strong>Miljö:</strong> Lugn, medicinskt trygg och varmt inbjudande</p>
              <p className="text-sm mt-4 italic">Informationen ersätter inte individuell medicinsk bedömning.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;