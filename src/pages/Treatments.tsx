import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Calendar, Sparkles } from "lucide-react";
import { treatments } from "@/data/treatments";
import { siteMedicalDisclaimer } from "@/config/siteBrand";
import { Ornament } from "@/components/ui/Ornament";

const Treatments = () => {
  return (
    <>
      <section className="bg-surface section-y-sm border-b border-border/75 overflow-hidden">
        <div className="container-wide max-w-4xl mx-auto text-center flex flex-col items-center relative">
          <span className="eyebrow">Behandlingar</span>
          <Ornament
            className="text-foreground/30 mt-4 mb-5 sm:mt-5 sm:mb-6 md:mt-6 md:mb-7"
            width={72}
            glyph="diamond"
          />

          <h1 className="heading-xl text-balance max-w-[16ch]">
            Två behandlingar.
            <em className="font-serif italic font-normal text-primary/85"> En medicinsk standard.</em>
          </h1>

          <p className="lead mt-4 sm:mt-5 md:mt-7 max-w-3xl">
            Vi gör medvetet två saker — fillers med Revolax Fine och botox med Dysport — och vi gör dem ordentligt. Det betyder noggrann konsultation, individuell bedömning och realistiska förväntningar innan något utförs.
          </p>

          <div className="mt-8 sm:mt-10 w-full grid grid-cols-1 md:grid-cols-3 gap-px grid-divided text-left">
            <div className="bg-background p-5 sm:p-6 md:p-7">
              <p className="eyebrow mb-2 sm:mb-3">Utbud</p>
              <p className="font-serif text-[1.7rem] sm:text-3xl leading-none tracking-tight text-foreground">
                {treatments.length} behandlingar
              </p>
              <p className="text-[0.92rem] sm:text-sm text-muted-foreground mt-2 sm:mt-3 leading-relaxed">
                Smalt och fokuserat utbud — så vi kan hålla hög kvalitet i varje konsultation och behandling.
              </p>
            </div>
            <div className="bg-background p-5 sm:p-6 md:p-7">
              <p className="eyebrow mb-2 sm:mb-3">Preparat</p>
              <p className="font-serif text-[1.7rem] sm:text-3xl leading-tight tracking-tight text-foreground">
                Revolax Fine &amp; Dysport
              </p>
              <p className="text-[0.92rem] sm:text-sm text-muted-foreground mt-2 sm:mt-3 leading-relaxed">
                Etablerade preparat valda för förutsägbarhet, naturligt resultat och dokumenterad erfarenhet.
              </p>
            </div>
            <div className="bg-background p-5 sm:p-6 md:p-7">
              <p className="eyebrow mb-2 sm:mb-3">Metod</p>
              <p className="font-serif text-[1.7rem] sm:text-3xl leading-tight tracking-tight text-foreground">
                Konsultation först
              </p>
              <p className="text-[0.92rem] sm:text-sm text-muted-foreground mt-2 sm:mt-3 leading-relaxed">
                Behandlingsval och planering görs alltid efter individuell bedömning — aldrig som färdigt standardpaket.
              </p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-7 sm:mt-9 leading-relaxed border-t border-border/75 pt-6 sm:pt-7 max-w-3xl">
            {siteMedicalDisclaimer}
          </p>
        </div>
      </section>

      <section className="section-y-sm">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto">
            {treatments.map((t) => (
              <article
                key={t.slug}
                className="group rounded-[1.5rem] sm:rounded-[1.75rem] border border-border/75 bg-card shadow-[var(--shadow-card)] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="overflow-hidden border-b border-border/70">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="p-6 sm:p-7 md:p-8 lg:p-9 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-3 sm:gap-4 flex-wrap mb-3 sm:mb-4">
                    <span className="eyebrow">{t.category}</span>
                    <span className="text-[0.66rem] sm:text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                      {t.duration}
                    </span>
                  </div>

                  <h2 className="font-serif text-[1.7rem] sm:text-[1.95rem] md:text-[2.15rem] leading-tight tracking-tight text-foreground text-balance">
                    {t.name}
                  </h2>
                  <p className="font-serif italic text-[1.05rem] sm:text-[1.15rem] md:text-xl text-primary/80 leading-snug mt-2 text-balance">
                    {t.tagline}
                  </p>
                  <p className="text-muted-foreground text-[0.95rem] sm:text-base leading-relaxed mt-4 sm:mt-5 flex-1">
                    {t.short}
                  </p>

                  <div className="mt-5 sm:mt-6 rounded-2xl bg-accent-soft/55 border border-border/70 px-4 sm:px-5 py-4">
                    <p className="text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-2.5 sm:mb-3">
                      Det här ingår
                    </p>
                    <ul className="space-y-2 sm:space-y-2.5">
                      {t.includes.slice(0, 3).map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-[0.88rem] sm:text-sm text-foreground/85 leading-relaxed"
                        >
                          <Check size={14} strokeWidth={2} className="text-primary mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-5 sm:mt-6">
                    <div className="rounded-xl border border-border/75 bg-background px-3.5 sm:px-4 py-3">
                      <p className="text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground mb-0.5">
                        Tidsåtgång
                      </p>
                      <p className="font-serif text-[1rem] sm:text-[1.1rem] text-foreground">
                        {t.duration}
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/75 bg-background px-3.5 sm:px-4 py-3">
                      <p className="text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground mb-0.5">
                        Pris
                      </p>
                      <p className="font-serif text-[1rem] sm:text-[1.1rem] text-foreground">
                        {t.price}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                    <Link to={`/behandlingar/${t.slug}`} className="btn-secondary btn-card-pair">
                      Läs mer <ArrowUpRight size={16} strokeWidth={1.75} />
                    </Link>
                    <Link
                      to={`/boka?treatment=${encodeURIComponent(t.slug)}`}
                      className="btn-primary btn-card-pair"
                    >
                      <Sparkles size={16} strokeWidth={1.75} /> Boka
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-14 md:mt-16">
            <Link to="/boka" className="btn-primary btn-large w-full sm:w-auto justify-center">
              <Calendar size={20} strokeWidth={1.75} /> Boka konsultation
            </Link>
            <p className="text-[0.85rem] sm:text-sm text-muted-foreground mt-4 sm:mt-5 max-w-md mx-auto leading-relaxed">
              Osäker på vilken behandling som passar? Boka en konsultation så avgör vi det tillsammans.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Treatments;
