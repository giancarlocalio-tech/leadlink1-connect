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
            
            {/* Dynamic city + service SEO pages - catches patterns like "milano-manutenzione-caldaie" */}
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
