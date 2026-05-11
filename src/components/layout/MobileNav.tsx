import { Link, useLocation } from "react-router-dom";
import { Home, Sparkles, Calendar, User, MapPin, Tag } from "lucide-react";

const tabs = [
  { to: "/", label: "Hem", icon: Home },
  { to: "/behandlingar", label: "Behandl.", icon: Sparkles },
  { to: "/priser", label: "Priser", icon: Tag },
  { to: "/om", label: "Om", icon: User },
  { to: "/kontakt", label: "Kontakt", icon: MapPin },
  { to: "/boka", label: "Boka", icon: Calendar },
];

const MobileNav = () => {
  const { pathname } = useLocation();

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/96 backdrop-blur supports-[backdrop-filter]:bg-background/88 border-t border-border/75 shadow-[0_-18px_38px_-34px_rgba(50,63,44,0.55)]"
      aria-label="Mobilnavigation"
    >
      <div className="flex items-stretch justify-around h-16 px-1 safe-area-pb">
        {tabs.map((tab) => {
          const isActive =
            tab.to === "/" ? pathname === "/" : pathname === tab.to || pathname.startsWith(`${tab.to}/`);

          return (
            <Link
              key={tab.to}
              to={tab.to}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 py-1.5 rounded-2xl transition-[color,background-color,box-shadow] ${
                isActive
                  ? "text-primary bg-accent-soft/85 shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.10)]"
                  : "text-foreground/45 active:text-foreground/75"
              }`}
            >
              <tab.icon
                size={19}
                strokeWidth={isActive ? 2.25 : 1.75}
                className="shrink-0"
              />
              <span
                className={`text-[0.56rem] xs:text-[0.6rem] leading-tight truncate max-w-full px-0.5 ${
                  isActive ? "font-semibold" : "font-medium"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
