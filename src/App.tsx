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
import BlogPage from "./pages/BlogPage";
import BlogArticlePage from "./pages/BlogArticlePage";
import BlogCategoryPage from "./pages/BlogCategoryPage";
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
            
            {/* Blog Routes */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/categoria/:category" element={<BlogCategoryPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
            
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
