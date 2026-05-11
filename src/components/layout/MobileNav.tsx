import { NavLink } from "react-router-dom";
import { Home, Sparkles, Calendar, User, MapPin } from "lucide-react";

const tabs = [
  { to: "/", label: "Hem", icon: Home },
  { to: "/behandlingar", label: "Behandlingar", icon: Sparkles },
  { to: "/boka", label: "Boka", icon: Calendar },
  { to: "/om", label: "Om oss", icon: User },
  { to: "/kontakt", label: "Kontakt", icon: MapPin },
];

const MobileNav = () => {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85 border-t border-border/75"
      aria-label="Mobilnavigation"
    >
      <div className="flex items-stretch justify-around h-16 px-1 safe-area-pb">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 py-1.5 transition-colors ${
                isActive
                  ? "text-primary"
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
