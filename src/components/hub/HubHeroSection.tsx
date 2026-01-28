import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { HubPage } from '@/lib/hubPagesData';

interface HubHeroSectionProps {
  hub: HubPage;
  CategoryIcon: React.ComponentType<{ className?: string }>;
}

export function HubHeroSection({ hub, CategoryIcon }: HubHeroSectionProps) {
  return (
    <section className="py-10 md:py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/guide" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            Tutte le Guide
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <CategoryIcon className="h-8 w-8 text-primary" />
            </div>
            <Badge variant="secondary" className="text-sm">Hub Tematico</Badge>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {hub.h1}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            {hub.intro}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/richiesta">
              <Button size="lg">
                Richiedi Preventivo Gratuito
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <a href="#guide-correlate">
              <Button size="lg" variant="outline">
                Vedi Guide Specifiche
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
