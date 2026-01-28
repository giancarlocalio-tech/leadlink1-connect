import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home } from 'lucide-react';

export function HubFinalCTA() {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-primary/10 p-3 rounded-full">
          <Home className="h-8 w-8 text-primary" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">
        Hai Uno di Questi Problemi in Casa?
      </h2>
      
      <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
        Puoi parlare con un idraulico professionista nella tua zona e ricevere un intervento rapido. 
        Confronta preventivi gratuiti e scegli in totale libertà.
      </p>
      
      <Link to="/richiesta">
        <Button size="lg">
          Trova un Idraulico Ora
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </Link>
    </section>
  );
}
