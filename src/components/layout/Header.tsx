import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, MapPin, Calendar } from "lucide-react";
import { siteContact } from "@/config/siteContact";
import { siteBrand } from "@/config/siteBrand";
import { TelLink } from "@/components/ContactAnchors";

const nav = [
  { to: "/", label: "Hem" },
  { to: "/behandlingar", label: "Behandlingar" },
  { to: "/om", label: "Om oss" },
  { to: "/kontakt", label: "Kontakt" },
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
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 border-b border-border/75">
      <div className="container-wide flex items-center justify-between h-14 sm:h-16 md:h-24">
        <Link
          to="/"
          className="flex items-center leading-none gap-2.5 sm:gap-3 min-w-0"
          onClick={() => setOpen(false)}
          aria-label={ariaHome}
        >
          {logoSrc ? (
            <img
              src={logoSrc}
              alt=""
              className="h-8 sm:h-9 md:h-11 w-auto max-w-[min(100%,12rem)] sm:max-w-[14rem] object-contain object-left shrink-0"
              width={180}
              height={44}
              decoding="async"
            />
          ) : (
            <>
              <span className="relative inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-2xl border border-primary/35 bg-white/85 text-primary shadow-[0_8px_20px_-14px_rgba(67,85,65,0.45)] shrink-0 overflow-hidden">
                <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-primary/12" aria-hidden />
                <span className="absolute -bottom-2 -right-1 w-5 h-5 rounded-full bg-accent/15" aria-hidden />
                <span className="relative font-serif text-lg sm:text-xl md:text-[1.35rem] font-semibold tracking-tight leading-none">
                  N
                </span>
              </span>
              <span className="flex flex-col items-start min-w-0">
                <span className="font-serif text-[1.05rem] sm:text-[1.15rem] md:text-[1.4rem] tracking-[0.02em] text-primary font-semibold truncate max-w-[10rem] xs:max-w-[12rem] sm:max-w-none leading-none">
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

        <nav className="hidden md:flex items-center gap-1" aria-label="Huvudmeny">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium tracking-tight transition-colors ${
                  isActive
                    ? "text-primary after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-[1.05rem] after:w-1 after:h-1 after:rounded-full after:bg-primary"
                    : "text-foreground/70 hover:text-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/boka" className="btn-primary btn-compact ml-4">
            Boka tid
          </Link>
        </nav>

        <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
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
          className="md:hidden border-t border-border/75 bg-background"
        >
          <nav
            className="container-wide py-5 sm:py-6 flex flex-col gap-1"
            aria-label="Mobilmeny"
          >
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3.5 rounded-md text-base font-medium tracking-tight transition-colors ${
                    isActive
                      ? "bg-accent-soft text-accent-deep"
                      : "text-foreground/80 hover:bg-surface hover:text-foreground"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="mt-3 grid grid-cols-1 xs:grid-cols-2 gap-2.5">
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
