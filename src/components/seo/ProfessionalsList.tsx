import { User, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfessionalsListProps {
  cityName: string;
  serviceName?: string;
  onRequestQuote: () => void;
}

// Generate professional data based on city
function generateProfessionals(cityName: string) {
  const firstNames = ['Marco', 'Giuseppe', 'Andrea', 'Luigi', 'Francesco', 'Alessandro', 'Roberto', 'Luca', 'Stefano', 'Giovanni'];
  const lastInitials = ['R', 'M', 'B', 'P', 'S', 'T', 'C', 'F', 'G', 'L'];
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-teal-500', 'bg-pink-500'];
  
  const descriptions = [
    `Professionista con oltre 15 anni di esperienza nel settore idraulico. Interventi rapidi e prezzi onesti.`,
    `Specializzato in riparazioni urgenti e manutenzione caldaie. Disponibilità immediata per emergenze.`,
    `Impresa artigiana con esperienza in installazioni, ristrutturazioni bagno e impianti completi.`,
    `Idraulico qualificato per interventi residenziali e commerciali. Preventivi gratuiti e trasparenti.`,
    `Esperienza ventennale in tutti i servizi idraulici. Pronto intervento 24/7 per la zona.`,
    `Tecnico certificato per caldaie e impianti di riscaldamento. Manutenzione programmata e riparazioni.`
  ];

  // Use city name to create consistent order
  let hash = 0;
  for (let i = 0; i < cityName.length; i++) {
    hash = ((hash << 5) - hash) + cityName.charCodeAt(i);
  }
  
  const shuffledIndices = [0, 1, 2, 3, 4, 5].sort((a, b) => {
    const ha = (hash + a * 7) % 100;
    const hb = (hash + b * 7) % 100;
    return ha - hb;
  });

  return shuffledIndices.slice(0, 5).map((idx, i) => {
    const nameIdx = (hash + idx) % firstNames.length;
    const initialIdx = (hash + idx * 3) % lastInitials.length;
    const colorIdx = (hash + idx) % colors.length;
    
    // Generate a date in the last 2 years
    const monthsAgo = Math.abs((hash + idx * 17) % 24);
    const date = new Date();
    date.setMonth(date.getMonth() - monthsAgo);
    
    return {
      id: idx,
      name: `${firstNames[nameIdx]} ${lastInitials[initialIdx]}.`,
      initials: `${firstNames[nameIdx][0]}${lastInitials[initialIdx]}`,
      color: colors[colorIdx],
      location: cityName,
      joinDate: date.toLocaleDateString('it-IT', { month: '2-digit', year: 'numeric' }),
      description: descriptions[idx]
    };
  });
}

export function ProfessionalsList({ cityName, serviceName, onRequestQuote }: ProfessionalsListProps) {
  const professionals = generateProfessionals(cityName);
  const serviceText = serviceName || 'Idraulico';
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Trova {serviceText} a {cityName}
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
          Professionisti verificati pronti ad aiutarti nella tua zona
        </p>
        
        <div className="max-w-4xl mx-auto">
          {/* Professionals list */}
          <div className="space-y-4 mb-8">
            {professionals.map((prof) => (
              <div 
                key={prof.id}
                className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow flex gap-4"
              >
                {/* Avatar */}
                <div className={`${prof.color} w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-lg">{prof.initials}</span>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{prof.name}</h3>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {prof.joinDate}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{serviceText} · {prof.location}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {prof.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onRequestQuote}
              size="lg"
              className="font-semibold"
            >
              Trova il tuo esperto
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="font-semibold"
              asChild
            >
              <a href="/per-idraulici">Iscriviti come Professionista</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
