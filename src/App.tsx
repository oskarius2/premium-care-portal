import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index.tsx"; // startsidan – ladda direkt (LCP)

/* Tunga / sekundära routes lazy-laddas så startsidan inte drar in
   react-day-picker, Book, Admin etc. innan användaren navigerar dit.
   Detta minskar initial JS från ~900KB till bara det Index behöver. */
const Treatments       = lazy(() => import("./pages/Treatments.tsx"));
const TreatmentDetail  = lazy(() => import("./pages/TreatmentDetail.tsx"));
const About            = lazy(() => import("./pages/About.tsx"));
const Contact          = lazy(() => import("./pages/Contact.tsx"));
const Book             = lazy(() => import("./pages/Book.tsx"));
const Pricing          = lazy(() => import("./pages/Pricing.tsx"));
const Admin            = lazy(() => import("./pages/Admin.tsx"));
const AdminAuth        = lazy(() => import("./pages/AdminAuth.tsx"));
const NotFound         = lazy(() => import("./pages/NotFound.tsx"));

const App = () => (
  <>
    <Toaster />
    <BrowserRouter>
      <Suspense fallback={null}>
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

export default App;
