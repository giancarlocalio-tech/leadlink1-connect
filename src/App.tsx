import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CookieConsent } from "@/components/CookieConsent";
import HomePage from "./pages/HomePage";
import ConsulenzaPage from "./pages/ConsulenzaPage";
import ConsulenzaSuccessoPage from "./pages/ConsulenzaSuccessoPage";
import RequestPage from "./pages/RequestPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import AuthPage from "./pages/AuthPage";
import AuthConfirmPage from "./pages/AuthConfirmPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RequestsPage from "./pages/RequestsPage";
import PreventiviPage from "./pages/PreventiviPage";
import ClientChatPage from "./pages/ClientChatPage";
import ClientAccountPage from "./pages/ClientAccountPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import CreditsPage from "./pages/CreditsPage";
import TopUpPage from "./pages/TopUpPage";
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
import BlogPage from "./pages/BlogPage";
import BlogArticlePage from "./pages/BlogArticlePage";
import BlogCategoryPage from "./pages/BlogCategoryPage";
import GuideIndexPage from "./pages/GuideIndexPage";
import GuidePage from "./pages/GuidePage";
import GuideHubPage from "./pages/GuideHubPage";
import ApprofondimentoPage from "./pages/ApprofondimentoPage";
import ApprofondimentiIndexPage from "./pages/ApprofondimentiIndexPage";
import StatisticsPage from "./pages/StatisticsPage";
import ChecklistPage from "./pages/ChecklistPage";
import ServiceNationalPage from "./pages/ServiceNationalPage";
import PricingPage from "./pages/PricingPage";
import ChiSiamoPage from "./pages/ChiSiamoPage";
import ComeFunzionaPage from "./pages/ComeFunzionaPage";
import ContattiPage from "./pages/ContattiPage";
import NotFound from "./pages/NotFound";
import IdraulicoRedirect from "./components/IdraulicoRedirect";
import ServiziRedirect from "./components/ServiziRedirect";
import ProblemCityPage from "./pages/ProblemCityPage";
import NapoliLandingPage from "./pages/NapoliLandingPage";
import NapoliQuartierePage from "./pages/NapoliQuartierePage";
import MilanoQuartierePage from "./pages/MilanoQuartierePage";
import MilanoLandingPage from "./pages/MilanoLandingPage";
import SienaLandingPage from "./pages/SienaLandingPage";
import DashboardRedirect from "./components/DashboardRedirect";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/consulenza" element={<ConsulenzaPage />} />
            <Route path="/consulenza/successo" element={<ConsulenzaSuccessoPage />} />
            <Route path="/richiesta" element={<Navigate to="/consulenza" replace />} />
            <Route path="/richiedi-preventivo" element={<Navigate to="/consulenza" replace />} />
            <Route path="/_legacy/richiesta" element={<Navigate to="/consulenza" replace />} />

            <Route path="/conferma" element={<Navigate to="/" replace />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/confirm" element={<AuthConfirmPage />} />
            {/* Plumber-facing routes removed — model pivoted to AI-only */}
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/dashboard/*" element={<Navigate to="/" replace />} />
            <Route path="/chat/:token" element={<Navigate to="/" replace />} />
            <Route path="/account" element={<Navigate to="/" replace />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/termini" element={<TermsPage />} />
            <Route path="/chi-siamo" element={<ChiSiamoPage />} />
            <Route path="/come-funziona" element={<ComeFunzionaPage />} />
            <Route path="/contatti" element={<ContattiPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/per-idraulici" element={<Navigate to="/" replace />} />
            <Route path="/registrazione/piano" element={<Navigate to="/" replace />} />
            <Route path="/lp/idraulico" element={<Navigate to="/" replace />} />
            <Route path="/lp/lavori-zona" element={<Navigate to="/consulenza" replace />} />
            <Route path="/lp/come-funziona" element={<Navigate to="/come-funziona" replace />} />

            
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
            
            {/* Nuove problematiche - Caldaie e Riscaldamento */}
            <Route path="/caldaia-non-parte" element={<KeywordLandingPage slug="caldaia-non-parte" />} />
            <Route path="/caldaia-va-in-blocco" element={<KeywordLandingPage slug="caldaia-va-in-blocco" />} />
            <Route path="/caldaia-rumorosa" element={<KeywordLandingPage slug="caldaia-rumorosa" />} />
            <Route path="/termosifone-non-scalda" element={<KeywordLandingPage slug="termosifone-non-scalda" />} />
            <Route path="/sfiatare-termosifoni" element={<KeywordLandingPage slug="sfiatare-termosifoni" />} />
            <Route path="/lavaggio-impianto-riscaldamento" element={<KeywordLandingPage slug="lavaggio-impianto-riscaldamento" />} />
            
            {/* Nuove problematiche - Scarichi e Tubazioni */}
            <Route path="/lavandino-intasato" element={<KeywordLandingPage slug="lavandino-intasato" />} />
            <Route path="/doccia-intasata" element={<KeywordLandingPage slug="doccia-intasata" />} />
            <Route path="/bidet-intasato" element={<KeywordLandingPage slug="bidet-intasato" />} />
            <Route path="/vasca-intasata" element={<KeywordLandingPage slug="vasca-intasata" />} />
            <Route path="/fognatura-intasata" element={<KeywordLandingPage slug="fognatura-intasata" />} />
            <Route path="/pozzetto-intasato" element={<KeywordLandingPage slug="pozzetto-intasato" />} />
            <Route path="/odore-fogna-bagno" element={<KeywordLandingPage slug="odore-fogna-bagno" />} />
            <Route path="/odore-fogna-cucina" element={<KeywordLandingPage slug="odore-fogna-cucina" />} />
            
            {/* Nuove problematiche - Perdite Specifiche */}
            <Route path="/tubo-che-perde" element={<KeywordLandingPage slug="tubo-che-perde" />} />
            <Route path="/giunto-che-perde" element={<KeywordLandingPage slug="giunto-che-perde" />} />
            <Route path="/sifone-che-perde" element={<KeywordLandingPage slug="sifone-che-perde" />} />
            <Route path="/cassetta-wc-perde" element={<KeywordLandingPage slug="cassetta-wc-perde" />} />
            <Route path="/flessibile-che-perde" element={<KeywordLandingPage slug="flessibile-che-perde" />} />
            <Route path="/boiler-perde-acqua" element={<KeywordLandingPage slug="boiler-perde-acqua" />} />
            <Route path="/lavatrice-perde-acqua" element={<KeywordLandingPage slug="lavatrice-perde-acqua" />} />
            <Route path="/lavastoviglie-perde-acqua" element={<KeywordLandingPage slug="lavastoviglie-perde-acqua" />} />
            
            {/* Nuove problematiche - Rubinetteria */}
            <Route path="/miscelatore-che-perde" element={<KeywordLandingPage slug="miscelatore-che-perde" />} />
            <Route path="/rubinetto-bloccato" element={<KeywordLandingPage slug="rubinetto-bloccato" />} />
            <Route path="/soffione-doccia-intasato" element={<KeywordLandingPage slug="soffione-doccia-intasato" />} />
            <Route path="/aeratore-rubinetto-intasato" element={<KeywordLandingPage slug="aeratore-rubinetto-intasato" />} />
            
            {/* Nuove problematiche - Acqua e Pressione */}
            <Route path="/acqua-marrone-rubinetto" element={<KeywordLandingPage slug="acqua-marrone-rubinetto" />} />
            <Route path="/acqua-non-esce" element={<KeywordLandingPage slug="acqua-non-esce" />} />
            <Route path="/tubazioni-gelate" element={<KeywordLandingPage slug="tubazioni-gelate" />} />
            <Route path="/colpo-ariete" element={<KeywordLandingPage slug="colpo-ariete" />} />
            <Route path="/gorgoglio-scarichi" element={<KeywordLandingPage slug="gorgoglio-scarichi" />} />
            
            {/* Tipologie Edifici */}
            <Route path="/idraulico-condominio" element={<KeywordLandingPage slug="idraulico-condominio" />} />
            <Route path="/idraulico-ristorante" element={<KeywordLandingPage slug="idraulico-ristorante" />} />
            <Route path="/idraulico-ufficio" element={<KeywordLandingPage slug="idraulico-ufficio" />} />
            <Route path="/idraulico-negozio" element={<KeywordLandingPage slug="idraulico-negozio" />} />
            <Route path="/idraulico-hotel" element={<KeywordLandingPage slug="idraulico-hotel" />} />
            
            {/* Assistenza Marche Caldaie */}
            <Route path="/assistenza-caldaia-vaillant" element={<KeywordLandingPage slug="assistenza-caldaia-vaillant" />} />
            <Route path="/assistenza-caldaia-baxi" element={<KeywordLandingPage slug="assistenza-caldaia-baxi" />} />
            <Route path="/assistenza-caldaia-junkers" element={<KeywordLandingPage slug="assistenza-caldaia-junkers" />} />
            <Route path="/assistenza-caldaia-immergas" element={<KeywordLandingPage slug="assistenza-caldaia-immergas" />} />
            <Route path="/assistenza-caldaia-ariston" element={<KeywordLandingPage slug="assistenza-caldaia-ariston" />} />
            <Route path="/assistenza-caldaia-beretta" element={<KeywordLandingPage slug="assistenza-caldaia-beretta" />} />
            <Route path="/assistenza-caldaia-ferroli" element={<KeywordLandingPage slug="assistenza-caldaia-ferroli" />} />
            <Route path="/assistenza-caldaia-riello" element={<KeywordLandingPage slug="assistenza-caldaia-riello" />} />
            
            {/* Assistenza Marche Scaldabagni */}
            <Route path="/assistenza-scaldabagno-ariston" element={<KeywordLandingPage slug="assistenza-scaldabagno-ariston" />} />
            <Route path="/assistenza-scaldabagno-vaillant" element={<KeywordLandingPage slug="assistenza-scaldabagno-vaillant" />} />
            <Route path="/assistenza-scaldabagno-junkers" element={<KeywordLandingPage slug="assistenza-scaldabagno-junkers" />} />
            <Route path="/assistenza-scaldabagno-baxi" element={<KeywordLandingPage slug="assistenza-scaldabagno-baxi" />} />
            <Route path="/scaldabagno-non-si-accende" element={<KeywordLandingPage slug="scaldabagno-non-si-accende" />} />
            <Route path="/scaldabagno-non-scalda" element={<KeywordLandingPage slug="scaldabagno-non-scalda" />} />
            <Route path="/scaldabagno-va-in-blocco" element={<KeywordLandingPage slug="scaldabagno-va-in-blocco" />} />
            <Route path="/sostituzione-resistenza-scaldabagno" element={<KeywordLandingPage slug="sostituzione-resistenza-scaldabagno" />} />
            <Route path="/sostituzione-anodo-scaldabagno" element={<KeywordLandingPage slug="sostituzione-anodo-scaldabagno" />} />
            
            {/* Condizionatori e Climatizzazione */}
            <Route path="/installazione-condizionatore" element={<KeywordLandingPage slug="installazione-condizionatore" />} />
            <Route path="/manutenzione-condizionatore" element={<KeywordLandingPage slug="manutenzione-condizionatore" />} />
            <Route path="/condizionatore-non-raffredda" element={<KeywordLandingPage slug="condizionatore-non-raffredda" />} />
            <Route path="/condizionatore-perde-acqua" element={<KeywordLandingPage slug="condizionatore-perde-acqua" />} />
            <Route path="/condizionatore-rumoroso" element={<KeywordLandingPage slug="condizionatore-rumoroso" />} />
            <Route path="/ricarica-gas-condizionatore" element={<KeywordLandingPage slug="ricarica-gas-condizionatore" />} />
            
            {/* Pompe di Calore */}
            <Route path="/installazione-pompa-calore" element={<KeywordLandingPage slug="installazione-pompa-calore" />} />
            <Route path="/manutenzione-pompa-calore" element={<KeywordLandingPage slug="manutenzione-pompa-calore" />} />
            <Route path="/pompa-calore-non-funziona" element={<KeywordLandingPage slug="pompa-calore-non-funziona" />} />
            
            {/* Pannelli Solari Termici */}
            <Route path="/installazione-pannelli-solari-termici" element={<KeywordLandingPage slug="installazione-pannelli-solari-termici" />} />
            <Route path="/manutenzione-pannelli-solari" element={<KeywordLandingPage slug="manutenzione-pannelli-solari" />} />
            
            {/* Riscaldamento a Pavimento */}
            <Route path="/riscaldamento-pavimento" element={<KeywordLandingPage slug="riscaldamento-pavimento" />} />
            <Route path="/manutenzione-riscaldamento-pavimento" element={<KeywordLandingPage slug="manutenzione-riscaldamento-pavimento" />} />
            <Route path="/riscaldamento-pavimento-non-scalda" element={<KeywordLandingPage slug="riscaldamento-pavimento-non-scalda" />} />
            
            {/* Valvole e Regolazione */}
            <Route path="/installazione-valvole-termostatiche" element={<KeywordLandingPage slug="installazione-valvole-termostatiche" />} />
            <Route path="/valvola-termostatica-bloccata" element={<KeywordLandingPage slug="valvola-termostatica-bloccata" />} />
            <Route path="/sostituzione-valvola-radiatore" element={<KeywordLandingPage slug="sostituzione-valvola-radiatore" />} />
            
            {/* Termosifoni e Radiatori */}
            <Route path="/installazione-termosifone" element={<KeywordLandingPage slug="installazione-termosifone" />} />
            <Route path="/sostituzione-termosifone" element={<KeywordLandingPage slug="sostituzione-termosifone" />} />
            <Route path="/termosifone-perde-acqua" element={<KeywordLandingPage slug="termosifone-perde-acqua" />} />
            <Route path="/termosifone-rumoroso" element={<KeywordLandingPage slug="termosifone-rumoroso" />} />
            <Route path="/verniciatura-termosifoni" element={<KeywordLandingPage slug="verniciatura-termosifoni" />} />
            
            {/* Gas e Sicurezza */}
            <Route path="/installazione-impianto-gas" element={<KeywordLandingPage slug="installazione-impianto-gas" />} />
            <Route path="/riparazione-perdita-gas" element={<KeywordLandingPage slug="riparazione-perdita-gas" />} />
            <Route path="/prova-tenuta-impianto-gas" element={<KeywordLandingPage slug="prova-tenuta-impianto-gas" />} />
            <Route path="/certificazione-impianto-gas" element={<KeywordLandingPage slug="certificazione-impianto-gas" />} />
            <Route path="/sostituzione-tubo-gas" element={<KeywordLandingPage slug="sostituzione-tubo-gas" />} />
            <Route path="/installazione-rilevatore-gas" element={<KeywordLandingPage slug="installazione-rilevatore-gas" />} />
            
            {/* Contatori e Allacci */}
            <Route path="/allaccio-acqua" element={<KeywordLandingPage slug="allaccio-acqua" />} />
            <Route path="/allaccio-fognatura" element={<KeywordLandingPage slug="allaccio-fognatura" />} />
            <Route path="/spostamento-contatore-acqua" element={<KeywordLandingPage slug="spostamento-contatore-acqua" />} />
            <Route path="/installazione-sottocontatore" element={<KeywordLandingPage slug="installazione-sottocontatore" />} />
            
            {/* Bagno Completo */}
            <Route path="/ristrutturazione-bagno" element={<KeywordLandingPage slug="ristrutturazione-bagno" />} />
            <Route path="/secondo-bagno" element={<KeywordLandingPage slug="secondo-bagno" />} />
            <Route path="/bagno-per-disabili" element={<KeywordLandingPage slug="bagno-per-disabili" />} />
            <Route path="/sanitari-sospesi" element={<KeywordLandingPage slug="sanitari-sospesi" />} />
            <Route path="/sostituzione-sanitari" element={<KeywordLandingPage slug="sostituzione-sanitari" />} />
            
            {/* Cucina e Elettrodomestici */}
            <Route path="/impianto-idraulico-cucina" element={<KeywordLandingPage slug="impianto-idraulico-cucina" />} />
            <Route path="/spostamento-lavello" element={<KeywordLandingPage slug="spostamento-lavello" />} />
            <Route path="/installazione-trituratore" element={<KeywordLandingPage slug="installazione-trituratore" />} />
            <Route path="/riparazione-trituratore" element={<KeywordLandingPage slug="riparazione-trituratore" />} />
            
            {/* Esterni e Giardino */}
            <Route path="/impianto-irrigazione-interrato" element={<KeywordLandingPage slug="impianto-irrigazione-interrato" />} />
            <Route path="/riparazione-irrigazione" element={<KeywordLandingPage slug="riparazione-irrigazione" />} />
            <Route path="/installazione-fontana" element={<KeywordLandingPage slug="installazione-fontana" />} />
            <Route path="/impianto-idrico-piscina" element={<KeywordLandingPage slug="impianto-idrico-piscina" />} />
            <Route path="/scarico-condensa-condizionatore" element={<KeywordLandingPage slug="scarico-condensa-condizionatore" />} />
            
            {/* Problemi Specifici Avanzati */}
            <Route path="/perdita-occulta" element={<KeywordLandingPage slug="perdita-occulta" />} />
            <Route path="/infiltrazione-dal-terrazzo" element={<KeywordLandingPage slug="infiltrazione-dal-terrazzo" />} />
            <Route path="/infiltrazione-dal-tetto" element={<KeywordLandingPage slug="infiltrazione-dal-tetto" />} />
            <Route path="/umidita-risalita" element={<KeywordLandingPage slug="umidita-risalita" />} />
            <Route path="/contaminazione-acqua" element={<KeywordLandingPage slug="contaminazione-acqua" />} />
            <Route path="/legionella-impianti" element={<KeywordLandingPage slug="legionella-impianti" />} />
            
            {/* Emergenze Specifiche */}
            <Route path="/rottura-tubo-incassato" element={<KeywordLandingPage slug="rottura-tubo-incassato" />} />
            <Route path="/allagamento-seminterrato" element={<KeywordLandingPage slug="allagamento-seminterrato" />} />
            <Route path="/blocco-colonna-condominiale" element={<KeywordLandingPage slug="blocco-colonna-condominiale" />} />
            <Route path="/riflusso-fognatura" element={<KeywordLandingPage slug="riflusso-fognatura" />} />
            
            {/* Costi Specifici */}
            <Route path="/costo-installazione-caldaia" element={<KeywordLandingPage slug="costo-installazione-caldaia" />} />
            <Route path="/costo-ristrutturazione-bagno" element={<KeywordLandingPage slug="costo-ristrutturazione-bagno" />} />
            <Route path="/costo-impianto-idraulico" element={<KeywordLandingPage slug="costo-impianto-idraulico" />} />
            <Route path="/costo-disostruzione" element={<KeywordLandingPage slug="costo-disostruzione" />} />
            <Route path="/costo-termosifone" element={<KeywordLandingPage slug="costo-termosifone" />} />
            <Route path="/costo-boiler" element={<KeywordLandingPage slug="costo-boiler" />} />
            <Route path="/costo-condizionatore" element={<KeywordLandingPage slug="costo-condizionatore" />} />
            <Route path="/costo-pompa-calore" element={<KeywordLandingPage slug="costo-pompa-calore" />} />
            
            {/* Servizi per Professionisti */}
            <Route path="/idraulico-cantiere" element={<KeywordLandingPage slug="idraulico-cantiere" />} />
            <Route path="/idraulico-impresa" element={<KeywordLandingPage slug="idraulico-impresa" />} />
            <Route path="/idraulico-amministratore" element={<KeywordLandingPage slug="idraulico-amministratore" />} />
            
            {/* Soluzioni Smart e Risparmio */}
            <Route path="/risparmio-acqua" element={<KeywordLandingPage slug="risparmio-acqua" />} />
            <Route path="/domotica-idraulica" element={<KeywordLandingPage slug="domotica-idraulica" />} />
            <Route path="/sensore-allagamento" element={<KeywordLandingPage slug="sensore-allagamento" />} />
            
            {/* Materiali e Tipologie */}
            <Route path="/tubazioni-multistrato" element={<KeywordLandingPage slug="tubazioni-multistrato" />} />
            <Route path="/tubazioni-rame" element={<KeywordLandingPage slug="tubazioni-rame" />} />
            <Route path="/tubazioni-polietilene" element={<KeywordLandingPage slug="tubazioni-polietilene" />} />
            
            {/* Detrazioni e Bonus */}
            <Route path="/bonus-caldaia" element={<KeywordLandingPage slug="bonus-caldaia" />} />
            <Route path="/bonus-ristrutturazione-bagno" element={<KeywordLandingPage slug="bonus-ristrutturazione-bagno" />} />
            <Route path="/superbonus-impianti" element={<KeywordLandingPage slug="superbonus-impianti" />} />
            
            {/* Problemi Stagionali */}
            <Route path="/preparazione-inverno-impianti" element={<KeywordLandingPage slug="preparazione-inverno-impianti" />} />
            <Route path="/riattivazione-impianto-riscaldamento" element={<KeywordLandingPage slug="riattivazione-impianto-riscaldamento" />} />
            <Route path="/chiusura-impianto-irrigazione" element={<KeywordLandingPage slug="chiusura-impianto-irrigazione" />} />
            <Route path="/manutenzione-estiva-caldaia" element={<KeywordLandingPage slug="manutenzione-estiva-caldaia" />} />
            
            {/* Domande Frequenti e Guide */}
            <Route path="/come-chiudere-acqua" element={<KeywordLandingPage slug="come-chiudere-acqua" />} />
            <Route path="/come-sturare-wc" element={<KeywordLandingPage slug="come-sturare-wc" />} />
            <Route path="/come-svitare-rubinetto" element={<KeywordLandingPage slug="come-svitare-rubinetto" />} />
            <Route path="/come-leggere-contatore-acqua" element={<KeywordLandingPage slug="come-leggere-contatore-acqua" />} />
            <Route path="/come-aumentare-pressione-acqua" element={<KeywordLandingPage slug="come-aumentare-pressione-acqua" />} />
            
            {/* Zone Specifiche */}
            <Route path="/idraulico-centro-storico" element={<KeywordLandingPage slug="idraulico-centro-storico" />} />
            <Route path="/idraulico-zona-industriale" element={<KeywordLandingPage slug="idraulico-zona-industriale" />} />
            <Route path="/idraulico-nuovo-quartiere" element={<KeywordLandingPage slug="idraulico-nuovo-quartiere" />} />
            
            {/* Problemi WC e Sanitari */}
            <Route path="/wc-non-scarica" element={<KeywordLandingPage slug="wc-non-scarica" />} />
            <Route path="/wc-perde-dalla-base" element={<KeywordLandingPage slug="wc-perde-dalla-base" />} />
            <Route path="/cassetta-scarico-non-si-riempie" element={<KeywordLandingPage slug="cassetta-scarico-non-si-riempie" />} />
            <Route path="/pulsante-wc-non-funziona" element={<KeywordLandingPage slug="pulsante-wc-non-funziona" />} />
            <Route path="/bidet-non-scarica" element={<KeywordLandingPage slug="bidet-non-scarica" />} />
            <Route path="/lavabo-crepato" element={<KeywordLandingPage slug="lavabo-crepato" />} />
            <Route path="/piatto-doccia-rotto" element={<KeywordLandingPage slug="piatto-doccia-rotto" />} />
            <Route path="/vasca-da-bagno-perde" element={<KeywordLandingPage slug="vasca-da-bagno-perde" />} />
            <Route path="/sanitari-traballanti" element={<KeywordLandingPage slug="sanitari-traballanti" />} />
            
            {/* Problemi Doccia */}
            <Route path="/doccia-fredda" element={<KeywordLandingPage slug="doccia-fredda" />} />
            <Route path="/doccia-scottante" element={<KeywordLandingPage slug="doccia-scottante" />} />
            <Route path="/doccia-gocciola" element={<KeywordLandingPage slug="doccia-gocciola" />} />
            <Route path="/box-doccia-perde" element={<KeywordLandingPage slug="box-doccia-perde" />} />
            <Route path="/colonna-doccia-installazione" element={<KeywordLandingPage slug="colonna-doccia-installazione" />} />
            <Route path="/doccetta-bloccata" element={<KeywordLandingPage slug="doccetta-bloccata" />} />
            
            {/* Problemi Cucina */}
            <Route path="/lavello-cucina-intasato" element={<KeywordLandingPage slug="lavello-cucina-intasato" />} />
            <Route path="/rubinetto-cucina-perde" element={<KeywordLandingPage slug="rubinetto-cucina-perde" />} />
            <Route path="/installazione-rubinetto-estraibile" element={<KeywordLandingPage slug="installazione-rubinetto-estraibile" />} />
            <Route path="/attacco-lavastoviglie" element={<KeywordLandingPage slug="attacco-lavastoviglie" />} />
            <Route path="/odore-lavandino-cucina" element={<KeywordLandingPage slug="odore-lavandino-cucina" />} />
            <Route path="/scarico-lavello-doppio" element={<KeywordLandingPage slug="scarico-lavello-doppio" />} />
            
            {/* Marche Condizionatori */}
            <Route path="/assistenza-condizionatore-daikin" element={<KeywordLandingPage slug="assistenza-condizionatore-daikin" />} />
            <Route path="/assistenza-condizionatore-mitsubishi" element={<KeywordLandingPage slug="assistenza-condizionatore-mitsubishi" />} />
            <Route path="/assistenza-condizionatore-samsung" element={<KeywordLandingPage slug="assistenza-condizionatore-samsung" />} />
            <Route path="/assistenza-condizionatore-lg" element={<KeywordLandingPage slug="assistenza-condizionatore-lg" />} />
            <Route path="/assistenza-condizionatore-panasonic" element={<KeywordLandingPage slug="assistenza-condizionatore-panasonic" />} />
            <Route path="/assistenza-condizionatore-fujitsu" element={<KeywordLandingPage slug="assistenza-condizionatore-fujitsu" />} />
            <Route path="/assistenza-condizionatore-hisense" element={<KeywordLandingPage slug="assistenza-condizionatore-hisense" />} />
            <Route path="/assistenza-condizionatore-toshiba" element={<KeywordLandingPage slug="assistenza-condizionatore-toshiba" />} />
            
            {/* Problemi Condizionatori */}
            <Route path="/condizionatore-non-parte" element={<KeywordLandingPage slug="condizionatore-non-parte" />} />
            <Route path="/condizionatore-errore" element={<KeywordLandingPage slug="condizionatore-errore" />} />
            <Route path="/condizionatore-ghiaccia" element={<KeywordLandingPage slug="condizionatore-ghiaccia" />} />
            <Route path="/condizionatore-non-scalda" element={<KeywordLandingPage slug="condizionatore-non-scalda" />} />
            <Route path="/pulizia-filtri-condizionatore" element={<KeywordLandingPage slug="pulizia-filtri-condizionatore" />} />
            <Route path="/sanificazione-condizionatore" element={<KeywordLandingPage slug="sanificazione-condizionatore" />} />
            
            {/* Marche Caldaie Aggiuntive */}
            <Route path="/assistenza-caldaia-hermann" element={<KeywordLandingPage slug="assistenza-caldaia-hermann" />} />
            <Route path="/assistenza-caldaia-biasi" element={<KeywordLandingPage slug="assistenza-caldaia-biasi" />} />
            <Route path="/assistenza-caldaia-sime" element={<KeywordLandingPage slug="assistenza-caldaia-sime" />} />
            <Route path="/assistenza-caldaia-fondital" element={<KeywordLandingPage slug="assistenza-caldaia-fondital" />} />
            <Route path="/assistenza-caldaia-ocean" element={<KeywordLandingPage slug="assistenza-caldaia-ocean" />} />
            <Route path="/assistenza-caldaia-chaffoteaux" element={<KeywordLandingPage slug="assistenza-caldaia-chaffoteaux" />} />
            <Route path="/assistenza-caldaia-radiant" element={<KeywordLandingPage slug="assistenza-caldaia-radiant" />} />
            <Route path="/assistenza-caldaia-italtherm" element={<KeywordLandingPage slug="assistenza-caldaia-italtherm" />} />
            
            {/* Errori Caldaia */}
            <Route path="/caldaia-errore-e01" element={<KeywordLandingPage slug="caldaia-errore-e01" />} />
            <Route path="/caldaia-errore-e02" element={<KeywordLandingPage slug="caldaia-errore-e02" />} />
            <Route path="/caldaia-errore-e03" element={<KeywordLandingPage slug="caldaia-errore-e03" />} />
            <Route path="/caldaia-errore-e04" element={<KeywordLandingPage slug="caldaia-errore-e04" />} />
            <Route path="/caldaia-pressione-bassa" element={<KeywordLandingPage slug="caldaia-pressione-bassa" />} />
            <Route path="/caldaia-pressione-alta" element={<KeywordLandingPage slug="caldaia-pressione-alta" />} />
            <Route path="/caldaia-non-fa-acqua-calda" element={<KeywordLandingPage slug="caldaia-non-fa-acqua-calda" />} />
            <Route path="/caldaia-fischia" element={<KeywordLandingPage slug="caldaia-fischia" />} />
            <Route path="/caldaia-gocciola" element={<KeywordLandingPage slug="caldaia-gocciola" />} />
            
            {/* Emergenze */}
            <Route path="/allagamento-casa" element={<KeywordLandingPage slug="allagamento-casa" />} />
            <Route path="/rottura-tubo-principale" element={<KeywordLandingPage slug="rottura-tubo-principale" />} />
            <Route path="/scarico-fognario-intasato" element={<KeywordLandingPage slug="scarico-fognario-intasato" />} />
            <Route path="/perdita-gas-domestico" element={<KeywordLandingPage slug="perdita-gas-domestico" />} />
            <Route path="/caldaia-esplode-rumore" element={<KeywordLandingPage slug="caldaia-esplode-rumore" />} />
            <Route path="/wc-trabocca" element={<KeywordLandingPage slug="wc-trabocca" />} />
            <Route path="/tubo-scoppiato-muro" element={<KeywordLandingPage slug="tubo-scoppiato-muro" />} />
            
            {/* Tipi Impianto */}
            <Route path="/impianto-acqua-calda-sanitaria" element={<KeywordLandingPage slug="impianto-acqua-calda-sanitaria" />} />
            <Route path="/impianto-solare-termico" element={<KeywordLandingPage slug="impianto-solare-termico" />} />
            <Route path="/impianto-geotermico" element={<KeywordLandingPage slug="impianto-geotermico" />} />
            <Route path="/impianto-a-zone" element={<KeywordLandingPage slug="impianto-a-zone" />} />
            <Route path="/impianto-autonomo" element={<KeywordLandingPage slug="impianto-autonomo" />} />
            <Route path="/impianto-centralizzato" element={<KeywordLandingPage slug="impianto-centralizzato" />} />
            <Route path="/impianto-antincendio" element={<KeywordLandingPage slug="impianto-antincendio" />} />
            
            {/* Interventi Riscaldamento */}
            <Route path="/sostituzione-circolatore" element={<KeywordLandingPage slug="sostituzione-circolatore" />} />
            <Route path="/sostituzione-vaso-espansione" element={<KeywordLandingPage slug="sostituzione-vaso-espansione" />} />
            <Route path="/sostituzione-scambiatore" element={<KeywordLandingPage slug="sostituzione-scambiatore" />} />
            <Route path="/pulizia-scambiatore" element={<KeywordLandingPage slug="pulizia-scambiatore" />} />
            <Route path="/sostituzione-valvola-gas" element={<KeywordLandingPage slug="sostituzione-valvola-gas" />} />
            <Route path="/sostituzione-scheda-caldaia" element={<KeywordLandingPage slug="sostituzione-scheda-caldaia" />} />
            <Route path="/bilanciamento-impianto" element={<KeywordLandingPage slug="bilanciamento-impianto" />} />
            
            {/* Elettrodomestici */}
            <Route path="/installazione-frigorifero-americano" element={<KeywordLandingPage slug="installazione-frigorifero-americano" />} />
            <Route path="/installazione-macchina-caffe" element={<KeywordLandingPage slug="installazione-macchina-caffe" />} />
            <Route path="/installazione-asciugatrice" element={<KeywordLandingPage slug="installazione-asciugatrice" />} />
            <Route path="/spostamento-lavatrice" element={<KeywordLandingPage slug="spostamento-lavatrice" />} />
            
            {/* Problemi Acqua */}
            <Route path="/acqua-gialla-rubinetto" element={<KeywordLandingPage slug="acqua-gialla-rubinetto" />} />
            <Route path="/acqua-puzza-uova" element={<KeywordLandingPage slug="acqua-puzza-uova" />} />
            <Route path="/acqua-troppo-dura" element={<KeywordLandingPage slug="acqua-troppo-dura" />} />
            <Route path="/bolle-aria-tubazioni" element={<KeywordLandingPage slug="bolle-aria-tubazioni" />} />
            <Route path="/acqua-non-arriva-piani-alti" element={<KeywordLandingPage slug="acqua-non-arriva-piani-alti" />} />
            
            {/* Tipi Intervento */}
            <Route path="/intervento-non-invasivo" element={<KeywordLandingPage slug="intervento-non-invasivo" />} />
            <Route path="/ricerca-perdite-termocamera" element={<KeywordLandingPage slug="ricerca-perdite-termocamera" />} />
            <Route path="/ricerca-perdite-gas-tracciante" element={<KeywordLandingPage slug="ricerca-perdite-gas-tracciante" />} />
            <Route path="/relining-tubazioni" element={<KeywordLandingPage slug="relining-tubazioni" />} />
            
            {/* Ambienti Specifici */}
            <Route path="/idraulico-bed-breakfast" element={<KeywordLandingPage slug="idraulico-bed-breakfast" />} />
            <Route path="/idraulico-palestra" element={<KeywordLandingPage slug="idraulico-palestra" />} />
            <Route path="/idraulico-piscina" element={<KeywordLandingPage slug="idraulico-piscina" />} />
            <Route path="/idraulico-bar-ristorante" element={<KeywordLandingPage slug="idraulico-bar-ristorante" />} />
            <Route path="/idraulico-studio-medico" element={<KeywordLandingPage slug="idraulico-studio-medico" />} />
            <Route path="/idraulico-parrucchiere" element={<KeywordLandingPage slug="idraulico-parrucchiere" />} />
            <Route path="/idraulico-scuola" element={<KeywordLandingPage slug="idraulico-scuola" />} />
            <Route path="/idraulico-chiesa" element={<KeywordLandingPage slug="idraulico-chiesa" />} />
            
            {/* Installazioni Bagno */}
            <Route path="/installazione-doccia-walk-in" element={<KeywordLandingPage slug="installazione-doccia-walk-in" />} />
            <Route path="/installazione-vasca-idromassaggio" element={<KeywordLandingPage slug="installazione-vasca-idromassaggio" />} />
            <Route path="/installazione-doccia-idromassaggio" element={<KeywordLandingPage slug="installazione-doccia-idromassaggio" />} />
            <Route path="/installazione-sanitrit" element={<KeywordLandingPage slug="installazione-sanitrit" />} />
            <Route path="/bagno-disabili" element={<KeywordLandingPage slug="bagno-disabili" />} />
            <Route path="/secondo-bagno" element={<KeywordLandingPage slug="secondo-bagno" />} />
            
            {/* Tipologie Caldaie */}
            <Route path="/caldaia-condensazione" element={<KeywordLandingPage slug="caldaia-condensazione" />} />
            <Route path="/caldaia-tradizionale" element={<KeywordLandingPage slug="caldaia-tradizionale" />} />
            <Route path="/caldaia-murale" element={<KeywordLandingPage slug="caldaia-murale" />} />
            <Route path="/caldaia-basamento" element={<KeywordLandingPage slug="caldaia-basamento" />} />
            <Route path="/caldaia-biomassa" element={<KeywordLandingPage slug="caldaia-biomassa" />} />
            
            {/* Scaldabagni */}
            <Route path="/scaldabagno-elettrico" element={<KeywordLandingPage slug="scaldabagno-elettrico" />} />
            <Route path="/scaldabagno-gas" element={<KeywordLandingPage slug="scaldabagno-gas" />} />
            <Route path="/scaldabagno-istantaneo" element={<KeywordLandingPage slug="scaldabagno-istantaneo" />} />
            <Route path="/scaldabagno-accumulo" element={<KeywordLandingPage slug="scaldabagno-accumulo" />} />
            <Route path="/scaldabagno-pompa-calore" element={<KeywordLandingPage slug="scaldabagno-pompa-calore" />} />
            
            {/* Costi Aggiuntivi */}
            <Route path="/costo-idraulico-orario" element={<KeywordLandingPage slug="costo-idraulico-orario" />} />
            <Route path="/costo-chiamata-idraulico" element={<KeywordLandingPage slug="costo-chiamata-idraulico" />} />
            <Route path="/costo-spurgo" element={<KeywordLandingPage slug="costo-spurgo" />} />
            <Route path="/costo-sostituzione-wc" element={<KeywordLandingPage slug="costo-sostituzione-wc" />} />
            <Route path="/costo-sostituzione-lavandino" element={<KeywordLandingPage slug="costo-sostituzione-lavandino" />} />
            <Route path="/costo-sostituzione-bidet" element={<KeywordLandingPage slug="costo-sostituzione-bidet" />} />
            <Route path="/costo-allaccio-acqua" element={<KeywordLandingPage slug="costo-allaccio-acqua" />} />
            <Route path="/costo-rifacimento-bagno-piccolo" element={<KeywordLandingPage slug="costo-rifacimento-bagno-piccolo" />} />
            
            {/* Guide e FAQ */}
            <Route path="/quando-chiamare-idraulico" element={<KeywordLandingPage slug="quando-chiamare-idraulico" />} />
            <Route path="/come-scegliere-idraulico" element={<KeywordLandingPage slug="come-scegliere-idraulico" />} />
            <Route path="/idraulico-vs-fai-da-te" element={<KeywordLandingPage slug="idraulico-vs-fai-da-te" />} />
            <Route path="/garanzia-lavori-idraulico" element={<KeywordLandingPage slug="garanzia-lavori-idraulico" />} />
            <Route path="/preventivo-idraulico-gratuito" element={<KeywordLandingPage slug="preventivo-idraulico-gratuito" />} />
            <Route path="/manutenzione-periodica-impianti" element={<KeywordLandingPage slug="manutenzione-periodica-impianti" />} />
            
            {/* Regioni */}
            <Route path="/idraulico-lombardia" element={<KeywordLandingPage slug="idraulico-lombardia" />} />
            <Route path="/idraulico-lazio" element={<KeywordLandingPage slug="idraulico-lazio" />} />
            <Route path="/idraulico-campania" element={<KeywordLandingPage slug="idraulico-campania" />} />
            <Route path="/idraulico-piemonte" element={<KeywordLandingPage slug="idraulico-piemonte" />} />
            <Route path="/idraulico-emilia-romagna" element={<KeywordLandingPage slug="idraulico-emilia-romagna" />} />
            <Route path="/idraulico-veneto" element={<KeywordLandingPage slug="idraulico-veneto" />} />
            <Route path="/idraulico-toscana" element={<KeywordLandingPage slug="idraulico-toscana" />} />
            <Route path="/idraulico-sicilia" element={<KeywordLandingPage slug="idraulico-sicilia" />} />
            <Route path="/idraulico-puglia" element={<KeywordLandingPage slug="idraulico-puglia" />} />
            <Route path="/idraulico-liguria" element={<KeywordLandingPage slug="idraulico-liguria" />} />
            
            {/* Napoli - Città e Quartieri (Google Ads) */}
            <Route path="/idraulico-napoli" element={<KeywordLandingPage slug="idraulico-napoli" />} />
            <Route path="/termoidraulica-napoli" element={<KeywordLandingPage slug="termoidraulica-napoli" />} />
            <Route path="/pronto-intervento-idraulico-napoli" element={<KeywordLandingPage slug="pronto-intervento-idraulico-napoli" />} />
            <Route path="/idraulico-napoli-centro" element={<KeywordLandingPage slug="idraulico-napoli-centro" />} />
            <Route path="/idraulico-vomero" element={<KeywordLandingPage slug="idraulico-vomero" />} />
            <Route path="/idraulico-fuorigrotta" element={<KeywordLandingPage slug="idraulico-fuorigrotta" />} />
            <Route path="/idraulico-posillipo" element={<KeywordLandingPage slug="idraulico-posillipo" />} />
            <Route path="/idraulico-chiaia" element={<KeywordLandingPage slug="idraulico-chiaia" />} />
            <Route path="/idraulico-san-giovanni-napoli" element={<KeywordLandingPage slug="idraulico-san-giovanni-napoli" />} />
            
            {/* Milano - Città e Quartieri (Google Ads) */}
            <Route path="/idraulico-milano" element={<KeywordLandingPage slug="idraulico-milano" />} />
            <Route path="/termoidraulica-milano" element={<KeywordLandingPage slug="termoidraulica-milano" />} />
            <Route path="/pronto-intervento-idraulico-milano" element={<KeywordLandingPage slug="pronto-intervento-idraulico-milano" />} />
            <Route path="/idraulico-milano-centro" element={<KeywordLandingPage slug="idraulico-milano-centro" />} />
            <Route path="/idraulico-navigli" element={<KeywordLandingPage slug="idraulico-navigli" />} />
            <Route path="/idraulico-porta-romana" element={<KeywordLandingPage slug="idraulico-porta-romana" />} />
            <Route path="/idraulico-brera" element={<KeywordLandingPage slug="idraulico-brera" />} />
            <Route path="/idraulico-isola" element={<KeywordLandingPage slug="idraulico-isola" />} />
            <Route path="/idraulico-citta-studi" element={<KeywordLandingPage slug="idraulico-citta-studi" />} />
            <Route path="/idraulico-porta-venezia" element={<KeywordLandingPage slug="idraulico-porta-venezia" />} />
            <Route path="/idraulico-san-siro" element={<KeywordLandingPage slug="idraulico-san-siro" />} />
            <Route path="/idraulico-bicocca" element={<KeywordLandingPage slug="idraulico-bicocca" />} />
            <Route path="/idraulico-loreto" element={<KeywordLandingPage slug="idraulico-loreto" />} />
            <Route path="/idraulico-centrale" element={<KeywordLandingPage slug="idraulico-centrale" />} />
            <Route path="/idraulico-corso-buenos-aires" element={<KeywordLandingPage slug="idraulico-corso-buenos-aires" />} />
            <Route path="/idraulico-sempione" element={<KeywordLandingPage slug="idraulico-sempione" />} />
            <Route path="/idraulico-moscova" element={<KeywordLandingPage slug="idraulico-moscova" />} />
            <Route path="/idraulico-porta-genova" element={<KeywordLandingPage slug="idraulico-porta-genova" />} />
            <Route path="/idraulico-porta-ticinese" element={<KeywordLandingPage slug="idraulico-porta-ticinese" />} />
            <Route path="/idraulico-bovisa" element={<KeywordLandingPage slug="idraulico-bovisa" />} />
            <Route path="/idraulico-affori" element={<KeywordLandingPage slug="idraulico-affori" />} />
            <Route path="/idraulico-quarto-oggiaro" element={<KeywordLandingPage slug="idraulico-quarto-oggiaro" />} />
            <Route path="/idraulico-baggio" element={<KeywordLandingPage slug="idraulico-baggio" />} />
            <Route path="/idraulico-corvetto" element={<KeywordLandingPage slug="idraulico-corvetto" />} />
            <Route path="/idraulico-certosa" element={<KeywordLandingPage slug="idraulico-certosa" />} />
            
            {/* Risparmio Energetico */}
            <Route path="/pompa-calore-aria-acqua" element={<KeywordLandingPage slug="pompa-calore-aria-acqua" />} />
            <Route path="/pompa-calore-aria-aria" element={<KeywordLandingPage slug="pompa-calore-aria-aria" />} />
            <Route path="/caldaia-ibrida" element={<KeywordLandingPage slug="caldaia-ibrida" />} />
            <Route path="/contabilizzazione-calore" element={<KeywordLandingPage slug="contabilizzazione-calore" />} />
            <Route path="/cronotermostato-smart" element={<KeywordLandingPage slug="cronotermostato-smart" />} />
            
            {/* Outdoor */}
            <Route path="/fontana-giardino" element={<KeywordLandingPage slug="fontana-giardino" />} />
            <Route path="/irrigazione-automatica" element={<KeywordLandingPage slug="irrigazione-automatica" />} />
            <Route path="/laghetto-giardino" element={<KeywordLandingPage slug="laghetto-giardino" />} />
            <Route path="/rubinetto-esterno" element={<KeywordLandingPage slug="rubinetto-esterno" />} />
            <Route path="/doccia-esterna" element={<KeywordLandingPage slug="doccia-esterna" />} />
            
            {/* Certificazioni */}
            <Route path="/certificazione-conformita-impianto" element={<KeywordLandingPage slug="certificazione-conformita-impianto" />} />
            <Route path="/libretto-caldaia" element={<KeywordLandingPage slug="libretto-caldaia" />} />
            <Route path="/bollino-blu-caldaia" element={<KeywordLandingPage slug="bollino-blu-caldaia" />} />
            <Route path="/collaudo-impianto" element={<KeywordLandingPage slug="collaudo-impianto" />} />
            
            {/* Problemi Meno Comuni */}
            <Route path="/incrostazioni-tubazioni" element={<KeywordLandingPage slug="incrostazioni-tubazioni" />} />
            <Route path="/corrosione-tubazioni" element={<KeywordLandingPage slug="corrosione-tubazioni" />} />
            <Route path="/radici-tubazioni" element={<KeywordLandingPage slug="radici-tubazioni" />} />
            <Route path="/grasso-tubazioni" element={<KeywordLandingPage slug="grasso-tubazioni" />} />
            <Route path="/oggetti-scarico" element={<KeywordLandingPage slug="oggetti-scarico" />} />
            
            {/* Blog Routes */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/categoria/:category" element={<BlogCategoryPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
            
            {/* Guide SEO Routes - FASE 9 */}
            <Route path="/guide" element={<GuideIndexPage />} />
            <Route path="/guide/approfondimenti" element={<ApprofondimentiIndexPage />} />
            <Route path="/guide/approfondimenti/:slug" element={<ApprofondimentoPage />} />
            {/* Hub/Pillar Pages - FASE 10 Topical Authority - Must come before :slug */}
            <Route path="/guide/perdite-acqua" element={<GuideHubPage />} />
            <Route path="/guide/scarichi-intasati" element={<GuideHubPage />} />
            <Route path="/guide/caldaia-e-riscaldamento" element={<GuideHubPage />} />
            <Route path="/guide/problemi-sanitari" element={<GuideHubPage />} />
            <Route path="/guide/emergenze-idrauliche" element={<GuideHubPage />} />
            
            {/* Individual Guide Pages */}
            <Route path="/guide/:slug" element={<GuidePage />} />
            
            {/* Linkbait Content Pages */}
            <Route path="/statistiche-problemi-idraulici-italia" element={<StatisticsPage />} />
            <Route path="/checklist-manutenzione-impianto-idraulico" element={<ChecklistPage />} />
            
            {/* National Service Pages - FASE 10 */}
            <Route path="/servizi/pronto-intervento-idraulico" element={<ServiceNationalPage />} />
            <Route path="/servizi/riparazione-perdite-acqua" element={<ServiceNationalPage />} />
            <Route path="/servizi/disostruzione-scarichi" element={<ServiceNationalPage />} />
            <Route path="/servizi/manutenzione-caldaie" element={<ServiceNationalPage />} />
            <Route path="/servizi/installazione-sanitari" element={<ServiceNationalPage />} />
            
            {/* Pricing Pages - SEO */}
            <Route path="/costi-idraulico" element={<PricingPage />} />
            <Route path="/costo-riparazione-perdita-acqua" element={<PricingPage />} />
            <Route path="/prezzo-spurgo-scarichi" element={<PricingPage />} />
            <Route path="/costo-wc-intasato" element={<PricingPage />} />
            <Route path="/costo-sostituzione-sifone" element={<PricingPage />} />
            <Route path="/costo-manutenzione-caldaia" element={<PricingPage />} />
            <Route path="/costo-idraulico-urgente" element={<PricingPage />} />
            <Route path="/costo-riparazione-tubo-perdita" element={<PricingPage />} />
            <Route path="/costo-installazione-sanitari" element={<PricingPage />} />
            <Route path="/costo-sostituzione-rubinetto" element={<PricingPage />} />
            
            {/* Problem + City SEO Pages - Lavandino Intasato */}
            <Route path="/lavandino-intasato-milano" element={<ProblemCityPage />} />
            <Route path="/lavandino-intasato-roma" element={<ProblemCityPage />} />
            <Route path="/lavandino-intasato-torino" element={<ProblemCityPage />} />
            <Route path="/lavandino-intasato-napoli" element={<ProblemCityPage />} />
            <Route path="/lavandino-intasato-bologna" element={<ProblemCityPage />} />
            <Route path="/lavandino-intasato-firenze" element={<ProblemCityPage />} />
            <Route path="/lavandino-intasato-genova" element={<ProblemCityPage />} />
            <Route path="/lavandino-intasato-bari" element={<ProblemCityPage />} />
            <Route path="/lavandino-intasato-verona" element={<ProblemCityPage />} />
            <Route path="/lavandino-intasato-padova" element={<ProblemCityPage />} />
            
            {/* Problem + City SEO Pages - WC Otturato */}
            <Route path="/wc-otturato-milano" element={<ProblemCityPage />} />
            <Route path="/wc-otturato-roma" element={<ProblemCityPage />} />
            <Route path="/wc-otturato-torino" element={<ProblemCityPage />} />
            <Route path="/wc-otturato-napoli" element={<ProblemCityPage />} />
            <Route path="/wc-otturato-bologna" element={<ProblemCityPage />} />
            <Route path="/wc-otturato-firenze" element={<ProblemCityPage />} />
            <Route path="/wc-otturato-genova" element={<ProblemCityPage />} />
            <Route path="/wc-otturato-bari" element={<ProblemCityPage />} />
            <Route path="/wc-otturato-palermo" element={<ProblemCityPage />} />
            <Route path="/wc-otturato-catania" element={<ProblemCityPage />} />
            
            {/* Problem + City SEO Pages - Scaldabagno Non Scalda */}
            <Route path="/scaldabagno-non-scalda-milano" element={<ProblemCityPage />} />
            <Route path="/scaldabagno-non-scalda-roma" element={<ProblemCityPage />} />
            <Route path="/scaldabagno-non-scalda-torino" element={<ProblemCityPage />} />
            <Route path="/scaldabagno-non-scalda-napoli" element={<ProblemCityPage />} />
            <Route path="/scaldabagno-non-scalda-bologna" element={<ProblemCityPage />} />
            <Route path="/scaldabagno-non-scalda-firenze" element={<ProblemCityPage />} />
            <Route path="/scaldabagno-non-scalda-genova" element={<ProblemCityPage />} />
            <Route path="/scaldabagno-non-scalda-bari" element={<ProblemCityPage />} />
            <Route path="/scaldabagno-non-scalda-verona" element={<ProblemCityPage />} />
            <Route path="/scaldabagno-non-scalda-venezia" element={<ProblemCityPage />} />
            
            {/* Problem + City SEO Pages - Caldaia in Blocco */}
            <Route path="/caldaia-in-blocco-milano" element={<ProblemCityPage />} />
            <Route path="/caldaia-in-blocco-roma" element={<ProblemCityPage />} />
            <Route path="/caldaia-in-blocco-torino" element={<ProblemCityPage />} />
            <Route path="/caldaia-in-blocco-napoli" element={<ProblemCityPage />} />
            <Route path="/caldaia-in-blocco-bologna" element={<ProblemCityPage />} />
            <Route path="/caldaia-in-blocco-firenze" element={<ProblemCityPage />} />
            <Route path="/caldaia-in-blocco-genova" element={<ProblemCityPage />} />
            <Route path="/caldaia-in-blocco-bari" element={<ProblemCityPage />} />
            <Route path="/caldaia-in-blocco-verona" element={<ProblemCityPage />} />
            <Route path="/caldaia-in-blocco-trieste" element={<ProblemCityPage />} />
            
            {/* Problem + City SEO Pages - Tubo che Perde */}
            <Route path="/tubo-che-perde-milano" element={<ProblemCityPage />} />
            <Route path="/tubo-che-perde-roma" element={<ProblemCityPage />} />
            <Route path="/tubo-che-perde-torino" element={<ProblemCityPage />} />
            <Route path="/tubo-che-perde-napoli" element={<ProblemCityPage />} />
            <Route path="/tubo-che-perde-bologna" element={<ProblemCityPage />} />
            <Route path="/tubo-che-perde-firenze" element={<ProblemCityPage />} />
            <Route path="/tubo-che-perde-genova" element={<ProblemCityPage />} />
            <Route path="/tubo-che-perde-bari" element={<ProblemCityPage />} />
            <Route path="/tubo-che-perde-verona" element={<ProblemCityPage />} />
            <Route path="/tubo-che-perde-modena" element={<ProblemCityPage />} />
            
            {/* Problem + City SEO Pages - Doccia Non Scarica */}
            <Route path="/doccia-non-scarica-milano" element={<ProblemCityPage />} />
            <Route path="/doccia-non-scarica-roma" element={<ProblemCityPage />} />
            <Route path="/doccia-non-scarica-torino" element={<ProblemCityPage />} />
            <Route path="/doccia-non-scarica-napoli" element={<ProblemCityPage />} />
            <Route path="/doccia-non-scarica-bologna" element={<ProblemCityPage />} />
            <Route path="/doccia-non-scarica-firenze" element={<ProblemCityPage />} />
            <Route path="/doccia-non-scarica-genova" element={<ProblemCityPage />} />
            <Route path="/doccia-non-scarica-bari" element={<ProblemCityPage />} />
            <Route path="/doccia-non-scarica-verona" element={<ProblemCityPage />} />
            <Route path="/doccia-non-scarica-parma" element={<ProblemCityPage />} />
            
            {/* Problem + City SEO Pages - Scarico Cucina Lento */}
            <Route path="/scarico-cucina-lento-milano" element={<ProblemCityPage />} />
            <Route path="/scarico-cucina-lento-roma" element={<ProblemCityPage />} />
            <Route path="/scarico-cucina-lento-torino" element={<ProblemCityPage />} />
            <Route path="/scarico-cucina-lento-napoli" element={<ProblemCityPage />} />
            <Route path="/scarico-cucina-lento-bologna" element={<ProblemCityPage />} />
            <Route path="/scarico-cucina-lento-firenze" element={<ProblemCityPage />} />
            <Route path="/scarico-cucina-lento-genova" element={<ProblemCityPage />} />
            <Route path="/scarico-cucina-lento-bari" element={<ProblemCityPage />} />
            <Route path="/scarico-cucina-lento-verona" element={<ProblemCityPage />} />
            <Route path="/scarico-cucina-lento-reggio-emilia" element={<ProblemCityPage />} />
            
            {/* Problem + City SEO Pages - Termosifone Freddo */}
            <Route path="/termosifone-freddo-milano" element={<ProblemCityPage />} />
            <Route path="/termosifone-freddo-roma" element={<ProblemCityPage />} />
            <Route path="/termosifone-freddo-torino" element={<ProblemCityPage />} />
            <Route path="/termosifone-freddo-napoli" element={<ProblemCityPage />} />
            <Route path="/termosifone-freddo-bologna" element={<ProblemCityPage />} />
            <Route path="/termosifone-freddo-firenze" element={<ProblemCityPage />} />
            <Route path="/termosifone-freddo-genova" element={<ProblemCityPage />} />
            <Route path="/termosifone-freddo-bari" element={<ProblemCityPage />} />
            <Route path="/termosifone-freddo-verona" element={<ProblemCityPage />} />
            <Route path="/termosifone-freddo-bergamo" element={<ProblemCityPage />} />
            
            {/* 301 Redirects for legacy URL patterns */}
            {/* IMPORTANT: /idraulico-milano → /milano (canonical consolidation) */}
            <Route path="/idraulico-milano" element={<Navigate to="/milano" replace />} />
            <Route path="/milano-idraulico" element={<Navigate to="/milano" replace />} />
            <Route path="/idraulico/:city/:service" element={<IdraulicoRedirect type="city-service" />} />
            <Route path="/idraulico/:city" element={<IdraulicoRedirect type="city" />} />
            <Route path="/servizi/:service" element={<ServiziRedirect />} />
            
            {/* NAPOLI - Ultra-optimized landing page for top 3 ranking */}
            <Route path="/napoli" element={<NapoliLandingPage />} />
            
            {/* MILANO - Ultra-optimized landing page for top 3 ranking */}
            <Route path="/milano" element={<MilanoLandingPage />} />

            {/* SIENA - Ultra-optimized landing page targeting top 1 (KD 11) */}
            <Route path="/siena" element={<SienaLandingPage />} />
            
            {/* NAPOLI QUARTIERI - Local SEO pages */}
            <Route path="/idraulico-napoli-centro-storico" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-vomero" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-arenella" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-posillipo" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-chiaia" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-mergellina" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-fuorigrotta" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-bagnoli" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-soccavo" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-pianura" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-san-giovanni-a-teduccio" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-scampia" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-secondigliano" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-ponticelli" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-barra" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-piscinola" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-chiaiano" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-capodimonte" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-sanita" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-materdei" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-colli-aminei" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-rione-alto" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-miano" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-marianella" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-poggioreale" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-gianturco" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-san-carlo-all-arena" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-stella" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-avvocata" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-montecalvario" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-quartieri-spagnoli" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-san-ferdinando" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-pendino" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-mercato" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-san-lorenzo" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-vicaria" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-porto" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-san-giuseppe" element={<NapoliQuartierePage />} />
            <Route path="/idraulico-napoli-agnano" element={<NapoliQuartierePage />} />
            
            {/* MILANO QUARTIERI - Local SEO pages */}
            <Route path="/idraulico-milano-navigli" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-brera" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-porta-romana" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-citta-studi" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-isola" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-porta-venezia" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-porta-genova" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-lambrate" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-porta-nuova" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-garibaldi" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-centrale" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-loreto" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-bicocca" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-bovisa" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-niguarda" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-affori" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-quarto-oggiaro" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-san-siro" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-baggio" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-barona" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-ticinese" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-tortona" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-sempione" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-sarpi" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-greco" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-precotto" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-crescenzago" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-turro" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-gorla" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-corvetto" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-gratosoglio" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-chiesa-rossa" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-vigentino" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-rogoredo" element={<MilanoQuartierePage />} />
            <Route path="/idraulico-milano-stadera" element={<MilanoQuartierePage />} />
            
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
