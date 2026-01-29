import { AlertTriangle } from 'lucide-react';

interface WarningBoxProps {
  title?: string;
  children: React.ReactNode;
}

export function WarningBox({ title = "Attenzione", children }: WarningBoxProps) {
  return (
    <div className="bg-gradient-to-br from-amber-50 via-amber-100/50 to-amber-50 dark:from-amber-950/30 dark:via-amber-900/20 dark:to-amber-950/30 border border-amber-300 dark:border-amber-700 rounded-2xl p-5 md:p-6 my-8 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
          <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="space-y-2">
          <h4 className="font-bold text-amber-800 dark:text-amber-300 text-lg">
            ⚠️ {title}
          </h4>
          <div className="text-amber-700 dark:text-amber-400/90 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
