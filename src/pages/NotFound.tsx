import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <section className="page-shell">
      <div className="container-page">
        <div className="panel mx-auto max-w-xl p-8 sm:p-10 text-center">
          <p className="eyebrow mb-3">404</p>
          <h1 className="font-serif text-4xl sm:text-5xl leading-tight tracking-tight">
            Sidan finns inte
          </h1>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Länken kan vara gammal eller felstavad. Gå tillbaka till startsidan och fortsätt därifrån.
          </p>
          <div className="mt-7 flex items-center justify-center">
            <Link to="/" className="btn-primary">
              Till startsidan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
