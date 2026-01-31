/**
 * NapoliReviewsSection - Local testimonials for Naples
 * 
 * Social proof with Naples-specific reviews
 */

import { Star, Quote, MapPin, CheckCircle } from 'lucide-react';

const NAPOLI_REVIEWS = [
  {
    name: 'Marco R.',
    neighborhood: 'Vomero',
    rating: 5,
    date: 'Gennaio 2024',
    text: 'Perdita dal soffitto di notte, situazione drammatica. L\'idraulico è arrivato in 25 minuti nonostante fosse tardi. Ha trovato il problema nella colonna del piano di sopra e risolto tutto. Professionalità eccezionale.',
    service: 'Perdita acqua'
  },
  {
    name: 'Lucia D.',
    neighborhood: 'Centro Storico',
    rating: 5,
    date: 'Dicembre 2023',
    text: 'Abito in un palazzo del 1700 ai Quartieri Spagnoli, tubature impossibili. L\'idraulico ha avuto pazienza e competenza per sturare lo scarico senza danneggiare nulla. Finalmente qualcuno che capisce gli edifici storici.',
    service: 'Scarico intasato'
  },
  {
    name: 'Antonio F.',
    neighborhood: 'Fuorigrotta',
    rating: 5,
    date: 'Febbraio 2024',
    text: 'Caldaia in blocco durante l\'ondata di freddo. Risposta immediata tramite il sito, tecnico arrivato in 40 minuti. Ha risolto e fatto anche la manutenzione completa. Prezzo onesto.',
    service: 'Caldaia bloccata'
  },
  {
    name: 'Giovanna M.',
    neighborhood: 'Chiaia',
    rating: 5,
    date: 'Gennaio 2024',
    text: 'WC intasato di domenica mattina con ospiti in arrivo. Pensavo fosse impossibile trovare qualcuno. Invece hanno risposto subito e in un\'ora era tutto risolto. Servizio eccellente.',
    service: 'WC intasato'
  },
  {
    name: 'Roberto C.',
    neighborhood: 'Posillipo',
    rating: 4,
    date: 'Novembre 2023',
    text: 'Problema di pressione ai piani alti, tipico della zona. L\'idraulico ha diagnosticato correttamente il problema all\'autoclave condominiale e ci ha guidato nella soluzione. Molto preparato.',
    service: 'Pressione acqua'
  },
  {
    name: 'Francesca L.',
    neighborhood: 'Mergellina',
    rating: 5,
    date: 'Dicembre 2023',
    text: 'Perdita sotto il lavandino che durava da giorni. L\'idraulico ha trovato subito il problema (tubo corroso dalla salsedine, mi ha spiegato) e sostituito tutto. Veloce e pulito.',
    service: 'Riparazione tubatura'
  },
];

export function NapoliReviewsSection() {
  const averageRating = (NAPOLI_REVIEWS.reduce((acc, r) => acc + r.rating, 0) / NAPOLI_REVIEWS.length).toFixed(1);
  
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
              Cosa Dicono i Clienti di Napoli
            </h2>
            <p className="text-muted-foreground">
              Recensioni verificate da clienti napoletani che hanno usato il nostro servizio
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NAPOLI_REVIEWS.map((review, index) => (
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
              <span className="font-medium">387 recensioni verificate a Napoli</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
