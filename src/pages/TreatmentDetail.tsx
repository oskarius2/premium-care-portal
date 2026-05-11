import { Link, useParams, Navigate } from "react-router-dom";
import { Check, ArrowLeft, Calendar } from "lucide-react";
import { treatments } from "@/data/treatments";
import { siteBookingNotice, siteMedicalDisclaimer } from "@/config/siteBrand";
import { Ornament } from "@/components/ui/Ornament";
import PageFlowNav from "@/components/layout/PageFlowNav";

const TreatmentDetail = () => {
  const { slug } = useParams();
  const t = treatments.find((x) => x.slug === slug);

  if (!t) return <Navigate to="/behandlingar" replace />;

  return (
    <article className="section-y-sm">
      <div className="container-wide">
        <Link
          to="/behandlingar"
          className="inline-flex items-center gap-2 text-[0.72rem] sm:text-[0.75rem] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8 md:mb-10"
        >
          <ArrowLeft size={14} strokeWidth={1.75} /> Alla behandlingar
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start">
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

            <Ornament
              className="text-foreground/30 mt-4 sm:mt-5 mb-5 sm:mb-6"
              width={72}
              glyph="diamond"
            />

            <h1 className="heading-lg text-balance">{t.name}</h1>

            <p className="font-serif italic text-[1.15rem] sm:text-xl md:text-2xl text-primary/80 leading-snug mt-3 max-w-md">
              {t.tagline}
            </p>

            <p className="text-muted-foreground text-[0.95rem] sm:text-base md:text-[1.0625rem] leading-relaxed mt-5 sm:mt-7 max-w-prose">
              {t.what}
            </p>

            <p className="mt-5 rounded-2xl bg-primary/5 border border-primary/20 px-4 py-3 text-sm text-muted-foreground leading-relaxed">
              {siteBookingNotice}
            </p>

            <hr className="hairline my-6 sm:my-8" />

            <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground mb-3 sm:mb-4">
              Konsultation och information
            </p>
            <ul className="space-y-2.5 mb-6 sm:mb-8">
              {t.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[0.92rem] sm:text-[0.9375rem] text-foreground/85 leading-relaxed"
                >
                  <Check size={15} strokeWidth={2} className="text-primary mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <hr className="hairline mb-6 sm:mb-7" />

            <dl className="grid grid-cols-2 gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="rounded-2xl border border-border/75 bg-card px-4 sm:px-0 py-3.5 sm:py-0 sm:border-0">
                <dt className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground mb-1">
                  Vid behandling
                </dt>
                <dd className="font-serif text-[1.05rem] sm:text-xl text-foreground">
                  {t.duration}
                </dd>
              </div>
              <div className="rounded-2xl border border-border/75 bg-card px-4 sm:px-0 py-3.5 sm:py-0 sm:border-0">
                <dt className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground mb-1">
                  Pris
                </dt>
                <dd className="font-serif text-[1.05rem] sm:text-xl text-foreground">
                  {t.price}
                </dd>
              </div>
            </dl>

            <Link
              to={`/boka?treatment=${encodeURIComponent(t.slug)}`}
              className="btn-primary btn-large w-full sm:w-auto justify-center"
            >
              <Calendar size={20} strokeWidth={1.75} /> Boka konsultation
            </Link>

            <p className="text-[0.72rem] sm:text-xs text-muted-foreground mt-8 sm:mt-10 max-w-xl leading-relaxed border-t border-border/75 pt-6 sm:pt-7">
              {siteMedicalDisclaimer} Produktnamn och beskrivningar är översiktliga; exakt indikation och kontraindikationer enligt aktuellt informationsmaterial tillämpas vid konsultation. Behandling utförs inte vid första bokningstillfället.
            </p>

            <PageFlowNav currentPath="/behandlingar" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default TreatmentDetail;
