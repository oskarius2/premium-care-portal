import { Link, NavLink } from "react-router-dom";
import { Calendar } from "lucide-react";
import { siteBrand } from "@/config/siteBrand";

const nav = [
  { to: "/", label: "Hem" },
  { to: "/behandlingar", label: "Behandlingar" },
  { to: "/priser", label: "Priser" },
  { to: "/om", label: "Om oss" },
  { to: "/kontakt", label: "Kontakt" },
];

const Header = () => {
  const ariaHome = `${siteBrand.name} — startsida`;
  const logoSrc = siteBrand.logoPublicPath
    ? `${import.meta.env.BASE_URL}${siteBrand.logoPublicPath.replace(/^\//, "")}`
    : null;

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/92 shadow-[0_1px_0_rgba(255,255,255,0.78)_inset,0_18px_36px_-34px_rgba(50,63,44,0.45)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/82">
      <div className="container-wide flex items-center justify-between h-14 sm:h-16 lg:h-20 gap-3">
        <Link
          to="/"
          className="group flex items-center leading-none gap-2.5 sm:gap-3 min-w-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={ariaHome}
        >
          {/* Desktop: full logo image */}
          {logoSrc && (
            <img
              src={logoSrc}
              alt=""
              className="hidden lg:block h-10 w-auto max-w-[13rem] object-contain object-left shrink-0 transition-transform duration-200 group-hover:scale-[1.015]"
              width={180}
              height={44}
              decoding="async"
            />
          )}
          {/* Mobile/tablet: monogram + text for legibility */}
          <span className="flex lg:hidden items-center gap-2.5">
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
            <span className="hidden lg:flex items-center gap-3">
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
        <nav
          className="hidden lg:flex items-center gap-2 rounded-full border border-border/70 bg-white/62 p-1 shadow-[0_1px_0_rgba(255,255,255,0.82)_inset,0_14px_30px_-25px_rgba(50,63,44,0.38)]"
          aria-label="Huvudmeny"
        >
          <div className="flex items-center gap-0.5">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `relative rounded-full px-3.5 xl:px-4 py-2 text-sm font-semibold tracking-[-0.005em] transition-[background-color,border-color,color,box-shadow,transform] duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_10px_22px_-18px_rgba(50,63,44,0.58)]"
                      : "text-foreground/70 hover:-translate-y-0.5 hover:bg-white/82 hover:text-foreground"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <Link to="/boka" className="btn-primary btn-compact ml-1">
            <Calendar size={16} strokeWidth={1.75} />
            Boka konsultation
          </Link>
        </nav>

        {/* Mobile: "Boka" CTA in header */}
        <Link
          to="/boka"
          className="lg:hidden btn-primary btn-compact"
          aria-label="Boka konsultation"
        >
          <Calendar size={16} strokeWidth={1.75} className="-ml-0.5" />
          <span className="hidden xs:inline">Boka</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
