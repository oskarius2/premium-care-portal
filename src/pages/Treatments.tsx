import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { treatments } from "@/data/treatments";
import { siteMedicalDisclaimer } from "@/config/siteBrand";
import { Ornament } from "@/components/ui/Ornament";

const Treatments = () => {
  return (
    <>
      {/* HERO */}
      <section className="bg-surface section-y-sm border-b border-border/75">
        <div className="container-wide max-w-3xl mx-auto text-center flex flex-col items-center">
          <span className="eyebrow">Behandlingar</span>

          <Ornament className="text-foreground/30 mt-5 mb-6 md:mt-6 md:mb-7" width={88} glyph="diamond" />

          <h1 className="heading-xl text-balance">
            Skinbooster &amp;{" "}
            <em className="font-serif italic font-normal text-primary/85">
              bioremodellering.
            </em>
          </h1>

          <p className="lead mt-5 md:mt-7 max-w-2xl">
            Preparat och protokoll vi arbetar med efter legitimerad bedömning — med tyngdpunkt på hudens kvalitet (fukt, elasticitet och struktur) snarare än dramatisk förändring av konturer i ett enda steg.
          </p>

          <p className="text-muted-foreground text-[0.9375rem] leading-relaxed max-w-2xl mt-5">
            Välj ett alternativ för djupare genomgång eller gå direkt till bokning. Vid första besök kan planen justeras utifrån hälsodeklaration och hudstatus;{" "}
            <strong className="text-foreground font-medium">utfall och antal tillfällen varierar individuellt</strong>.
          </p>

          <p className="text-xs text-muted-foreground mt-9 leading-relaxed border-t border-border/75 pt-7 max-w-2xl">
            {siteMedicalDisclaimer}
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="section-y-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-divided">
            {treatments.map((t) => (
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
                <h2 className="font-serif text-2xl md:text-[1.625rem] leading-snug tracking-tight text-foreground mb-3 text-balance">
                  {t.name}
                </h2>
                <p className="text-muted-foreground text-[0.9375rem] leading-relaxed flex-1 mb-6">
                  {t.short}
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
    </>
  );
};

export default Treatments;
