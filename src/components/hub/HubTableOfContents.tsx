import { BookOpen } from 'lucide-react';

export function HubTableOfContents() {
  return (
    <section className="py-6 border-b">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <details className="group" open>
            <summary className="cursor-pointer text-sm font-semibold flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Indice dei Contenuti
            </summary>
            <nav className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
              <a href="#panoramica" className="text-muted-foreground hover:text-primary">→ Panoramica</a>
              <a href="#problemi-cercati" className="text-muted-foreground hover:text-primary">→ Problemi Più Cercati</a>
              <a href="#problemi-comuni" className="text-muted-foreground hover:text-primary">→ Problemi Comuni</a>
              <a href="#quando-preoccuparsi" className="text-muted-foreground hover:text-primary">→ Quando Preoccuparsi</a>
              <a href="#prevenzione" className="text-muted-foreground hover:text-primary">→ Prevenzione</a>
              <a href="#costi" className="text-muted-foreground hover:text-primary">→ Costi Indicativi</a>
              <a href="#faq" className="text-muted-foreground hover:text-primary">→ Domande Frequenti</a>
              <a href="#guide-correlate" className="text-muted-foreground hover:text-primary">→ Guide Specifiche</a>
              <a href="#trova-idraulico" className="text-muted-foreground hover:text-primary">→ Trova Idraulico</a>
            </nav>
          </details>
        </div>
      </div>
    </section>
  );
}
