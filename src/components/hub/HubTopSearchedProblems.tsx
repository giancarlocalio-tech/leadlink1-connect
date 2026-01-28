import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Search, ArrowRight } from 'lucide-react';
import { TopSearchedProblem } from '@/lib/hubPagesData';

interface HubTopSearchedProblemsProps {
  problems: TopSearchedProblem[];
  categoryName: string;
}

export function HubTopSearchedProblems({ problems, categoryName }: HubTopSearchedProblemsProps) {
  return (
    <section id="problemi-cercati" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-500/10 p-3 rounded-full">
          <Search className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">
          I Problemi Più Cercati su {categoryName}
        </h2>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Questi sono i problemi specifici più ricercati dagli utenti. Clicca per trovare la guida dettagliata:
      </p>

      <div className="grid sm:grid-cols-2 gap-3">
        {problems.map((problem, index) => (
          <Link 
            key={index} 
            to={`/guide/${problem.guideSlug}`}
            className="group"
          >
            <Card className="h-full hover:shadow-md hover:border-primary/30 transition-all">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {problem.title}
                  </h3>
                  {problem.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {problem.description}
                    </p>
                  )}
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-3" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
