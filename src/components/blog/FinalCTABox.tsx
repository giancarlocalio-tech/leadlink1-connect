import { ArticleRequestForm } from './ArticleRequestForm';
import { Wrench } from 'lucide-react';

interface FinalCTABoxProps {
  title?: string;
  description?: string;
  interventionType?: string;
  problemContext?: string;
}

export function FinalCTABox({ 
  title = "Hai bisogno di un professionista?",
  description = "Trova subito un idraulico qualificato nella tua zona per un intervento rapido e risolutivo.",
  interventionType = 'altro',
  problemContext = ''
}: FinalCTABoxProps) {
  return (
    <div className="bg-gradient-to-br from-primary/10 via-primary/15 to-primary/10 border-2 border-primary/30 rounded-2xl p-6 md:p-8 my-10 shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="shrink-0 w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
          <Wrench className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-foreground">
            🔧 {title}
          </h3>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
      
      <ArticleRequestForm
        title=""
        description=""
        interventionType={interventionType}
        problemContext={problemContext}
        compact
      />
    </div>
  );
}
