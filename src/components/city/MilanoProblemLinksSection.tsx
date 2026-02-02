/**
 * MilanoProblemLinksSection - Links to problem+city pages
 * 
 * Internal linking to specific problem pages for Milano
 */

import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';

const PROBLEM_PAGES = [
  { 
    slug: 'lavandino-intasato-milano', 
    title: 'Lavandino intasato a Milano',
    description: 'Scarico lento o bloccato? Trova un idraulico per sturare il lavandino'
  },
  { 
    slug: 'wc-intasato-milano', 
    title: 'WC intasato a Milano',
    description: 'Water che non scarica? Intervento rapido per sturare il wc'
  },
  { 
    slug: 'perdita-acqua-milano', 
    title: 'Perdita acqua a Milano',
    description: 'Tubatura che perde? Riparazione urgente perdite idriche'
  },
  { 
    slug: 'caldaia-bloccata-milano', 
    title: 'Caldaia bloccata a Milano',
    description: 'Caldaia in blocco o errore? Tecnico caldaista disponibile'
  },
  { 
    slug: 'scarico-intasato-milano', 
    title: 'Scarico intasato a Milano',
    description: 'Doccia, vasca o lavello che non scarica? Spurgo professionale'
  },
  { 
    slug: 'rubinetto-che-perde-milano', 
    title: 'Rubinetto che perde a Milano',
    description: 'Gocciolamento continuo? Riparazione o sostituzione rubinetto'
  },
];

export function MilanoProblemLinksSection() {
  return (
    <section className="py-16 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <Search className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Problemi Idraulici Specifici a Milano
              </h2>
              <p className="text-muted-foreground mt-1">
                Trova soluzioni mirate per il tuo problema
              </p>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-8 text-lg">
            Hai un problema specifico? Consulta le nostre guide dettagliate per ogni tipo 
            di emergenza idraulica a Milano con costi, tempi e consigli pratici.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {PROBLEM_PAGES.map((problem) => (
              <Link
                key={problem.slug}
                to={`/${problem.slug}`}
                className="group bg-card border border-border rounded-xl p-5 hover:border-primary hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors mb-1">
                      {problem.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {problem.description}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
          
          {/* Additional problem links */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">
              Altri problemi comuni a Milano:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { slug: 'tubo-rotto-milano', label: 'Tubo rotto' },
                { slug: 'boiler-non-scalda-milano', label: 'Boiler non scalda' },
                { slug: 'pressione-acqua-bassa-milano', label: 'Pressione bassa' },
                { slug: 'scarico-lento-milano', label: 'Scarico lento' },
              ].map((item) => (
                <Link
                  key={item.slug}
                  to={`/${item.slug}`}
                  className="bg-secondary/50 hover:bg-secondary px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
