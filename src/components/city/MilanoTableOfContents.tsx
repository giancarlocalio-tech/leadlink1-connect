/**
 * MilanoTableOfContents - Anchor-based Table of Contents
 * 
 * Improves UX and increases chances of featured snippets
 */

import { List, ChevronRight } from 'lucide-react';

const SECTIONS = [
  { id: 'intro', label: 'Perché scegliere IdrauliciSubito' },
  { id: 'statistiche', label: 'I Numeri del Servizio' },
  { id: 'perche-problemi', label: 'Perché i Problemi Idraulici sono Frequenti' },
  { id: 'quartieri', label: 'Quartieri Serviti a Milano' },
  { id: 'tipologie-edifici', label: 'Tipologie di Edifici' },
  { id: 'problemi-comuni', label: 'Problemi Più Comuni' },
  { id: 'tempi-risposta', label: 'Tempi di Risposta' },
  { id: 'costi', label: 'Costi Medi a Milano' },
  { id: 'recensioni', label: 'Recensioni Clienti' },
  { id: 'emergenze', label: 'Consigli per le Emergenze' },
  { id: 'faq', label: 'Domande Frequenti' },
];

export function MilanoTableOfContents() {
  return (
    <nav 
      className="py-8 bg-accent/30 border-y border-border"
      aria-label="Indice dei contenuti"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <List className="h-5 w-5 text-primary" />
            <h2 className="font-bold text-lg">Contenuti di questa guida</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1.5 group"
              >
                <ChevronRight className="h-4 w-4 text-primary/50 group-hover:text-primary transition-colors" />
                <span>{section.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
