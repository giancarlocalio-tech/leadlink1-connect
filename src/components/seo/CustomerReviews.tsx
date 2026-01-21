import { Star } from 'lucide-react';

interface CustomerReviewsProps {
  cityName?: string;
  serviceName?: string;
}

function generateReviews(seed: string) {
  const reviewTemplates = [
    {
      name: 'Maria L.',
      rating: 5,
      text: 'Professionista serio e competente. Ha risposto subito, è venuto a fare il sopralluogo in tempi brevissimi ed è stato disponibilissimo nel fissare la data dell\'intervento. Lavoro perfetto. Pulito e competente, ci ha dato anche utili suggerimenti. Consigliatissimo'
    },
    {
      name: 'Antonio S.',
      rating: 5,
      text: 'Idraulico puntuale e molto paziente. Il lavoro si è rivelato più complicato del previsto ma ha risolto tutto perfettamente. Ottimo rapporto qualità prezzo.'
    },
    {
      name: 'Giulia R.',
      rating: 5,
      text: 'Tutto bene! È stato disponibile e puntuale, il lavoro è stato fatto alla perfezione. Ci vedremo presto per altri interventi sull\'impianto di casa.'
    },
    {
      name: 'Francesco M.',
      rating: 5,
      text: 'Professionista veramente eccezionale. Una persona competente, gentile e onesta che sa fare sicuramente molto bene il suo lavoro. Grazie mille!'
    },
    {
      name: 'Elena P.',
      rating: 4,
      text: 'Ho prenotato senza sapere nulla, è arrivato da me domenica mattina per fare lavori di riparazione perdita. Veloce e professionale. Consiglio.'
    }
  ];

  // Shuffle based on seed for variety
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
  }
  
  return reviewTemplates
    .map((review, idx) => ({
      ...review,
      sortKey: (hash + idx * 13) % 100
    }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .slice(0, 4)
    .map((review, idx) => {
      // Generate date in last 6 months
      const monthsAgo = Math.abs((hash + idx * 7) % 6);
      const date = new Date();
      date.setMonth(date.getMonth() - monthsAgo);
      
      return {
        ...review,
        date: date.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })
      };
    });
}

export function CustomerReviews({ cityName, serviceName }: CustomerReviewsProps) {
  const seed = cityName || serviceName || 'italia';
  const reviews = generateReviews(seed);
  const locationText = cityName ? `a ${cityName}` : '';
  const serviceText = serviceName || 'Idraulici Subito';
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Recensioni dei clienti
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
          Cosa dicono i clienti che hanno usato {serviceText} {locationText}
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {reviews.map((review, idx) => (
            <div 
              key={idx}
              className="bg-card rounded-xl p-6 border border-border shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <span className="text-xs text-muted-foreground">Idraulico · {review.date}</span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-4">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
