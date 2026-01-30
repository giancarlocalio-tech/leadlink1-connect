/**
 * CityCommonProblemsSection - Local problems with internal links
 * 
 * H2: Problemi idraulici più frequenti a [Città]
 * - 5 problem blocks with local context
 * - Links to problem+city pages
 */

import { Link } from 'react-router-dom';
import { AlertTriangle, Droplets, Wrench, Flame, ShowerHead, ArrowRight } from 'lucide-react';

interface CityCommonProblemsSectionProps {
  cityName: string;
  citySlug: string;
}

// Problems with city-specific context
const getProblemsForCity = (cityName: string, citySlug: string) => {
  const cityContext: Record<string, { housing: string; water: string; climate: string }> = {
    'milano': { housing: 'condomini storici del centro e palazzi anni \'60-\'80', water: 'acqua dura e calcarea', climate: 'inverni rigidi' },
    'roma': { housing: 'palazzi storici e costruzioni moderne', water: 'tubature in piombo nei quartieri storici', climate: 'escursioni termiche' },
    'napoli': { housing: 'edifici storici del centro e condomini', water: 'pressione variabile', climate: 'umidità costiera' },
    'torino': { housing: 'palazzi sabaudi e costruzioni industriali', water: 'acqua alpina', climate: 'inverni molto freddi' },
    'bologna': { housing: 'edifici storici sotto i portici', water: 'calcare medio-alto', climate: 'umidità padana' },
    'firenze': { housing: 'palazzi rinascimentali e ville collinari', water: 'acqua medio-dura', climate: 'estati calde' },
    'genova': { housing: 'caruggi e palazzi storici', water: 'umidità marina che corrode', climate: 'ambiente salino' },
    'palermo': { housing: 'palazzi arabo-normanni e condomini', water: 'pressione irregolare', climate: 'caldo estivo intenso' },
  };

  const context = cityContext[citySlug] || { 
    housing: 'edifici residenziali di varie epoche', 
    water: 'durezza dell\'acqua locale', 
    climate: 'condizioni climatiche locali' 
  };

  return [
    {
      icon: Droplets,
      title: 'Perdite d\'acqua',
      slug: 'tubo-che-perde',
      description: `Le perdite d'acqua sono molto comuni a ${cityName}, specialmente nei ${context.housing}. Tubature datate e giunzioni usurate causano infiltrazioni che possono danneggiare strutture e mobili.`
    },
    {
      icon: Wrench,
      title: 'Lavandino intasato',
      slug: 'lavandino-intasato',
      description: `I lavandini intasati a ${cityName} sono spesso causati da ${context.water} che deposita calcare nei sifoni. Residui di sapone e capelli aggravano il problema.`
    },
    {
      icon: ShowerHead,
      title: 'WC otturato',
      slug: 'wc-otturato',
      description: `Il WC otturato è un'emergenza frequente a ${cityName}, soprattutto nei condomini con colonne di scarico condivise. Richiede intervento rapido per evitare risalite.`
    },
    {
      icon: Flame,
      title: 'Caldaia in blocco',
      slug: 'caldaia-in-blocco',
      description: `Con gli ${context.climate}, la caldaia in blocco è un problema urgente a ${cityName}. Mancanza di manutenzione e pressione bassa sono le cause più comuni.`
    },
    {
      icon: Wrench,
      title: 'Scaldabagno che non scalda',
      slug: 'scaldabagno-non-scalda',
      description: `A ${cityName}, gli scaldabagni soffrono per ${context.water}. Il calcare riduce l'efficienza e può causare guasti improvvisi.`
    }
  ];
};

export function CityCommonProblemsSection({ cityName, citySlug }: CityCommonProblemsSectionProps) {
  const problems = getProblemsForCity(cityName, citySlug);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-primary" />
            Problemi Idraulici Più Frequenti a {cityName}
          </h2>
          
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Ecco i problemi idraulici più comuni che richiedono l'intervento di un professionista a {cityName}. 
            Per ognuno abbiamo creato una guida specifica con consigli e costi indicativi.
          </p>
          
          <div className="space-y-4">
            {problems.map((problem, index) => (
              <div 
                key={index} 
                className="bg-card border border-border rounded-xl p-5 hover:border-primary transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-3 shrink-0">
                    <problem.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{problem.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {problem.description}
                    </p>
                    <Link 
                      to={`/${problem.slug}-${citySlug}`}
                      className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:underline"
                    >
                      Guida: {problem.title} a {cityName}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
