import { Link, useParams, Navigate } from "react-router-dom";
import { Check, ArrowLeft, Calendar } from "lucide-react";
import { treatments } from "@/data/treatments";
import { siteMedicalDisclaimer } from "@/config/siteBrand";
import { Ornament } from "@/components/ui/Ornament";

const TreatmentDetail = () => {
  const { slug } = useParams();
  const t = treatments.find((x) => x.slug === slug);

  if (!t) return <Navigate to="/behandlingar" replace />;

  return (
    <article className="section-y-sm">
      <div className="container-wide">
        <Link
          to="/behandlingar"
          className="inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft size={14} strokeWidth={1.75} /> Alla behandlingar
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <img
            src={t.image}
            alt={t.name}
            className="lg:col-span-7 w-full aspect-[4/5] object-cover media-frame"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />

          <div className="lg:col-span-5">
            <span className="eyebrow">{t.category}</span>

            <Ornament className="text-foreground/30 mt-5 mb-6" width={72} glyph="diamond" />

            <h1 className="heading-lg text-balance">{t.name}</h1>

            <p className="font-serif italic text-xl md:text-2xl text-primary/80 leading-snug mt-3 max-w-md">
              {t.tagline}
            </p>

            <p className="text-muted-foreground text-base md:text-[1.0625rem] leading-relaxed mt-7 max-w-prose">
              {t.what}
            </p>

            <hr className="hairline my-8" />

            <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground mb-4">
              Det här ingår
            </p>
            <ul className="space-y-2.5 mb-8">
              {t.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[0.9375rem] text-foreground/85 leading-relaxed"
                >
                  <Check size={16} strokeWidth={2} className="text-primary mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <hr className="hairline mb-7" />

            <dl className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground mb-1">
                  Tidsåtgång
                </dt>
                <dd className="font-serif text-xl text-foreground">{t.duration}</dd>
              </div>
              <div>
                <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground mb-1">
                  Pris
                </dt>
                <dd className="font-serif text-xl text-foreground">{t.price}</dd>
              </div>
            </dl>

            <Link
              to={`/boka?treatment=${encodeURIComponent(t.slug)}`}
              className="btn-primary btn-large w-full sm:w-auto"
            >
              <Calendar size={20} strokeWidth={1.75} /> Boka tid
            </Link>

            <p className="text-xs text-muted-foreground mt-10 max-w-xl leading-relaxed border-t border-border/75 pt-7">
              {siteMedicalDisclaimer} Produktnamn och beskrivningar är översiktliga; exakt indikation och kontraindikationer enligt aktuellt informationsmaterial tillämpas vid konsultation.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TreatmentDetail;
