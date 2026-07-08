import { Link } from 'react-router-dom';
import { MapPin, Flame, Droplets, ArrowUpRight, Shield, Clock, Star } from 'lucide-react';
import { CITIES, SERVICES, KEYWORD_PAGES } from '@/lib/seoData';
import { buildWhatsAppUrl } from '@/lib/whatsappConfig';
import logoIcon from '@/assets/logo-icon.png';
const TOP_CITIES = CITIES.slice(0, 12);
const TOP_SERVICES = SERVICES.slice(0, 6);

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-auto">
      {/* Pre-footer CTA strip */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                Hai un problema idraulico?
              </h2>
              <p className="text-background/70 mt-2 max-w-xl">
                Parla subito con l'Idraulico AI: descrivi il problema, invia una foto e ricevi la soluzione passo-passo. Prima diagnosi gratis, chat illimitata a 4,95€ una tantum.
              </p>
            </div>
            <Link
              to="/consulenza"
              className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-4 rounded-2xl transition-all hover:-translate-y-0.5 shadow-[0_10px_30px_-10px_rgba(14,165,233,0.5)] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
            >
              ✨ Parla con l'AI →
            </Link>
          </div>

          {/* Trust micro-row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-xs text-background/60">
            <span className="inline-flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Privato e senza registrazione</span>
            <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" /> Diagnosi in 30 secondi</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Disponibile 24/7</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logoIcon} alt="Idraulico AI" className="h-10 w-auto object-contain" width={64} height={64} />
              <span className="text-lg font-extrabold tracking-tight">Idraulico AI</span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              L'assistente AI che risolve i tuoi problemi idraulici in chat. Diagnosi, foto, video e soluzioni passo-passo 24/7.
            </p>
            <div className="text-xs text-background/40">
              Attivo <span className="text-background font-bold">24 ore su 24</span>, in tutta Italia.
            </div>
          </div>


          {/* Link Utili */}
          <div>
            <h3 className="font-bold text-background mb-5 text-sm uppercase tracking-wider">Risorse</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-background/70 hover:text-background text-sm transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">Home</Link></li>
              <li><Link to="/contatti" className="text-background/70 hover:text-background text-sm transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">Contattaci</Link></li>
              <li><Link to="/guide" className="text-background/70 hover:text-background text-sm transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">Guide e Consigli</Link></li>
              <li><Link to="/consulenza" className="text-background/70 hover:text-background text-sm transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">Parla con l'AI</Link></li>
              {KEYWORD_PAGES.slice(0, 4).map((page) => (
                <li key={page.slug}>
                  <Link to={`/${page.slug}`} className="text-background/70 hover:text-background text-sm transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">
                    {page.h1.replace('Trova un ', '').replace(' - Intervento Immediato', '').replace(' Professionale', '').replace(' Gratuito', '')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Azienda */}
          <div>
            <h3 className="font-bold text-background mb-5 text-sm uppercase tracking-wider">Azienda</h3>
            <ul className="space-y-3">
              <li><Link to="/chi-siamo" className="text-background/70 hover:text-background text-sm transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">Chi siamo</Link></li>
              <li><Link to="/come-funziona" className="text-background/70 hover:text-background text-sm transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">Come funziona</Link></li>
              <li><Link to="/contatti" className="text-background/70 hover:text-background text-sm transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">Contatti</Link></li>
              <li><Link to="/privacy" className="text-background/70 hover:text-background text-sm transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">Privacy Policy</Link></li>
              <li><Link to="/termini" className="text-background/70 hover:text-background text-sm transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">Termini di utilizzo</Link></li>
            </ul>
          </div>

          {/* Servizi */}
          <div>
            <h3 className="font-bold text-background mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
              <Flame className="h-4 w-4" /> Servizi
            </h3>
            <ul className="space-y-3">
              {TOP_SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link to={`/milano-${service.slug}`} className="text-background/70 hover:text-background text-sm transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground inline-flex items-center gap-1 group">
                    {service.shortName}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cities - SEO */}
        <div className="border-t border-background/10 pt-10 mb-10">
          <h3 className="font-bold text-background mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Idraulici nelle principali città
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-2.5">
            {TOP_CITIES.map((city) => (
              <Link key={city.slug} to={`/${city.slug}`} className="text-background/70 hover:text-background text-sm transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">
                Idraulico {city.name}
              </Link>
            ))}
          </div>
        </div>

        {/* City + Service - SEO */}
        <div className="border-t border-background/10 pt-10 mb-10">
          <h3 className="font-bold text-background mb-5 text-sm uppercase tracking-wider flex items-center gap-2">
            <Droplets className="h-4 w-4" /> Servizi per città
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-2.5">
            {TOP_CITIES.slice(0, 5).flatMap((city) =>
              SERVICES.slice(0, 2).map((service) => (
                <Link
                  key={`${city.slug}-${service.slug}`}
                  to={`/${city.slug}-${service.slug}`}
                  className="text-background/70 hover:text-background text-sm transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
                >
                  {service.shortName} {city.name}
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-background/70 text-sm">
            © {new Date().getFullYear()} Idraulici Subito. Tutti i diritti riservati.
          </p>
          <p className="text-background/70 text-sm">
            Servizio attivo in oltre 50 città italiane · Made in Italy 🇮🇹
          </p>
        </div>
      </div>
    </footer>
  );
}
