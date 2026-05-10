import { useEffect, useState } from "react";

const LOOP_MP4 = `${import.meta.env.BASE_URL}hero/hero-bg.mp4`;
const LOOP_WEBM = `${import.meta.env.BASE_URL}hero/hero-bg.webm`;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

type Props = {
  /** Bundlad poster (t.ex. importerad JPG/WebP) — visas som stillbild och som video-poster. */
  posterSrc: string;
  alt: string;
};

/**
 * Hero: spela loop från `public/hero/hero-bg.mp4` (+ valfri `hero-bg.webm`).
 * Saknas filer eller om användaren har `prefers-reduced-motion` → bara stillbilden.
 */
export function HeroMedia({ posterSrc, alt }: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const showVideo = !reducedMotion && !videoFailed;

  const shell =
    "relative w-full aspect-[4/5] rounded-2xl border border-border/85 shadow-[var(--shadow-card)] overflow-hidden bg-muted";

  const imgClass = "absolute inset-0 h-full w-full object-cover";

  return (
    <div className={shell}>
      {showVideo ? (
        <video
          className={imgClass}
          poster={posterSrc}
          muted
          playsInline
          loop
          autoPlay
          preload="metadata"
          aria-hidden
          onError={() => setVideoFailed(true)}
        >
          <source src={LOOP_WEBM} type="video/webm" />
          <source src={LOOP_MP4} type="video/mp4" />
        </video>
      ) : (
        <img
          src={posterSrc}
          alt={alt}
          className={imgClass}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      )}
    </div>
  );
}
