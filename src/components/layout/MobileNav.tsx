import { NavLink } from "react-router-dom";
import { Home, Sparkles, Calendar, User, MapPin, Tag } from "lucide-react";

const tabs = [
  { to: "/", label: "Hem", icon: Home },
  { to: "/behandlingar", label: "Behandlingar", icon: Sparkles },
  { to: "/boka", label: "Boka", icon: Calendar },
  { to: "/priser", label: "Priser", icon: Tag },
  { to: "/kontakt", label: "Kontakt", icon: MapPin },
];

const MobileNav = () => {
  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/96 backdrop-blur supports-[backdrop-filter]:bg-background/88 border-t border-border/75 shadow-[0_-18px_38px_-32px_rgba(50,63,44,0.46)]"
      aria-label="Mobilnavigation"
    >
      <div className="flex items-stretch justify-around h-16 px-1.5 safe-area-pb">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 my-1 rounded-2xl transition-[background-color,color] ${
                isActive
                  ? "bg-accent-soft text-primary"
                  : "text-foreground/50 active:text-foreground/70"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <tab.icon
                  size={20}
                  strokeWidth={isActive ? 2.25 : 1.75}
                  className="shrink-0"
                />
                <span
                  className={`text-[0.6rem] leading-tight truncate max-w-full px-0.5 ${
                    isActive ? "font-semibold" : "font-medium"
                  }`}
                >
                  {tab.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
