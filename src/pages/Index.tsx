import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, FileText, Sparkles, Syringe, Activity, ChevronDown, Clock, Calendar, MapPin } from "lucide-react";

// Proxy-funktion för att ladda Imgur-bilder
const proxyImage = (url: string) => {
  const encoded = encodeURIComponent(url);
  return `https://images.weserv.nl/?url=${encoded}`;
};

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "Hur vet jag vilken behandling som passar mig?", a: "Det avgörs under en individuell medicinsk konsultation utifrån din hud, anatomi, önskemål och medicinska historik." },
    { q: "Kommer resultatet att se naturligt ut?", a: "Ja, vi fokuserar på gradvisa förbättringar, hudkvalitet och harmoni – aldrig överdrivna förändringar." },
    { q: "Vad händer om jag bokar fel behandling?", a: "Din onlinebokning är en preliminär tid. Behandlingen fastställs först efter konsultation och medicinsk bedömning." },
    { q: "Varför är tonen så medicinsk?", a: "För att injektionsbehandling är vårdnära. Den kan vara varm och välkomnande – men ska kännas seriös och trygg." }
  ];

  // Era bilder med proxy
  const heroImage = proxyImage("https://i.imgur.com/2RgBQAd.jpeg");
  const fillerImage = proxyImage("https://i.imgur.com/C3mBqkF.jpeg");
  const botoxImage = proxyImage("https://i.imgur.com/J0FqQ4y.jpeg");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(44, 30%, 97%)" }}>
      
      {/* HERO – med er bild via proxy */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center px-4">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage}
            alt="Novum Estetik klinikmiljö"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <span className="text-sm uppercase tracking-wider bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full inline-block mb-4">
            Estetik med medicinsk ryggrad
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-tight">
            Novum Estetik
          </h1>
          <p className="text-xl md:text-2xl mt-6 max-w-2xl mx-auto text-white/90">
            Premium känsla. Medicinsk trygghet.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Link 
              to="/boka" 
              className="px-8 py-3 rounded-full bg-white text-gray-900 hover:bg-white/90 transition font-medium"
            >
              Boka konsultation
            </Link>
            <Link 
              to="/behandlingar" 
              className="px-8 py-3 rounded-full border border-white/60 text-white hover:bg-white/10 transition"
            >
              Våra behandlingar
            </Link>
          </div>
        </div>
        
        {/* Scroll-ner pil */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/60" />
        </div>
      </section>

      {/* BEHANDLINGAR */}
      <section className="py-24 px-4" style={{ backgroundColor: "hsl(0, 0%, 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-light" style={{ color: "hsl(94, 10%, 24%)" }}>
              Våra behandlingar
            </h2>
            <div className="w-16 h-px mx-auto mt-4" style={{ backgroundColor: "hsl(96, 15%, 33%)" }} />
            <p className="mt-4" style={{ color: "hsl(94, 8%, 42%)" }}>
              Två behandlingar. En medicinsk standard.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Filler */}
            <Link 
              to="/behandlingar/filler" 
              className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={fillerImage}
                  alt="Fillers behandling"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6" style={{ backgroundColor: "hsl(0, 0%, 100%)" }}>
                <Syringe className="w-8 h-8 mb-3" style={{ color: "hsl(96, 15%, 33%)" }} />
                <h3 className="text-2xl font-serif mb-2" style={{ color: "hsl(94, 10%, 24%)" }}>Fillers</h3>
                <p className="text-sm mb-4" style={{ color: "hsl(94, 8%, 42%)" }}>
                  Revolax Fine – subtila volymer och fina linjer. Hyaluronsyra för ett naturligt lyft.
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all" style={{ color: "hsl(96, 15%, 33%)" }}>
                  Läs mer → 
                </span>
              </div>
            </Link>

            {/* Botox */}
            <Link 
              to="/behandlingar/botox" 
              className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={botoxImage}
                  alt="Botox behandling"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6" style={{ backgroundColor: "hsl(0, 0%, 100%)" }}>
                <Activity className="w-8 h-8 mb-3" style={{ color: "hsl(96, 15%, 33%)" }} />
                <h3 className="text-2xl font-serif mb-2" style={{ color: "hsl(94, 10%, 24%)" }}>Botox</h3>
                <p className="text-sm mb-4" style={{ color: "hsl(94, 8%, 42%)" }}>
                  Dysport – mjukar upp mimiska rynkor. Ett naturligt och balanserat uttryck.
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all" style={{ color: "hsl(96, 15%, 33%)" }}>
                  Läs mer → 
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* VÅR VÅRD */}
      <section className="py-20 px-4" style={{ backgroundColor: "hsl(44, 28%, 92%)" }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-light mb-12" style={{ color: "hsl(94, 10%, 24%)" }}>
            Medicinsk kompetens. Estetisk känsla.
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <div className="w-14 h-14 mx-auto rounded-full bg-white/60 flex items-center justify-center mb-4">
                <Shield className="w-7 h-7" style={{ color: "hsl(96, 15%, 33%)" }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: "hsl(94, 10%, 24%)" }}>Legitimerad personal</h3>
              <p className="text-sm" style={{ color: "hsl(94, 8%, 42%)" }}>Varje behandling utförs av legitimerad sjuksköterska.</p>
            </div>
            <div>
              <div className="w-14 h-14 mx-auto rounded-full bg-white/60 flex items-center justify-center mb-4">
                <FileText className="w-7 h-7" style={{ color: "hsl(96, 15%, 33%)" }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: "hsl(94, 10%, 24%)" }}>Journalförd vård</h3>
              <p className="text-sm" style={{ color: "hsl(94, 8%, 42%)" }}>Dokumentation enligt GDPR och god vårdpraxis.</p>
            </div>
            <div>
              <div className="w-14 h-14 mx-auto rounded-full bg-white/60 flex items-center justify-center mb-4">
                <Sparkles className="w-7 h-7" style={{ color: "hsl(96, 15%, 33%)" }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: "hsl(94, 10%, 24%)" }}>Naturliga resultat</h3>
              <p className="text-sm" style={{ color: "hsl(94, 8%, 42%)" }}>Harmoni över tid – aldrig överdrivna förändringar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 px-4" style={{ backgroundColor: "hsl(0, 0%, 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-light mb-12" style={{ color: "hsl(94, 10%, 24%)" }}>
            Så här går det till
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="w-12 h-12 mx-auto rounded-full border-2 mb-4 flex items-center justify-center" style={{ borderColor: "hsl(96, 15%, 33%)", color: "hsl(96, 15%, 33%)" }}>
                1
              </div>
              <h3 className="font-semibold mb-1">Boka</h3>
              <p className="text-xs" style={{ color: "hsl(94, 8%, 42%)" }}>Online eller via telefon</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto rounded-full border-2 mb-4 flex items-center justify-center" style={{ borderColor: "hsl(96, 15%, 33%)", color: "hsl(96, 15%, 33%)" }}>
                2
              </div>
              <h3 className="font-semibold mb-1">Konsultation</h3>
              <p className="text-xs" style={{ color: "hsl(94, 8%, 42%)" }}>Medicinsk bedömning</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto rounded-full border-2 mb-4 flex items-center justify-center" style={{ borderColor: "hsl(96, 15%, 33%)", color: "hsl(96, 15%, 33%)" }}>
                3
              </div>
              <h3 className="font-semibold mb-1">Behandling</h3>
              <p className="text-xs" style={{ color: "hsl(94, 8%, 42%)" }}>Aseptisk teknik</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto rounded-full border-2 mb-4 flex items-center justify-center" style={{ borderColor: "hsl(96, 15%, 33%)", color: "hsl(96, 15%, 33%)" }}>
                4
              </div>
              <h3 className="font-semibold mb-1">Eftervård</h3>
              <p className="text-xs" style={{ color: "hsl(94, 8%, 42%)" }}>Uppföljning & råd</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4" style={{ backgroundColor: "hsl(44, 28%, 92%)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-light text-center mb-12" style={{ color: "hsl(94, 10%, 24%)" }}>
            Frågor & svar
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden" style={{ backgroundColor: "hsl(0, 0%, 100%)" }}>
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-5 text-left font-medium"
                  style={{ color: "hsl(94, 10%, 24%)" }}
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5" style={{ color: "hsl(94, 8%, 42%)" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section className="py-20 px-4 text-center" style={{ backgroundColor: "hsl(96, 15%, 33%)", color: "white" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-light mb-4">Redo att ta nästa steg?</h2>
          <p className="mb-8 opacity-90">
            Boka en medicinsk konsultation – vi går igenom dina önskemål och förutsättningar.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/boka" className="px-8 py-3 rounded-full bg-white text-gray-900 hover:bg-white/90 transition font-medium">
              Boka tid
            </Link>
            <Link to="/kontakt" className="px-8 py-3 rounded-full border border-white/60 hover:bg-white/10 transition">
              Kontakta oss
            </Link>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-sm opacity-75">
            <p>Rådhusgatan 64, 831 34 Östersund</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;