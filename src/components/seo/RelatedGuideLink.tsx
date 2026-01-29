import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';

// Map problem slugs to related blog articles
const PROBLEM_TO_GUIDE_MAP: Record<string, { slug: string; title: string }> = {
  'lavandino-intasato': {
    slug: 'sturare-lavandino-cucina-bagno',
    title: 'Guida Completa: Come Sturare un Lavandino'
  },
  'wc-otturato': {
    slug: 'wc-otturato-cosa-fare',
    title: 'WC Otturato: Guida Completa per Risolvere il Problema'
  },
  'scaldabagno-non-scalda': {
    slug: 'scaldabagno-non-funziona-cosa-fare',
    title: 'Scaldabagno Non Funziona: Cause e Soluzioni'
  },
  'caldaia-in-blocco': {
    slug: 'caldaia-in-blocco-cosa-fare',
    title: 'Caldaia in Blocco: Come Risolvere'
  },
  'tubo-che-perde': {
    slug: 'perdita-acqua-cosa-fare',
    title: 'Perdita d\'Acqua: Guida Completa all\'Intervento'
  },
  'doccia-non-scarica': {
    slug: 'scarico-doccia-intasato-soluzioni',
    title: 'Scarico Doccia Intasato: Cause e Rimedi'
  },
  'scarico-cucina-lento': {
    slug: 'scarico-cucina-intasato',
    title: 'Scarico Cucina Intasato: Come Liberarlo'
  },
  'termosifone-freddo': {
    slug: 'termosifone-freddo-cosa-fare',
    title: 'Termosifone Freddo: Cause e Soluzioni'
  }
};

interface RelatedGuideLinkProps {
  problemSlug: string;
  problemName: string;
}

export function RelatedGuideLink({ problemSlug, problemName }: RelatedGuideLinkProps) {
  const guideData = PROBLEM_TO_GUIDE_MAP[problemSlug];
  
  if (!guideData) {
    return null;
  }
  
  return (
    <section className="my-8">
      <Link
        to={`/blog/${guideData.slug}`}
        className="group flex items-center justify-between p-5 bg-gradient-to-r from-primary/5 via-primary/3 to-transparent border border-primary/20 hover:border-primary/40 rounded-xl transition-all duration-300 hover:shadow-md"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-0.5">
              Approfondisci il problema
            </p>
            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {guideData.title}
            </p>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </Link>
    </section>
  );
}
