/**
 * GuideSection - Reusable section component for guides
 * 
 * Renders a structured H2 section with icon, title, and HTML content.
 */

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GuideSectionProps {
  id: string;
  title: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconTextColor?: string;
  content: string;
  className?: string;
  children?: React.ReactNode;
}

export function GuideSection({
  id,
  title,
  icon: Icon,
  iconBgColor = 'bg-primary/20',
  iconTextColor = 'text-primary',
  content,
  className = '',
  children
}: GuideSectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <div className="flex items-center gap-3 mb-6">
        <div className={cn("p-3 rounded-full", iconBgColor, iconTextColor)}>
          <Icon className="h-6 w-6" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
      </div>
      
      <div 
        className="prose prose-sm md:prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      {children}
    </section>
  );
}
