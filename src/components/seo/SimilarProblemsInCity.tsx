import { Link } from 'react-router-dom';
import { AlertTriangle, ChevronRight } from 'lucide-react';

// All problems with their display names and icons
const ALL_PROBLEMS: Record<string, { name: string; icon: string }> = {
  'lavandino-intasato': { name: 'Lavandino Intasato', icon: '🪠' },
  'wc-otturato': { name: 'WC Otturato', icon: '🚽' },
  'scaldabagno-non-scalda': { name: 'Scaldabagno Non Scalda', icon: '🚿' },
  'caldaia-in-blocco': { name: 'Caldaia in Blocco', icon: '🔥' },
  'tubo-che-perde': { name: 'Tubo che Perde', icon: '💧' },
  'doccia-non-scarica': { name: 'Doccia Non Scarica', icon: '🚿' },
  'scarico-cucina-lento': { name: 'Scarico Cucina Lento', icon: '🍽️' },
  'termosifone-freddo': { name: 'Termosifone Freddo', icon: '🌡️' }
};

// Cities that have problem pages
const CITIES_WITH_PAGES = [
  'milano', 'roma', 'torino', 'napoli', 'bologna', 
  'firenze', 'genova', 'bari', 'verona', 'padova'
];

interface SimilarProblemsInCityProps {
  currentProblemSlug: string;
  citySlug: string;
  cityName: string;
}

export function SimilarProblemsInCity({ 
  currentProblemSlug, 
  citySlug, 
  cityName 
}: SimilarProblemsInCityProps) {
  // Only show for cities that have problem pages
  if (!CITIES_WITH_PAGES.includes(citySlug)) {
    return null;
  }
  
  // Get other problems for this city (exclude current problem)
  const otherProblems = Object.entries(ALL_PROBLEMS)
    .filter(([slug]) => slug !== currentProblemSlug)
    .slice(0, 4); // Limit to 4 related problems
  
  if (otherProblems.length === 0) {
    return null;
  }
  
  return (
    <section className="my-10 p-6 bg-muted/30 border border-border rounded-2xl">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-accent-foreground" />
        </div>
        <h3 className="text-xl font-bold text-foreground">
          Altri Problemi Comuni a {cityName}
        </h3>
      </div>
      
      <p className="text-muted-foreground mb-5">
        Hai un problema diverso? Consulta le nostre guide locali per {cityName}:
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {otherProblems.map(([problemSlug, problemData]) => (
          <Link
            key={problemSlug}
            to={`/${problemSlug}-${citySlug}`}
            className="group flex items-center justify-between p-4 bg-background hover:bg-primary/5 border border-border hover:border-primary/30 rounded-xl transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{problemData.icon}</span>
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                {problemData.name}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </Link>
        ))}
      </div>
      
      {/* Link to main city page */}
      <div className="mt-5 pt-4 border-t border-border">
        <Link
          to={`/${citySlug}-idraulico`}
          className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
        >
          Vedi tutti i servizi idraulici a {cityName}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
