import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index.tsx"; // startsidan – ladda direkt (LCP)
import Book from "./pages/Book.tsx"; // primär CTA – ladda direkt för mjuk navigation

/* Sekundära routes lazy-laddas och förladdas efter första renderingen.
   Boka är en primär CTA och laddas direkt för att undvika synlig route-flash. */
const loadTreatments = () => import("./pages/Treatments.tsx");
const loadTreatmentDetail = () => import("./pages/TreatmentDetail.tsx");
const loadAbout = () => import("./pages/About.tsx");
const loadContact = () => import("./pages/Contact.tsx");
const loadPricing = () => import("./pages/Pricing.tsx");
const loadAdmin = () => import("./pages/Admin.tsx");
const loadAdminAuth = () => import("./pages/AdminAuth.tsx");
const loadNotFound = () => import("./pages/NotFound.tsx");

const Treatments       = lazy(loadTreatments);
const TreatmentDetail  = lazy(loadTreatmentDetail);
const About            = lazy(loadAbout);
const Contact          = lazy(loadContact);
const Pricing          = lazy(loadPricing);
const Admin            = lazy(loadAdmin);
const AdminAuth        = lazy(loadAdminAuth);
const NotFound         = lazy(loadNotFound);

const primaryRoutePreloads = [loadTreatments, loadPricing, loadAbout, loadContact];

const PageFallback = () => (
  <div className="min-h-[45svh] bg-background flex items-center justify-center px-6">
    <div className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-card/90 px-5 py-3 shadow-[var(--shadow-card)]">
      <span className="h-2 w-2 rounded-full bg-primary/70 animate-pulse" aria-hidden />
      <p className="text-sm font-medium text-muted-foreground">Laddar sida</p>
    </div>
  </div>
);

const App = () => {
  useEffect(() => {
    const id = window.setTimeout(() => {
      primaryRoutePreloads.forEach((preload) => {
        void preload();
      });
    }, 250);

    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/behandlingar" element={<Treatments />} />
              <Route path="/behandlingar/:slug" element={<TreatmentDetail />} />
              <Route path="/om" element={<About />} />
              <Route path="/kontakt" element={<Contact />} />
              <Route path="/boka" element={<Book />} />
              <Route path="/priser" element={<Pricing />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/auth" element={<AdminAuth />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
