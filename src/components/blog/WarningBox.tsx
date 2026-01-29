import { AlertTriangle } from 'lucide-react';

interface WarningBoxProps {
  title?: string;
  children: React.ReactNode;
}

export function WarningBox({ title = "Attenzione", children }: WarningBoxProps) {
  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700 rounded-xl p-5 my-6">
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
            ⚠️ {title}
          </h4>
          <div className="text-amber-700 dark:text-amber-400/90 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
