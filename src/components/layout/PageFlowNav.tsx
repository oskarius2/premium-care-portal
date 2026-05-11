import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

type PageFlowNavProps = {
  currentPath?: string;
};

const pageFlow = [
  { to: "/", label: "Hem" },
  { to: "/behandlingar", label: "Behandlingar" },
  { to: "/priser", label: "Priser" },
  { to: "/om", label: "Om oss" },
  { to: "/kontakt", label: "Kontakt" },
  { to: "/boka", label: "Boka" },
];

const normalizePath = (pathname: string) => {
  if (pathname.startsWith("/behandlingar/")) return "/behandlingar";
  if (pathname.startsWith("/admin")) return "";
  return pathname;
};

const PageFlowNav = ({ currentPath }: PageFlowNavProps) => {
  const location = useLocation();
  const normalized = normalizePath(currentPath ?? location.pathname);
  const currentIndex = pageFlow.findIndex((page) => page.to === normalized);

  if (currentIndex === -1) return null;

  const previousPage = pageFlow[currentIndex - 1];
  const nextPage = pageFlow[currentIndex + 1];

  return (
    <section className="mt-12 sm:mt-14 md:mt-16 border-t border-border/70 pt-6 sm:pt-8">
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
        <span className="page-flow-chip">Snabbnavigering</span>
        {pageFlow.map((page) => (
          <Link
            key={page.to}
            to={page.to}
            className={`page-flow-link ${page.to === normalized ? "border-primary/40 text-primary" : ""}`}
            aria-current={page.to === normalized ? "page" : undefined}
          >
            {page.label}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {previousPage ? (
          <Link to={previousPage.to} className="btn-secondary w-full justify-center sm:justify-start">
            <ArrowLeft size={18} strokeWidth={1.8} />
            {previousPage.label}
          </Link>
        ) : (
          <span className="hidden sm:block" aria-hidden />
        )}

        {nextPage ? (
          <Link to={nextPage.to} className="btn-primary w-full justify-center sm:justify-end">
            {nextPage.label}
            <ArrowRight size={18} strokeWidth={1.8} />
          </Link>
        ) : (
          <Link to="/" className="btn-secondary w-full justify-center sm:justify-end">
            <ArrowLeft size={18} strokeWidth={1.8} />
            Till startsidan
          </Link>
        )}
      </div>
    </section>
  );
};

export default PageFlowNav;
