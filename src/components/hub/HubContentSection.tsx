import { LucideIcon } from 'lucide-react';

interface HubContentSectionProps {
  id: string;
  icon: LucideIcon;
  iconColorClass: string;
  title: string;
  htmlContent: string;
}

export function HubContentSection({ 
  id, 
  icon: Icon, 
  iconColorClass, 
  title, 
  htmlContent 
}: HubContentSectionProps) {
  const [bgColor, textColor] = iconColorClass.split(' ');
  
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className={`${bgColor} p-3 rounded-full`}>
          <Icon className={`h-6 w-6 ${textColor}`} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      </div>
      <div 
        className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </section>
  );
}
