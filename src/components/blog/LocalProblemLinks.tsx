import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

// Mapping article slug keywords to problem-city page slugs
const ARTICLE_TO_PROBLEM_MAP: Record<string, { problemSlug: string; cities: string[] }> = {
  // Lavandino intasato
  'lavandino-intasato': {
    problemSlug: 'lavandino-intasato',
    cities: ['milano', 'roma', 'torino', 'napoli', 'bologna', 'firenze', 'genova', 'bari', 'verona', 'padova']
  },
  'sturare-lavandino': {
    problemSlug: 'lavandino-intasato',
    cities: ['milano', 'roma', 'torino', 'napoli', 'bologna', 'firenze', 'genova', 'bari', 'verona', 'padova']
  },
  // WC otturato
  'wc-otturato': {
    problemSlug: 'wc-otturato',
    cities: ['milano', 'roma', 'torino', 'napoli', 'bologna', 'firenze', 'genova', 'bari', 'palermo', 'catania']
  },
  'wc-intasato': {
    problemSlug: 'wc-otturato',
    cities: ['milano', 'roma', 'torino', 'napoli', 'bologna', 'firenze', 'genova', 'bari', 'palermo', 'catania']
  },
  'sturare-wc': {
    problemSlug: 'wc-otturato',
    cities: ['milano', 'roma', 'torino', 'napoli', 'bologna', 'firenze', 'genova', 'bari', 'palermo', 'catania']
  },
  // Scaldabagno
  'scaldabagno': {
    problemSlug: 'scaldabagno-non-scalda',
    cities: ['milano', 'roma', 'torino', 'napoli', 'bologna', 'firenze', 'genova', 'bari', 'verona', 'venezia']
  },
  'boiler': {
    problemSlug: 'scaldabagno-non-scalda',
    cities: ['milano', 'roma', 'torino', 'napoli', 'bologna', 'firenze', 'genova', 'bari', 'verona', 'venezia']
  },
  // Caldaia
  'caldaia': {
    problemSlug: 'caldaia-in-blocco',
    cities: ['milano', 'roma', 'torino', 'napoli', 'bologna', 'firenze', 'genova', 'bari', 'verona', 'trieste']
  },
  'manutenzione-caldaia': {
    problemSlug: 'caldaia-in-blocco',
    cities: ['milano', 'roma', 'torino', 'napoli', 'bologna', 'firenze', 'genova', 'bari', 'verona', 'trieste']
  },
  // Tubo che perde
  'tubo': {
    problemSlug: 'tubo-che-perde',
    cities: ['milano', 'roma', 'torino', 'napoli', 'bologna', 'firenze', 'genova', 'bari', 'verona', 'modena']
  },
  'perdita': {
    problemSlug: 'tubo-che-perde',
    cities: ['milano', 'roma', 'torino', 'napoli', 'bologna', 'firenze', 'genova', 'bari', 'verona', 'modena']
  },
  'allagamento': {
    problemSlug: 'tubo-che-perde',
    cities: ['milano', 'roma', 'torino', 'napoli', 'bologna', 'firenze', 'genova', 'bari', 'verona', 'modena']
  },
  // Doccia
  'doccia': {
    problemSlug: 'doccia-non-scarica',
    cities: ['milano', 'roma', 'torino', 'napoli', 'bologna', 'firenze', 'genova', 'bari', 'verona', 'parma']
  },
  // Scarico cucina
  'scarico-cucina': {
    problemSlug: 'scarico-cucina-lento',
    cities: ['milano', 'roma', 'torino', 'napoli', 'bologna', 'firenze', 'genova', 'bari', 'verona', 'reggio-emilia']
  },
  // Termosifone
  'termosifone': {
    problemSlug: 'termosifone-freddo',
    cities: ['milano', 'roma', 'torino', 'napoli', 'bologna', 'firenze', 'genova', 'bari', 'verona', 'bergamo']
  },
  'sfiatare': {
    problemSlug: 'termosifone-freddo',
    cities: ['milano', 'roma', 'torino', 'napoli', 'bologna', 'firenze', 'genova', 'bari', 'verona', 'bergamo']
  }
};

// City display names
const CITY_NAMES: Record<string, string> = {
  'milano': 'Milano',
  'roma': 'Roma',
  'torino': 'Torino',
  'napoli': 'Napoli',
  'bologna': 'Bologna',
  'firenze': 'Firenze',
  'genova': 'Genova',
  'bari': 'Bari',
  'verona': 'Verona',
  'padova': 'Padova',
  'palermo': 'Palermo',
  'catania': 'Catania',
  'venezia': 'Venezia',
  'trieste': 'Trieste',
  'modena': 'Modena',
  'parma': 'Parma',
  'reggio-emilia': 'Reggio Emilia',
  'bergamo': 'Bergamo'
};

// Problem display names for titles
const PROBLEM_TITLES: Record<string, string> = {
  'lavandino-intasato': 'Lavandino Intasato',
  'wc-otturato': 'WC Otturato',
  'scaldabagno-non-scalda': 'Scaldabagno Non Scalda',
  'caldaia-in-blocco': 'Caldaia in Blocco',
  'tubo-che-perde': 'Tubo che Perde',
  'doccia-non-scarica': 'Doccia Non Scarica',
  'scarico-cucina-lento': 'Scarico Cucina Lento',
  'termosifone-freddo': 'Termosifone Freddo'
};

interface LocalProblemLinksProps {
  articleSlug: string;
  articleTitle: string;
}

export function LocalProblemLinks({ articleSlug, articleTitle }: LocalProblemLinksProps) {
  // Find matching problem based on article slug or title keywords
  let matchedProblem: { problemSlug: string; cities: string[] } | null = null;
  
  const slugLower = articleSlug.toLowerCase();
  const titleLower = articleTitle.toLowerCase();
  
  for (const [keyword, problemData] of Object.entries(ARTICLE_TO_PROBLEM_MAP)) {
    if (slugLower.includes(keyword) || titleLower.includes(keyword)) {
      matchedProblem = problemData;
      break;
    }
  }
  
  // No matching problem pages
  if (!matchedProblem) {
    return null;
  }
  
  const problemTitle = PROBLEM_TITLES[matchedProblem.problemSlug] || 'questo problema';
  
  return (
    <section className="my-10 p-6 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent border border-primary/20 rounded-2xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">
          Cerchi un Idraulico nella Tua Città?
        </h3>
      </div>
      
      <p className="text-muted-foreground mb-5">
        Se hai problemi di <strong>{problemTitle.toLowerCase()}</strong> e hai bisogno di un professionista, 
        consulta le nostre guide locali:
      </p>
      
      <div className="flex flex-wrap gap-2">
        {matchedProblem.cities.slice(0, 8).map((citySlug) => (
          <Link
            key={citySlug}
            to={`/${matchedProblem!.problemSlug}-${citySlug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-background hover:bg-primary/10 border border-border hover:border-primary/30 rounded-full text-sm font-medium text-foreground transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-primary" />
            {CITY_NAMES[citySlug] || citySlug}
          </Link>
        ))}
      </div>
      
      {matchedProblem.cities.length > 8 && (
        <p className="text-sm text-muted-foreground mt-3">
          + altre {matchedProblem.cities.length - 8} città disponibili
        </p>
      )}
    </section>
  );
}
