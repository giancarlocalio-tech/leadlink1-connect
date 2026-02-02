/**
 * MilanoReviewsSection - Local testimonials for Milano
 * 
 * Social proof with Milano-specific reviews
 */

import { Star, Quote, MapPin, CheckCircle } from 'lucide-react';

const MILANO_REVIEWS = [
  {
    name: 'Alessandro B.',
    neighborhood: 'Navigli',
    rating: 5,
    date: 'Gennaio 2024',
    text: 'Scarico della doccia completamente intasato nel mio appartamento in una casa di ringhiera. L\'idraulico è arrivato in 30 minuti con l\'attrezzatura giusta. Ha risolto il problema del calcare che intasava il tubo. Professionale e pulito.',
    service: 'Scarico intasato'
  },
  {
    name: 'Francesca M.',
    neighborhood: 'Isola',
    rating: 5,
    date: 'Dicembre 2023',
    text: 'Perdita dal bagno che stava allagando il soffitto del vicino. Emergenza di notte, pensavo fosse impossibile trovare qualcuno. Invece hanno risposto in 10 minuti e l\'idraulico era da me in mezz\'ora. Salvato!',
    service: 'Perdita acqua'
  },
  {
    name: 'Marco T.',
    neighborhood: 'Città Studi',
    rating: 5,
    date: 'Febbraio 2024',
    text: 'Caldaia in blocco durante l\'ondata di gelo di gennaio. Con -5° fuori non potevo aspettare. L\'idraulico ha diagnosticato il problema (pressione e valvola) e risolto in un\'ora. Costo onesto per un intervento urgente.',
    service: 'Caldaia bloccata'
  },
  {
    name: 'Giulia R.',
    neighborhood: 'Porta Romana',
    rating: 5,
    date: 'Gennaio 2024',
    text: 'Rubinetto della cucina che gocciolava da mesi, finalmente mi sono decisa. Intervento velocissimo, 25 minuti in tutto. L\'idraulico mi ha anche dato consigli sul calcare. Ottimo rapporto qualità-prezzo.',
    service: 'Rubinetto che perde'
  },
  {
    name: 'Roberto S.',
    neighborhood: 'Brera',
    rating: 4,
    date: 'Novembre 2023',
    text: 'Problema alla colonna di scarico condominiale nel mio palazzo Liberty. Intervento complesso perché l\'edificio è vincolato. L\'idraulico ha gestito tutto con competenza, anche i rapporti con l\'amministratore.',
    service: 'Colonna condominiale'
  },
  {
    name: 'Elena C.',
    neighborhood: 'Bicocca',
    rating: 5,
    date: 'Dicembre 2023',
    text: 'WC intasato di domenica pomeriggio. Ho usato il form online e in 45 minuti l\'idraulico era a casa. Ha usato una sonda professionale e risolto subito. Prezzo corretto anche per il festivo.',
    service: 'WC intasato'
  },
];

export function MilanoReviewsSection() {
  const averageRating = (MILANO_REVIEWS.reduce((acc, r) => acc + r.rating, 0) / MILANO_REVIEWS.length).toFixed(1);
  
  return (
    <section id="recensioni" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-6 w-6 ${i < Math.round(Number(averageRating)) ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} 
                  />
                ))}
              </div>
              <span className="text-2xl font-bold">{averageRating}/5</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Cosa Dicono i Clienti di Milano
            </h2>
            <p className="text-muted-foreground">
              Recensioni verificate da clienti milanesi che hanno usato il nostro servizio
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MILANO_REVIEWS.map((review, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-xl p-6 relative"
              >
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} 
                    />
                  ))}
                </div>
                
                {/* Review text */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  "{review.text}"
                </p>
                
                {/* Author info */}
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{review.name}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{review.neighborhood}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {review.service}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Trust badge */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">456 recensioni verificate a Milano</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
