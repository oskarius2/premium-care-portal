import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { treatments } from "@/data/treatments";
import { siteBookingNotice, siteMedicalDisclaimer } from "@/config/siteBrand";
import { Ornament } from "@/components/ui/Ornament";

const Pricing = () => {
  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="container-wide max-w-3xl mx-auto text-center flex flex-col items-center">
          <span className="eyebrow">Prislista</span>

          <Ornament className="text-foreground/30 mt-5 mb-6 md:mt-6 md:mb-7" width={88} glyph="diamond" />

          <h1 className="heading-xl text-balance">
            Tydliga priser{" "}
            <em className="font-serif italic font-normal text-primary/85">
              — efter konsultation.
            </em>
          </h1>

          <p className="lead mt-5 md:mt-7 max-w-2xl">
            Pris ges efter individuell bedömning eftersom rätt preparat, mängd och antal tillfällen varierar mellan personer. Första bokningen är konsultation och information; behandling planeras först efter 48 timmars betänketid.
          </p>
        </div>
      </section>

      {/* PRISLISTA */}
      <section className="page-section">
        <div className="container-wide max-w-3xl mx-auto">
          <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground mb-6">
            Behandlingar
          </p>

          <ul className="border-t border-border/75">
            {treatments.map((t) => (
              <li
                key={t.slug}
                className="border-b border-border/75 py-7 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-8 gap-y-3 items-baseline"
              >
                <div>
                  <Link
                    to={`/behandlingar/${t.slug}`}
                    className="group inline-block"
                  >
                    <h2 className="font-serif text-xl md:text-2xl leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors text-balance">
                      {t.name}
                    </h2>
                  </Link>
                  <p className="text-[0.9375rem] text-muted-foreground leading-relaxed mt-2 max-w-prose">
                    {t.tagline}
                  </p>
                  <p className="inline-flex items-center gap-2 text-[0.8125rem] text-muted-foreground mt-3">
                    <Clock size={14} strokeWidth={1.75} className="text-primary/70" />
                    {t.duration}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="font-serif text-xl md:text-[1.5rem] text-foreground leading-tight">
                    {t.price}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="text-sm text-muted-foreground leading-relaxed mt-8 max-w-2xl">
            {siteBookingNotice} {siteMedicalDisclaimer}
          </p>

          <div className="text-center mt-12 md:mt-16">
            <Link to="/boka" className="btn-primary btn-large">
              <Calendar size={20} strokeWidth={1.75} /> Boka konsultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
