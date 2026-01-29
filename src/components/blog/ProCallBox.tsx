import { AlertCircle } from 'lucide-react';

interface ProCallBoxProps {
  title?: string;
  children: React.ReactNode;
}

export function ProCallBox({ title = "Quando è il momento di chiamare un professionista", children }: ProCallBoxProps) {
  return (
    <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 my-8">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
            🚨 {title}
          </h3>
          <div className="text-muted-foreground leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
