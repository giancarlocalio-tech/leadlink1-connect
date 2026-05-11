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
                Hai un'emergenza idraulica?
              </h2>
              <p className="text-background/70 mt-2 max-w-xl">
                Scrivici su WhatsApp. Risposta media in 8 minuti, preventivo gratis e nessun obbligo.
              </p>
            </div>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb455] text-white font-bold px-6 py-4 rounded-2xl transition-all hover:-translate-y-0.5 shadow-[0_10px_30px_-10px_rgba(37,211,102,0.5)] whitespace-nowrap"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Scrivici su WhatsApp
            </a>
          </div>

          {/* Trust micro-row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-xs text-background/60">
            <span className="inline-flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Professionisti verificati</span>
            <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" /> 4.8/5 · 500+ recensioni</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Risposta media ~8 minuti</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logoIcon} alt="Idraulici Subito" className="h-8 w-auto object-contain brightness-0 invert" width={64} height={64} />
              <span className="text-lg font-extrabold tracking-tight">Idraulici Subito</span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              Il marketplace che mette in contatto clienti e idraulici professionisti verificati in tutta Italia. Senza commissioni, senza intermediari.
            </p>
            <div className="text-xs text-background/40">
              Attivo in oltre <span className="text-background font-bold">50 città</span> italiane.
            </div>
          </div>

          {/* Link Utili */}
          <div>
            <h3 className="font-bold text-background mb-5 text-sm uppercase tracking-wider">Risorse</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-background/70 hover:text-background text-sm transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">Home</Link></li>
              <li><a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="text-background/70 hover:text-background text-sm transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">Contattaci su WhatsApp</a></li>
              <li><Link to="/guide" className="text-background/70 hover:text-background text-sm transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">Guide e Consigli</Link></li>
              <li><Link to="/per-idraulici" className="text-background/70 hover:text-background text-sm transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-foreground">Sei un idraulico?</Link></li>
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
          <p className="text-background/40 text-xs">
            © {new Date().getFullYear()} Idraulici Subito. Tutti i diritti riservati.
          </p>
          <p className="text-background/40 text-xs">
            Servizio attivo in oltre 50 città italiane · Made in Italy 🇮🇹
          </p>
        </div>
      </div>
    </footer>
  );
}
