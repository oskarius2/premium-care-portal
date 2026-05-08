import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const ariaHome = `${siteBrand.name} — startsida`;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 border-b border-border/75">
      <div className="container-wide flex items-center justify-between h-16 md:h-24">
        <Link
          to="/"
          className="flex items-center leading-none gap-3 min-w-0"
          onClick={() => setOpen(false)}
          aria-label={ariaHome}
        >
          <span className="relative inline-flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-2xl border border-primary/35 bg-white/85 text-primary shadow-[0_8px_20px_-14px_rgba(67,85,65,0.45)] shrink-0 overflow-hidden">
            <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-primary/12" aria-hidden />
            <span className="absolute -bottom-2 -right-1 w-5 h-5 rounded-full bg-accent/15" aria-hidden />
            <span className="relative font-serif text-xl md:text-[1.35rem] font-semibold tracking-tight leading-none">N</span>
          </span>
          <span className="flex flex-col items-start min-w-0">
            <span className="font-serif text-[1.15rem] md:text-[1.4rem] tracking-[0.02em] text-primary font-semibold truncate max-w-[14rem] sm:max-w-none leading-none">
              ovum
            </span>
            <span
              className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-primary/75 mt-1 truncate max-w-[14rem] sm:max-w-none"
              style={{ fontVariant: "small-caps" }}
            >
              {siteBrand.tagline}
            </span>
          </span>
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

        <div className="flex md:hidden items-center gap-2">
          <Link to="/boka" className="btn-primary btn-compact">
            Boka
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Stäng meny" : "Öppna meny"}
            aria-expanded={open}
            className="btn-icon-header"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/75 bg-background">
          <nav className="container-wide py-6 flex flex-col gap-1" aria-label="Mobilmeny">
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
            <TelLink className="mt-4 flex items-center gap-3 px-4 py-3.5 rounded-md border border-border text-base font-medium text-foreground hover:border-primary hover:text-primary transition-colors">
              <Phone size={18} className="text-primary" /> Ring {siteContact.phoneDisplay}
            </TelLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
