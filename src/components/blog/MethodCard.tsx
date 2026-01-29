import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface MethodCardProps {
  icon: string;
  number: number;
  title: string;
  description: string;
  steps: string[];
}

export function MethodCard({ icon, number, title, description, steps }: MethodCardProps) {
  return (
    <Card className="bg-card/50 border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-4">
          <div className="shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <span className="text-3xl" role="img" aria-label={title}>
              {icon}
            </span>
          </div>
          <div>
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              Metodo {number}
            </span>
            <h3 className="text-lg font-bold text-foreground leading-tight">
              {title}
            </h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {description && (
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
        {steps.length > 0 && (
          <ul className="space-y-2.5 bg-muted/30 rounded-lg p-4">
            {steps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-foreground leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
