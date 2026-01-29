import { AlertCircle } from 'lucide-react';

interface ProCallBoxProps {
  title?: string;
  children: React.ReactNode;
}

export function ProCallBox({ title = "Quando è il momento di chiamare un professionista", children }: ProCallBoxProps) {
  return (
    <div className="bg-gradient-to-br from-destructive/5 via-destructive/10 to-destructive/5 border border-destructive/20 rounded-2xl p-6 md:p-8 my-10 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="h-7 w-7 text-destructive" />
        </div>
        <div className="space-y-3">
          <h3 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
            🚨 {title}
          </h3>
          <div className="text-muted-foreground leading-relaxed text-base md:text-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
