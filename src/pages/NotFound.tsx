import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <section className="section-y-sm">
      <div className="container-narrow max-w-2xl text-center">
        <p className="eyebrow mb-5">404</p>
        <h1 className="heading-lg text-balance">
          Sidan finns inte.
        </h1>
        <p className="lead mt-4 max-w-xl mx-auto">
          Länken verkar peka fel. Gå tillbaka till startsidan eller fortsätt till behandlingarna.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-secondary">
            Till startsidan
          </Link>
          <Link to="/behandlingar" className="btn-primary">
            Se behandlingar
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
