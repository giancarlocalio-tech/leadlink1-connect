import { MapPin, Calendar, Star, Clock, CheckCircle, Shield, Award, ThumbsUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProfessionalsListProps {
  cityName?: string;
  serviceName?: string;
  onRequestQuote?: () => void;
}

// Generate professional data based on seed
function generateProfessionals(seed: string) {
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

  const specializations = [
    ['Pronto Intervento', 'Perdite', 'Caldaie'],
    ['Emergenze 24/7', 'Caldaie', 'Manutenzione'],
    ['Ristrutturazioni', 'Bagni', 'Impianti'],
    ['Residenziale', 'Commerciale', 'Preventivi'],
    ['Pronto Intervento', 'Impianti', 'Riparazioni'],
    ['Caldaie', 'Riscaldamento', 'Certificazioni']
  ];

  const locations = ['Milano', 'Roma', 'Torino', 'Bologna', 'Firenze', 'Napoli'];

  // Use seed to create consistent order
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
  }
  
  const shuffledIndices = [0, 1, 2, 3, 4, 5].sort((a, b) => {
    const ha = (hash + a * 7) % 100;
    const hb = (hash + b * 7) % 100;
    return ha - hb;
  });

  return shuffledIndices.slice(0, 5).map((idx, i) => {
    const nameIdx = Math.abs((hash + idx) % firstNames.length);
    const initialIdx = Math.abs((hash + idx * 3) % lastInitials.length);
    const colorIdx = Math.abs((hash + idx) % colors.length);
    const locationIdx = Math.abs((hash + idx * 5) % locations.length);
    
    // Generate a date in the last 2 years
    const monthsAgo = Math.abs((hash + idx * 17) % 24);
    const date = new Date();
    date.setMonth(date.getMonth() - monthsAgo);
    
    // Generate stats
    const rating = 4.5 + (Math.abs((hash + idx * 11) % 10) / 20); // 4.5 - 4.95
    const reviewCount = 15 + Math.abs((hash + idx * 23) % 186); // 15-200
    const jobsCompleted = 50 + Math.abs((hash + idx * 31) % 451); // 50-500
    const responseTime = 10 + Math.abs((hash + idx * 7) % 51); // 10-60 minutes
    const isVerified = ((hash + idx) % 3) !== 0; // ~66% verified
    const isTopRated = rating >= 4.8 && reviewCount > 80;
    const hasProBadge = jobsCompleted > 200;
    const yearsExperience = 5 + Math.abs((hash + idx * 13) % 16); // 5-20 years
    
    return {
      id: idx,
      name: `${firstNames[nameIdx]} ${lastInitials[initialIdx]}.`,
      initials: `${firstNames[nameIdx][0]}${lastInitials[initialIdx]}`,
      color: colors[colorIdx],
      location: locations[locationIdx],
      joinDate: date.toLocaleDateString('it-IT', { month: '2-digit', year: 'numeric' }),
      description: descriptions[idx],
      specializations: specializations[idx],
      rating: Math.round(rating * 10) / 10,
      reviewCount,
      jobsCompleted,
      responseTime,
      isVerified,
      isTopRated,
      hasProBadge,
      yearsExperience
    };
  });
}

export function ProfessionalsList({ cityName, serviceName, onRequestQuote }: ProfessionalsListProps) {
  const seed = cityName || serviceName || 'italia';
  const professionals = generateProfessionals(seed);
  const serviceText = serviceName || 'Idraulico';
  const locationText = cityName ? `a ${cityName}` : 'nella tua zona';
  
  // Override location with actual city if provided
  const displayProfessionals = professionals.map(p => ({
    ...p,
    location: cityName || p.location
  }));
  
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Trova {serviceText} {locationText}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Professionisti verificati pronti ad aiutarti
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-green-600">
              <Shield className="h-4 w-4" />
              <span>Garanzia Soddisfatti</span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-600">
              <CheckCircle className="h-4 w-4" />
              <span>Professionisti Verificati</span>
            </div>
            <div className="flex items-center gap-1.5 text-orange-600">
              <Zap className="h-4 w-4" />
              <span>Risposta Rapida</span>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Professionals list */}
          <div className="space-y-4 mb-8">
            {displayProfessionals.map((prof, index) => (
              <div 
                key={prof.id}
                className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/30"
              >
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className={`${prof.color} w-16 h-16 rounded-full flex items-center justify-center`}>
                      <span className="text-white font-bold text-xl">{prof.initials}</span>
                    </div>
                    {prof.isVerified && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header row */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-lg">{prof.name}</h3>
                          {prof.isTopRated && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300 text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              Top Rated
                            </Badge>
                          )}
                          {prof.hasProBadge && (
                            <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-300 text-xs">
                              PRO
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{serviceText} · {prof.location}</span>
                          <span className="mx-1">·</span>
                          <span>{prof.yearsExperience} anni esp.</span>
                        </div>
                      </div>
                      
                      {/* Rating badge */}
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-bold text-green-700">{prof.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground mt-0.5">
                          {prof.reviewCount} recensioni
                        </span>
                      </div>
                    </div>
                    
                    {/* Stats row */}
                    <div className="flex flex-wrap gap-3 mb-3 text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 text-green-500" />
                        <span>Risponde in ~{prof.responseTime} min</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <ThumbsUp className="h-3.5 w-3.5 text-blue-500" />
                        <span>{prof.jobsCompleted}+ lavori completati</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Su Idraulici Subito dal {prof.joinDate}</span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {prof.description}
                    </p>
                    
                    {/* Specializations */}
                    <div className="flex flex-wrap gap-1.5">
                      {prof.specializations.map((spec, i) => (
                        <span 
                          key={i}
                          className="text-xs bg-muted px-2 py-1 rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {index === 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <WhatsAppCTA label="Contattaci su WhatsApp" size="md" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Summary stats */}
          <div className="bg-muted/50 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Professionisti attivi</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">4.8</div>
                <div className="text-sm text-muted-foreground">Valutazione media</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">15 min</div>
                <div className="text-sm text-muted-foreground">Tempo medio risposta</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Clienti soddisfatti</div>
              </div>
            </div>
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {onRequestQuote && (
              <Button 
                onClick={onRequestQuote}
                size="lg"
                className="font-semibold"
              >
                Trova il tuo esperto
              </Button>
            )}
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
