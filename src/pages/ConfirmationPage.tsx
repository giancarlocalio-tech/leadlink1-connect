import { Link } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';

export default function ConfirmationPage() {
  return (
    <Layout>
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="bg-success/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              La tua richiesta è stata inviata correttamente
            </h1>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Gli idraulici della tua zona visualizzeranno la richiesta e potranno contattarti direttamente al numero di telefono che hai fornito.
            </p>

            <div className="bg-accent/50 rounded-lg p-4 mb-8">
              <p className="text-sm text-foreground">
                <strong>Nota:</strong> La piattaforma facilita il contatto tra te e gli idraulici. Il pagamento e gli accordi sono diretti tra te e il professionista scelto.
              </p>
            </div>

            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto">
                <Home className="h-4 w-4 mr-2" />
                Torna alla Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
