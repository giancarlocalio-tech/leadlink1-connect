/**
 * GuideRelatedContent - Related guides and pricing pages
 * 
 * Internal linking section for SEO and user navigation.
 */

import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Euro } from 'lucide-react';
import type { Guide } from '@/lib/guideData';

interface GuideRelatedContentProps {
  relatedGuides: Guide[];
  relatedPricingPage?: {
    slug: string;
    title: string;
  };
  categoryName?: string;
}

export function GuideRelatedContent({ 
  relatedGuides, 
  relatedPricingPage,
  categoryName = 'Guide'
}: GuideRelatedContentProps) {
  if (relatedGuides.length === 0 && !relatedPricingPage) {
    return null;
  }

  return (
    <section className="py-12 bg-muted/30 -mx-4 px-4 rounded-xl">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Approfondimenti Correlati</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Related pricing page - always first */}
          {relatedPricingPage && (
            <Link to={relatedPricingPage.slug}>
              <Card className="h-full hover:shadow-lg transition-shadow border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Euro className="h-5 w-5 text-primary" />
                    <Badge variant="secondary">Costi</Badge>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">{relatedPricingPage.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Scopri i costi indicativi per questo tipo di intervento.
                  </p>
                </CardContent>
              </Card>
            </Link>
          )}
          
          {/* Related guides */}
          {relatedGuides.slice(0, relatedPricingPage ? 2 : 3).map((guide) => (
            <Link key={guide.slug} to={`/guide/${guide.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <Badge variant="outline">{categoryName}</Badge>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">{guide.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{guide.excerpt}</p>
                  <p className="text-xs text-muted-foreground mt-3">{guide.readingTime} min di lettura</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
