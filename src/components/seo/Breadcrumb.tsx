import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { BASE_URL } from '@/lib/seoJsonLd';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="bg-muted/50 border-b border-border"
    >
      <div className="container mx-auto px-4">
        <ol 
          className="flex items-center gap-1 py-3 text-sm overflow-x-auto"
          itemScope 
          itemType="https://schema.org/BreadcrumbList"
        >
          {/* Home */}
          <li 
            className="flex items-center"
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            <Link 
              to="/" 
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
              itemProp="item"
            >
              <Home className="h-4 w-4" />
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const position = index + 2;
            
            return (
              <li 
                key={item.url}
                className="flex items-center"
                itemProp="itemListElement" 
                itemScope 
                itemType="https://schema.org/ListItem"
              >
                <ChevronRight className="h-4 w-4 text-muted-foreground mx-1 flex-shrink-0" />
                {isLast ? (
                  <span 
                    className="text-foreground font-medium truncate"
                    itemProp="name"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link 
                    to={item.url.replace(BASE_URL, '')} 
                    className="text-muted-foreground hover:text-primary transition-colors truncate"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.name}</span>
                  </Link>
                )}
                <meta itemProp="position" content={String(position)} />
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
