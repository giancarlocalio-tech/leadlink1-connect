/**
 * NapoliNeighborhoodsSection - Extended neighborhoods coverage
 * 
 * Shows 40 Naples neighborhoods organized by area
 * ALL items are clickable links to dedicated neighborhood pages
 */

import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { NAPOLI_QUARTIERI } from '@/lib/napoliQuartieriData';
import { NAPOLI_NEARBY_AREAS } from '@/lib/napoliSeoContent';

// Organize neighborhoods by area for better UX
const neighborhoodGroups = [
  {
    title: 'Centro Storico e Zone Storiche',
    slugs: ['centro-storico', 'quartieri-spagnoli', 'san-lorenzo', 'pendino', 'mercato', 'vicaria', 'porto', 'san-giuseppe']
  },
  {
    title: 'Zone Collinari',
    slugs: ['vomero', 'arenella', 'posillipo', 'capodimonte', 'colli-aminei', 'rione-alto', 'materdei']
  },
  {
    title: 'Zone Storiche Interne',
    slugs: ['sanita', 'stella', 'avvocata', 'montecalvario', 'san-ferdinando', 'san-carlo-all-arena']
  },
  {
    title: 'Lungomare e Costa',
    slugs: ['chiaia', 'mergellina', 'bagnoli', 'agnano']
  },
  {
    title: 'Zone Residenziali Ovest',
    slugs: ['fuorigrotta', 'soccavo', 'pianura']
  },
  {
    title: 'Zone Est',
    slugs: ['san-giovanni-a-teduccio', 'barra', 'ponticelli', 'poggioreale', 'gianturco']
  },
  {
    title: 'Zone Nord',
    slugs: ['secondigliano', 'scampia', 'piscinola', 'chiaiano', 'miano', 'marianella']
  }
];

export function NapoliNeighborhoodsSection() {
  // Get quartiere data by slug
  const getQuartiere = (slug: string) => {
    return NAPOLI_QUARTIERI.find(q => q.slug === slug);
  };

  return (
    <section id="quartieri" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <MapPin className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Interveniamo in Tutti i Quartieri di Napoli
              </h2>
              <p className="text-muted-foreground mt-1">
                40 quartieri coperti con pagine dedicate
              </p>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            I nostri idraulici professionisti operano in <strong className="text-foreground">tutta Napoli</strong> e 
            nei comuni limitrofi. Che tu abiti nel Centro Storico o in periferia, al Vomero o a Fuorigrotta, 
            riceverai assistenza rapida e professionale per qualsiasi problema idraulico.
          </p>
          
          {/* Neighborhoods by area - ALL CLICKABLE */}
          <div className="space-y-6 mb-10">
            {neighborhoodGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="font-semibold text-lg mb-3 text-foreground">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.slugs.map((slug) => {
                    const quartiere = getQuartiere(slug);
                    if (!quartiere) return null;
                    return (
                      <Link
                        key={slug}
                        to={`/idraulico-napoli-${slug}`}
                        className="bg-card border border-border px-4 py-2 rounded-full text-sm font-medium hover:border-primary hover:bg-primary/5 transition-colors"
                        title={`Idraulico ${quartiere.nome} - Pronto intervento`}
                      >
                        {quartiere.nome}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 mb-10 text-center">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">40</div>
              <div className="text-sm text-muted-foreground">Quartieri coperti</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">24h</div>
              <div className="text-sm text-muted-foreground">Disponibilità</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">30min</div>
              <div className="text-sm text-muted-foreground">Tempo medio arrivo</div>
            </div>
          </div>
          
          {/* Nearby areas */}
          <div className="border-t border-border pt-8">
            <h3 className="font-bold text-xl mb-4">
              Comuni della Provincia di Napoli
            </h3>
            <p className="text-muted-foreground mb-4">
              Oltre alla città di Napoli, interveniamo in tutti i comuni della provincia:
            </p>
            <div className="flex flex-wrap gap-2">
              {NAPOLI_NEARBY_AREAS.map((area, index) => (
                <span 
                  key={index}
                  className="bg-secondary/50 border border-border px-4 py-2 rounded-full text-sm font-medium"
                >
                  {area}
                </span>
              ))}
              <span className="bg-primary/10 border border-primary/30 px-4 py-2 rounded-full text-sm font-medium text-primary">
                + altri 90 comuni
              </span>
            </div>
          </div>
          
          {/* Local SEO text with more links */}
          <div className="mt-8 p-4 bg-accent/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              👉 Trova un{' '}
              <Link to="/idraulico-napoli-vomero" className="text-primary hover:underline font-medium">idraulico Vomero</Link>,{' '}
              <Link to="/idraulico-napoli-chiaia" className="text-primary hover:underline font-medium">idraulico Chiaia</Link>,{' '}
              <Link to="/idraulico-napoli-posillipo" className="text-primary hover:underline font-medium">idraulico Posillipo</Link>,{' '}
              <Link to="/idraulico-napoli-centro-storico" className="text-primary hover:underline font-medium">idraulico Centro Storico</Link>,{' '}
              <Link to="/idraulico-napoli-fuorigrotta" className="text-primary hover:underline font-medium">idraulico Fuorigrotta</Link>,{' '}
              <Link to="/idraulico-napoli-quartieri-spagnoli" className="text-primary hover:underline font-medium">idraulico Quartieri Spagnoli</Link> o in qualsiasi altra 
              zona di Napoli con un solo click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
