import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface RelatedGuide {
  slug: string;
  title: string;
}

interface RelatedGuidesSectionProps {
  guides: RelatedGuide[];
}

export function RelatedGuidesSection({ guides }: RelatedGuidesSectionProps) {
  if (!guides || guides.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-secondary p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h2 className="text-2xl font-bold">
              Scopri Cosa Fare Prima dell'Intervento
            </h2>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Leggi le nostre guide pratiche per capire meglio il problema e prepararti all'intervento.
          </p>
          
          <div className="grid gap-3">
            {guides.map((guide) => (
              <Link key={guide.slug} to={`/guide/${guide.slug}`}>
                <Card className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span className="font-medium">{guide.title}</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
