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
    <Card className="bg-card/50 border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label={title}>
            {icon}
          </span>
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Metodo {number}
            </span>
            <h3 className="text-lg font-semibold text-foreground">
              {title}
            </h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
        <ul className="space-y-2">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-foreground">{step}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
