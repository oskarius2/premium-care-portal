import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileNav from "./MobileNav";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
      {/* Spacer so bottom nav doesn't cover footer content on mobile */}
      <div className="lg:hidden h-16" aria-hidden />
    </div>
  );
};

export default Layout;
