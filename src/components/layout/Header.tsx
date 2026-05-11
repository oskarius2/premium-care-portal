import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, MapPin, Calendar, ChevronRight } from "lucide-react";
import { siteContact } from "@/config/siteContact";
import { siteBrand } from "@/config/siteBrand";
import { TelLink } from "@/components/ContactAnchors";

const nav = [
  { to: "/", label: "Hem", description: "Start och introduktion" },
  { to: "/behandlingar", label: "Behandlingar", description: "Botox och fillers" },
  { to: "/priser", label: "Priser", description: "Prislista och konsultation" },
  { to: "/om", label: "Om oss", description: "Klinik och arbetssätt" },
  { to: "/kontakt", label: "Kontakt", description: "Adress och uppgifter" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const hasPhone = Boolean(siteContact.phoneDisplay.trim() && siteContact.phoneTel);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Stäng på Escape och returnera fokus till togglen.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ariaHome = `${siteBrand.name} — startsida`;
  const logoSrc = siteBrand.logoPublicPath
    ? `${import.meta.env.BASE_URL}${siteBrand.logoPublicPath.replace(/^\//, "")}`
    : null;

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 shadow-[0_1px_0_rgba(255,255,255,0.78)_inset,0_18px_36px_-32px_rgba(50,63,44,0.45)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/78">
      <div className="container-wide flex items-center justify-between h-14 sm:h-16 lg:h-24 gap-3">
        <Link
          to="/"
          className="group flex items-center leading-none gap-2.5 sm:gap-3 min-w-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          onClick={() => setOpen(false)}
          aria-label={ariaHome}
        >
          {logoSrc ? (
            <img
              src={logoSrc}
              alt=""
              className="h-8 sm:h-9 lg:h-11 w-auto max-w-[min(100%,12rem)] sm:max-w-[14rem] object-contain object-left shrink-0 transition-transform duration-200 group-hover:scale-[1.015]"
              width={180}
              height={44}
              decoding="async"
            />
          ) : (
            <>
              <span className="relative inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-2xl border border-primary/35 bg-white/85 text-primary shadow-[0_8px_20px_-14px_rgba(67,85,65,0.45)] shrink-0 overflow-hidden">
                <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-primary/12" aria-hidden />
                <span className="absolute -bottom-2 -right-1 w-5 h-5 rounded-full bg-accent/15" aria-hidden />
                <span className="relative font-serif text-lg sm:text-xl lg:text-[1.35rem] font-semibold tracking-tight leading-none">
                  N
                </span>
              </span>
              <span className="flex flex-col items-start min-w-0">
                <span className="font-serif text-[1.05rem] sm:text-[1.15rem] lg:text-[1.4rem] tracking-[0.02em] text-primary font-semibold truncate max-w-[10rem] xs:max-w-[12rem] sm:max-w-none leading-none">
                  ovum
                </span>
                <span
                  className="text-[0.58rem] sm:text-[0.62rem] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.24em] text-primary/75 mt-1 truncate max-w-[10rem] xs:max-w-[12rem] sm:max-w-none"
                  style={{ fontVariant: "small-caps" }}
                >
                  {siteBrand.tagline}
                </span>
              </span>
            </>
          )}
        </Link>

        <nav
          className="hidden lg:flex items-center gap-2 rounded-full border border-border/70 bg-white/55 p-1 shadow-[0_1px_0_rgba(255,255,255,0.82)_inset,0_14px_30px_-24px_rgba(50,63,44,0.38)]"
          aria-label="Huvudmeny"
        >
          <div className="flex items-center gap-0.5">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `relative rounded-full px-3.5 xl:px-4 py-2 text-sm font-semibold tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-200 ${
                    isActive
                      ? "bg-accent-soft text-accent-deep shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_10px_22px_-18px_rgba(50,63,44,0.52)]"
                      : "text-foreground/68 hover:-translate-y-0.5 hover:bg-white/70 hover:text-foreground"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <Link to="/boka" className="btn-primary btn-compact ml-1">
            <Calendar size={16} strokeWidth={1.75} />
            Boka tid
          </Link>
        </nav>

        <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
          <Link
            to="/boka"
            onClick={() => setOpen(false)}
            className="btn-primary btn-compact"
            aria-label="Boka tid"
          >
            <Calendar size={16} strokeWidth={1.75} className="-ml-0.5" />
            <span className="hidden xs:inline">Boka</span>
          </Link>
          <button
            ref={toggleRef}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Stäng meny" : "Öppna meny"}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            className="btn-icon-header"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav-panel"
          className="lg:hidden border-t border-border/75 bg-background/98 shadow-[0_28px_46px_-34px_rgba(50,63,44,0.62)]"
        >
          <nav
            className="container-wide max-h-[calc(100vh-3.5rem)] overflow-y-auto py-5 sm:py-6 flex flex-col gap-2"
            aria-label="Mobilmeny"
          >
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center justify-between gap-4 rounded-2xl border px-4 py-3.5 transition-[background-color,border-color,box-shadow,color] ${
                    isActive
                      ? "border-primary/25 bg-accent-soft text-accent-deep shadow-[0_1px_0_rgba(255,255,255,0.78)_inset]"
                      : "border-border/75 bg-card/72 text-foreground/82 hover:border-primary/25 hover:bg-white/85 hover:text-foreground"
                  }`
                }
              >
                <span className="min-w-0">
                  <span className="block text-base font-semibold tracking-tight">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-[0.78rem] leading-relaxed text-muted-foreground">
                    {item.description}
                  </span>
                </span>
                <ChevronRight
                  size={17}
                  strokeWidth={1.75}
                  className="shrink-0 text-primary/60 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </NavLink>
            ))}

            <div className="mt-4 rounded-[1.35rem] border border-border/75 bg-surface/80 p-3 grid grid-cols-1 xs:grid-cols-2 gap-2.5">
              <Link
                to="/boka"
                onClick={() => setOpen(false)}
                className="btn-primary btn-compact justify-center"
              >
                <Calendar size={16} strokeWidth={1.75} /> Boka tid
              </Link>

              {hasPhone ? (
                <TelLink className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-border text-[0.85rem] font-medium text-foreground hover:border-primary hover:text-primary transition-colors min-h-[46px]">
                  <Phone size={16} className="text-primary" />
                  <span className="truncate">{siteContact.phoneDisplay}</span>
                </TelLink>
              ) : (
                <Link
                  to="/kontakt"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-border text-[0.85rem] font-medium text-foreground hover:border-primary hover:text-primary transition-colors min-h-[46px]"
                >
                  <MapPin size={16} className="text-primary" /> Kontakt &amp; adress
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
