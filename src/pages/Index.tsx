import { useState } from "react";
import { ChevronDown, Shield, Clock, Syringe, Activity } from "lucide-react";
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
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative px-4 py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-light tracking-tight text-gray-900">
            Novum Estetik
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Premium känsla. Medicinsk ryggrad.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Link to="/boka" className="px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition">
              Boka konsultation
            </Link>
            <Link to="/behandlingar" className="px-6 py-3 border border-gray-300 rounded-full hover:border-gray-900 transition">
              Våra behandlingar
            </Link>
          </div>
        </div>
      </section>

      {/* USP-sektion */}
      <section className="py-12 px-4 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <Shield className="w-10 h-10 mx-auto text-gray-700 mb-3" />
              <h3 className="font-semibold text-lg">Legitimerad personal</h3>
              <p className="text-gray-600 text-sm">Alltid med medicinsk kompetens</p>
            </div>
            <div className="text-center p-4">
              <Clock className="w-10 h-10 mx-auto text-gray-700 mb-3" />
              <h3 className="font-semibold text-lg">Journalförd vård</h3>
              <p className="text-gray-600 text-sm">Dokumentation enligt GDPR</p>
            </div>
          </div>
        </div>
      </section>

      {/* Behandlingar */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-serif text-center mb-8">Våra behandlingar</h2>
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-4 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible" style={{ minWidth: "max-content" }}>
              <Link to="/behandlingar/filler" className="block w-72 md:w-auto bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition">
                <Syringe className="w-8 h-8 text-gray-700 mb-3" />
                <h3 className="font-semibold text-xl">Fillers</h3>
                <p className="text-gray-600 text-sm mt-2">Revolax Fine – subtila volymer</p>
                <span className="inline-block mt-3 text-sm font-medium text-gray-900">Läs mer →</span>
              </Link>
              <Link to="/behandlingar/botox" className="block w-72 md:w-auto bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition">
                <Activity className="w-8 h-8 text-gray-700 mb-3" />
                <h3 className="font-semibold text-xl">Botox</h3>
                <p className="text-gray-600 text-sm mt-2">Dysport – naturligt uttryck</p>
                <span className="inline-block mt-3 text-sm font-medium text-gray-900">Läs mer →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion - Process */}
      <section className="py-6 px-4 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => toggleSection("process")}
            className="w-full flex justify-between items-center py-6 text-left font-serif text-xl"
          >
            <span>Vår process</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${openSections.process ? "rotate-180" : ""}`} />
          </button>
          {openSections.process && (
            <div className="pb-6 space-y-4 text-gray-600">
              <div><strong>01. Första kontakt</strong> – Boka online, läs in dig på behandlingarna.</div>
              <div><strong>02. Konsultation</strong> – Genomgång av mål, hudstatus och förväntningar.</div>
              <div><strong>03. Behandling</strong> – Aseptisk teknik och dokumentation.</div>
              <div><strong>04. Eftervård</strong> – Konkreta råd och kontaktväg.</div>
            </div>
          )}
        </div>
      </section>

      {/* Accordion - FAQ */}
      <section className="py-6 px-4 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => toggleSection("faq")}
            className="w-full flex justify-between items-center py-6 text-left font-serif text-xl"
          >
            <span>Vanliga frågor</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${openSections.faq ? "rotate-180" : ""}`} />
          </button>
          {openSections.faq && (
            <div className="pb-6 space-y-4 text-gray-600">
              <div><strong>Hur vet jag vilken behandling som passar mig?</strong><p className="mt-1">Det avgörs i konsultationen.</p></div>
              <div><strong>Kommer resultatet att se naturligt ut?</strong><p className="mt-1">Ja – vi fokuserar på gradvisa förbättringar.</p></div>
              <div><strong>Vad händer om jag bokar fel behandling?</strong><p className="mt-1">Planen justeras efter medicinsk bedömning.</p></div>
            </div>
          )}
        </div>
      </section>

      {/* Accordion - Klinikinfo */}
      <section className="py-6 px-4 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => toggleSection("clinic")}
            className="w-full flex justify-between items-center py-6 text-left font-serif text-xl"
          >
            <span>Kliniken</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${openSections.clinic ? "rotate-180" : ""}`} />
          </button>
          {openSections.clinic && (
            <div className="pb-6 space-y-2 text-gray-600">
              <p><strong>Adress:</strong> Rådhusgatan 64, 831 34 Östersund</p>
              <p><strong>Miljö:</strong> Lugn, genomtänkt och medicinskt trygg.</p>
              <p className="text-sm mt-4 italic">Informationen på webbplatsen ersätter inte individuell medicinsk bedömning.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;