import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  readingTime: number;
}

interface HubRelatedGuidesProps {
  categoryGuides: Guide[];
}

export function HubRelatedGuides({ categoryGuides }: HubRelatedGuidesProps) {
  return (
    <section id="guide-correlate" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-3 rounded-full">
          <BookOpen className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">Guide Specifiche</h2>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Approfondisci con le nostre guide dettagliate per ogni problema specifico:
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryGuides.map((guide) => (
          <Link key={guide.slug} to={`/guide/${guide.slug}`}>
            <Card className="h-full hover:shadow-lg transition-all hover:border-primary/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-base line-clamp-2">{guide.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {guide.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {guide.readingTime} min
                  </span>
                  <span className="text-primary font-medium flex items-center gap-1">
                    Leggi
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {categoryGuides.length === 0 && (
        <p className="text-muted-foreground text-center py-8">
          Nuove guide in arrivo per questa categoria.
        </p>
      )}
    </section>
  );
}
