import { Link, NavLink } from "react-router-dom";
import { siteBrand } from "@/config/siteBrand";

const nav = [
  { to: "/", label: "Hem" },
  { to: "/behandlingar", label: "Behandlingar" },
  { to: "/om", label: "Om oss" },
  { to: "/kontakt", label: "Kontakt" },
];

const Header = () => {
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
          aria-label={ariaHome}
        >
          {/* Desktop: full logo image */}
          {logoSrc && (
            <img
              src={logoSrc}
              alt=""
              className="hidden md:block h-11 w-auto max-w-[14rem] object-contain object-left shrink-0"
              width={180}
              height={44}
              decoding="async"
            />
          )}
          {/* Mobile/tablet: monogram + text for legibility */}
          <span className="flex md:hidden items-center gap-2.5">
            <span className="relative inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-2xl border border-primary/35 bg-white/85 text-primary shadow-[0_8px_20px_-14px_rgba(67,85,65,0.45)] shrink-0 overflow-hidden">
              <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-primary/12" aria-hidden />
              <span className="absolute -bottom-2 -right-1 w-5 h-5 rounded-full bg-accent/15" aria-hidden />
              <span className="relative font-serif text-lg sm:text-xl font-semibold tracking-tight leading-none">
                N
              </span>
            </span>
            <span className="font-serif text-[1.1rem] sm:text-[1.2rem] tracking-[0.02em] text-primary font-semibold leading-none">
              Novum
            </span>
          </span>
          {/* Fallback if no logo image (desktop) */}
          {!logoSrc && (
            <span className="hidden md:flex items-center gap-3">
              <span className="relative inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-primary/35 bg-white/85 text-primary shadow-[0_8px_20px_-14px_rgba(67,85,65,0.45)] shrink-0 overflow-hidden">
                <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-primary/12" aria-hidden />
                <span className="absolute -bottom-2 -right-1 w-5 h-5 rounded-full bg-accent/15" aria-hidden />
                <span className="relative font-serif text-[1.35rem] font-semibold tracking-tight leading-none">
                  N
                </span>
              </span>
              <span className="flex flex-col items-start">
                <span className="font-serif text-[1.4rem] tracking-[0.02em] text-primary font-semibold leading-none">
                  Novum
                </span>
                <span
                  className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-primary/75 mt-1"
                  style={{ fontVariant: "small-caps" }}
                >
                  {siteBrand.tagline}
                </span>
              </span>
            </span>
          )}
        </Link>

        {/* Desktop nav */}
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

        {/* Mobile: "Boka" CTA in header */}
        <Link
          to="/boka"
          className="md:hidden btn-primary btn-compact"
          aria-label="Boka tid"
        >
          Boka
        </Link>
      </div>
    </header>
  );
};

export default Header;
