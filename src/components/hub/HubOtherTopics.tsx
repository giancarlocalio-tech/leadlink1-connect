import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface HubOtherTopicsProps {
  currentSlug: string;
}

const HUB_SLUGS = [
  'perdite-acqua',
  'scarichi-intasati', 
  'caldaia-e-riscaldamento',
  'problemi-sanitari',
  'emergenze-idrauliche'
];

export function HubOtherTopics({ currentSlug }: HubOtherTopicsProps) {
  const formatSlugToName = (slug: string): string => {
    return slug
      .replace('-e-', ' e ')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  const otherHubs = HUB_SLUGS.filter(slug => slug !== currentSlug);

  return (
    <section className="py-10 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold mb-6 text-center">Esplora Altri Argomenti</h2>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {otherHubs.map(slug => (
            <Link key={slug} to={`/guide/${slug}`}>
              <Badge 
                variant="outline" 
                className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
              >
                {formatSlugToName(slug)}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
