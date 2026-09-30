import { TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const reasons = [
  {
    title: 'Le perdite peggiorano',
    description: 'Una piccola goccia oggi può diventare un allagamento domani.'
  },
  {
    title: 'I danni aumentano',
    description: 'Muffa, pavimenti rovinati e mobili danneggiati costano molto di più della riparazione.'
  },
  {
    title: 'Il costo cresce',
    description: 'Un intervento semplice oggi può richiedere lavori complessi tra una settimana.'
  }
];

export function WaitingCostsSection() {
  return (
    <section className="py-12 bg-destructive/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-destructive/10 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold">
              Perché Aspettare Può Costarti di Più
            </h2>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Rimandare un intervento idraulico spesso peggiora la situazione e aumenta i costi finali.
          </p>
          
          <div className="grid gap-4">
            {reasons.map((reason, index) => (
              <Card key={index} className="border-destructive/20">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="bg-destructive/10 p-2 rounded-full shrink-0">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground">{reason.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <p className="mt-6 p-4 bg-primary/10 rounded-lg text-center font-medium">
            💡 Intervenire subito è quasi sempre la scelta più economica.
          </p>
        </div>
      </div>
    </section>
  );
}
