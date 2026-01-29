import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wrench } from 'lucide-react';

interface FinalCTABoxProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export function FinalCTABox({ 
  title = "Non si è ancora sturato?",
  description = "Il problema potrebbe essere più profondo. Trova subito un idraulico qualificato vicino a te.",
  buttonText = "TROVA UN IDRAULICO ORA",
  buttonLink = "/richiesta"
}: FinalCTABoxProps) {
  return (
    <div className="bg-primary/10 border-2 border-primary/30 rounded-2xl p-8 my-10 text-center">
      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">
        {description}
      </p>
      <Link to={buttonLink}>
        <Button size="lg" className="text-lg px-8 py-6 h-auto font-semibold shadow-lg hover:shadow-xl transition-all">
          <Wrench className="h-5 w-5 mr-2" />
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}
