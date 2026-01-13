import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CookieConsent } from "@/components/CookieConsent";
import HomePage from "./pages/HomePage";
import RequestPage from "./pages/RequestPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import AuthPage from "./pages/AuthPage";
import AuthConfirmPage from "./pages/AuthConfirmPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RequestsPage from "./pages/RequestsPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import ProfilePage from "./pages/ProfilePage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import AdminPage from "./pages/AdminPage";
import PlumberLandingPage from "./pages/PlumberLandingPage";
import PlumberPlanSelectionPage from "./pages/PlumberPlanSelectionPage";
import LandingPage from "./pages/LandingPage";
import LandingLavoriZonaPage from "./pages/LandingLavoriZonaPage";
import LandingComeFunzionaPage from "./pages/LandingComeFunzionaPage";
import DynamicLandingPage from "./pages/DynamicLandingPage";
import KeywordLandingPage from "./pages/KeywordLandingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/richiesta" element={<RequestPage />} />
            <Route path="/conferma" element={<ConfirmationPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/confirm" element={<AuthConfirmPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/richieste" element={<RequestsPage />} />
            <Route path="/dashboard/abbonamento" element={<SubscriptionPage />} />
            <Route path="/dashboard/pagamento-completato" element={<PaymentSuccessPage />} />
            <Route path="/dashboard/profilo" element={<ProfilePage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/termini" element={<TermsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/per-idraulici" element={<PlumberLandingPage />} />
            <Route path="/registrazione/piano" element={<PlumberPlanSelectionPage />} />
            <Route path="/lp/idraulico" element={<LandingPage />} />
            <Route path="/lp/lavori-zona" element={<LandingLavoriZonaPage />} />
            <Route path="/lp/come-funziona" element={<LandingComeFunzionaPage />} />
            
            {/* Generic keyword SEO pages */}
            <Route path="/idraulico-vicino-a-me" element={<KeywordLandingPage slug="idraulico-vicino-a-me" />} />
            <Route path="/pronto-intervento-idraulico" element={<KeywordLandingPage slug="pronto-intervento-idraulico" />} />
            <Route path="/idraulico-urgente" element={<KeywordLandingPage slug="idraulico-urgente" />} />
            <Route path="/assistenza-caldaie" element={<KeywordLandingPage slug="assistenza-caldaie" />} />
            <Route path="/spurgo-pozzi-neri" element={<KeywordLandingPage slug="spurgo-pozzi-neri" />} />
            <Route path="/idraulico-24-ore" element={<KeywordLandingPage slug="idraulico-24-ore" />} />
            <Route path="/idraulico-a-domicilio" element={<KeywordLandingPage slug="idraulico-a-domicilio" />} />
            <Route path="/preventivo-idraulico" element={<KeywordLandingPage slug="preventivo-idraulico" />} />
            <Route path="/termoidraulica" element={<KeywordLandingPage slug="termoidraulica" />} />
            <Route path="/impianto-idraulico" element={<KeywordLandingPage slug="impianto-idraulico" />} />
            <Route path="/impianto-idraulico-bagno" element={<KeywordLandingPage slug="impianto-idraulico-bagno" />} />
            <Route path="/idraulico-onesto" element={<KeywordLandingPage slug="idraulico-onesto" />} />
            <Route path="/disotturazione-wc" element={<KeywordLandingPage slug="disotturazione-wc" />} />
            <Route path="/sostituzione-caldaia" element={<KeywordLandingPage slug="sostituzione-caldaia" />} />
            <Route path="/installazione-caldaia" element={<KeywordLandingPage slug="installazione-caldaia" />} />
            <Route path="/caldaia-perde-acqua" element={<KeywordLandingPage slug="caldaia-perde-acqua" />} />
            <Route path="/riparazione-scaldabagno" element={<KeywordLandingPage slug="riparazione-scaldabagno" />} />
            <Route path="/installazione-scaldabagno" element={<KeywordLandingPage slug="installazione-scaldabagno" />} />
            
            {/* Nuove keyword long-tail - Costi e Prezzi */}
            <Route path="/quanto-costa-idraulico" element={<KeywordLandingPage slug="quanto-costa-idraulico" />} />
            <Route path="/costo-pronto-intervento-idraulico" element={<KeywordLandingPage slug="costo-pronto-intervento-idraulico" />} />
            <Route path="/costo-riparazione-perdita-acqua" element={<KeywordLandingPage slug="costo-riparazione-perdita-acqua" />} />
            <Route path="/costo-sostituzione-rubinetto" element={<KeywordLandingPage slug="costo-sostituzione-rubinetto" />} />
            <Route path="/costo-spurgo-fognature" element={<KeywordLandingPage slug="costo-spurgo-fognature" />} />
            
            {/* Nuove keyword long-tail - Problemi Specifici */}
            <Route path="/perdita-acqua-sotto-pavimento" element={<KeywordLandingPage slug="perdita-acqua-sotto-pavimento" />} />
            <Route path="/perdita-acqua-muro" element={<KeywordLandingPage slug="perdita-acqua-muro" />} />
            <Route path="/rubinetto-perde-acqua" element={<KeywordLandingPage slug="rubinetto-perde-acqua" />} />
            <Route path="/wc-perde-acqua" element={<KeywordLandingPage slug="wc-perde-acqua" />} />
            <Route path="/scarico-lento-lavandino" element={<KeywordLandingPage slug="scarico-lento-lavandino" />} />
            <Route path="/doccia-perde-acqua" element={<KeywordLandingPage slug="doccia-perde-acqua" />} />
            <Route path="/tubo-rotto" element={<KeywordLandingPage slug="tubo-rotto" />} />
            <Route path="/acqua-calda-non-funziona" element={<KeywordLandingPage slug="acqua-calda-non-funziona" />} />
            <Route path="/pressione-acqua-bassa" element={<KeywordLandingPage slug="pressione-acqua-bassa" />} />
            
            {/* Nuove keyword long-tail - Orari e Disponibilità */}
            <Route path="/idraulico-festivi" element={<KeywordLandingPage slug="idraulico-festivi" />} />
            <Route path="/idraulico-notturno" element={<KeywordLandingPage slug="idraulico-notturno" />} />
            
            {/* Nuove keyword long-tail - Servizi Specifici */}
            <Route path="/installazione-lavatrice" element={<KeywordLandingPage slug="installazione-lavatrice" />} />
            <Route path="/installazione-lavastoviglie" element={<KeywordLandingPage slug="installazione-lavastoviglie" />} />
            <Route path="/installazione-bidet" element={<KeywordLandingPage slug="installazione-bidet" />} />
            <Route path="/installazione-wc" element={<KeywordLandingPage slug="installazione-wc" />} />
            <Route path="/sostituzione-sifone" element={<KeywordLandingPage slug="sostituzione-sifone" />} />
            <Route path="/riparazione-autoclave" element={<KeywordLandingPage slug="riparazione-autoclave" />} />
            <Route path="/installazione-autoclave" element={<KeywordLandingPage slug="installazione-autoclave" />} />
            <Route path="/installazione-addolcitore" element={<KeywordLandingPage slug="installazione-addolcitore" />} />
            <Route path="/ricerca-perdite-acqua" element={<KeywordLandingPage slug="ricerca-perdite-acqua" />} />
            <Route path="/videoispezione-tubature" element={<KeywordLandingPage slug="videoispezione-tubature" />} />
            <Route path="/disostruzione-colonne-scarico" element={<KeywordLandingPage slug="disostruzione-colonne-scarico" />} />
            
            {/* Nuove keyword long-tail - Termini Colloquiali */}
            <Route path="/idraulico-buono" element={<KeywordLandingPage slug="idraulico-buono" />} />
            <Route path="/idraulico-economico" element={<KeywordLandingPage slug="idraulico-economico" />} />
            <Route path="/cerco-idraulico" element={<KeywordLandingPage slug="cerco-idraulico" />} />
            <Route path="/chiamare-idraulico" element={<KeywordLandingPage slug="chiamare-idraulico" />} />
            <Route path="/bagno-allagato" element={<KeywordLandingPage slug="bagno-allagato" />} />
            <Route path="/cucina-allagata" element={<KeywordLandingPage slug="cucina-allagata" />} />
            <Route path="/cantina-allagata" element={<KeywordLandingPage slug="cantina-allagata" />} />
            
            {/* Dynamic city and city+service SEO pages - catches patterns like "milano" or "milano-manutenzione-caldaie" */}
            <Route path="/:slug" element={<DynamicLandingPage type="city-service" />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
