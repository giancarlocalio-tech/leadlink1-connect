import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RequestPage from "./pages/RequestPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import AuthPage from "./pages/AuthPage";
import AuthConfirmPage from "./pages/AuthConfirmPage";
import DashboardPage from "./pages/DashboardPage";
import RequestsPage from "./pages/RequestsPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import ProfilePage from "./pages/ProfilePage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/richiesta" element={<RequestPage />} />
          <Route path="/conferma" element={<ConfirmationPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/confirm" element={<AuthConfirmPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/richieste" element={<RequestsPage />} />
          <Route path="/dashboard/abbonamento" element={<SubscriptionPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/termini" element={<TermsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
