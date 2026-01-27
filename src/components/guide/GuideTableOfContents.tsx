/**
 * GuideTableOfContents - Navigation for guide sections
 * 
 * Displays all mandatory H2 sections with anchor links.
 * Responsive design for mobile and desktop.
 */

import { Card, CardContent } from '@/components/ui/card';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Phone, 
  Euro, 
  MapPin,
  MessageCircleQuestion,
  LucideIcon
} from 'lucide-react';

export interface TocItem {
  id: string;
  title: string;
  icon: LucideIcon;
}

interface GuideTableOfContentsProps {
  items: TocItem[];
  showFAQ?: boolean;
}

export function GuideTableOfContents({ items, showFAQ = false }: GuideTableOfContentsProps) {
  const allItems = showFAQ 
    ? [...items, { id: 'faq-ai', title: 'Domande Frequenti', icon: MessageCircleQuestion }]
    : items;

  return (
    <Card className="bg-muted/50">
      <CardContent className="p-4 md:p-6">
        <h2 className="font-semibold mb-4 text-base md:text-lg">📋 Indice della Guida</h2>
        <nav aria-label="Table of contents">
          <ul className="space-y-2">
            {allItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`} 
                    className="text-primary hover:underline flex items-center gap-2 text-sm md:text-base py-1"
                  >
                    <IconComponent className="h-4 w-4 shrink-0" />
                    <span className="line-clamp-1">{item.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </CardContent>
    </Card>
  );
}

// Default TOC items for standard guide structure
export const DEFAULT_TOC_ITEMS: TocItem[] = [
  { id: 'quanto-grave', title: 'È un\'emergenza o posso aspettare?', icon: AlertTriangle },
  { id: 'cosa-fare-subito', title: 'Cosa puoi fare SUBITO', icon: CheckCircle },
  { id: 'cosa-non-fare', title: 'Cosa NON devi fare', icon: XCircle },
  { id: 'quando-chiamare', title: 'Quando serve un idraulico', icon: Phone },
  { id: 'costi-riparazione', title: 'Quanto può costare', icon: Euro },
  { id: 'trova-idraulico', title: 'Trova idraulico nella tua zona', icon: MapPin },
];
