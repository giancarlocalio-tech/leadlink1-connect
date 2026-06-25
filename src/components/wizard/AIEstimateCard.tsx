import { Loader2, AlertTriangle, Clock, Euro, Wrench, Sparkles, Flame } from 'lucide-react';
import type { AIEstimate } from '@/hooks/useAIEstimate';

interface AIEstimateCardProps {
  estimate: AIEstimate | null;
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
}

const URGENCY_STYLES: Record<string, { label: string; className: string; icon: string }> = {
  bassa: { label: 'Bassa', className: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: '🟢' },
  media: { label: 'Media', className: 'bg-amber-100 text-amber-800 border-amber-300', icon: '🟡' },
  alta: { label: 'Alta', className: 'bg-orange-100 text-orange-800 border-orange-300', icon: '🟠' },
  critica: { label: 'Critica', className: 'bg-red-100 text-red-800 border-red-300', icon: '🔴' },
};

function formatHours(h: number) {
  if (h < 1) return `${Math.round(h * 60)} min`;
  if (Number.isInteger(h)) return `${h}h`;
  return `${h.toFixed(1).replace('.', ',')}h`;
}

export function AIEstimateCard({ estimate, loading, error, onRetry }: AIEstimateCardProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/30 p-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
        </div>
        <h3 className="text-lg font-bold mb-2">🔍 Analizzo il tuo problema…</h3>
        <p className="text-sm text-muted-foreground">
          L'AI sta valutando descrizione, foto e zona per darti una stima realistica. Ci vogliono ~15 secondi.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
        <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-3" />
        <p className="text-sm font-medium mb-3">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-sm font-medium text-primary hover:underline"
          >
            Riprova
          </button>
        )}
        <p className="text-xs text-muted-foreground mt-3">
          Puoi comunque continuare e ricevere preventivi reali dagli idraulici.
        </p>
      </div>
    );
  }

  if (!estimate) return null;

  const urgency = URGENCY_STYLES[estimate.urgencyLevel?.toLowerCase()] || URGENCY_STYLES.media;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header con prezzo */}
      <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/40 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-wide text-primary">
            Stima AI istantanea
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <Euro className="h-3 w-3" /> Prezzo orientativo
            </div>
            <div className="text-2xl font-bold text-foreground">
              {estimate.priceMin}–{estimate.priceMax}€
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <Clock className="h-3 w-3" /> Tempo intervento
            </div>
            <div className="text-2xl font-bold text-foreground">
              {formatHours(estimate.durationMinHours)}–{formatHours(estimate.durationMaxHours)}
            </div>
          </div>
        </div>
      </div>

      {/* Diagnosi */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
          🩺 Diagnosi probabile
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {estimate.diagnosis}
        </p>
      </div>

      {/* Steps idraulico */}
      {estimate.plumberSteps?.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-4">
          <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
            <Wrench className="h-4 w-4" /> Cosa farà l'idraulico
          </h4>
          <ul className="space-y-2">
            {estimate.plumberSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Urgenza */}
      <div className={`rounded-lg border p-4 ${urgency.className}`}>
        <div className="flex items-center gap-2 mb-1">
          <Flame className="h-4 w-4" />
          <span className="text-sm font-bold">Urgenza: {urgency.label} {urgency.icon}</span>
        </div>
        <p className="text-sm leading-relaxed">{estimate.urgencyReason}</p>
      </div>

      {/* Rischio se rimandi */}
      {estimate.riskIfPostponed && (
        <div className="rounded-lg border border-orange-300 bg-orange-50 p-4">
          <h4 className="text-sm font-bold text-orange-900 mb-1 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" /> ⚠️ Se rimandi
          </h4>
          <p className="text-sm text-orange-800 leading-relaxed">
            {estimate.riskIfPostponed}
          </p>
        </div>
      )}

      {estimate.notes && (
        <p className="text-xs text-muted-foreground italic">💡 {estimate.notes}</p>
      )}

      <div className="text-xs text-muted-foreground bg-muted/40 rounded-lg p-3 leading-relaxed">
        <strong>Stima orientativa</strong> generata da AI sulla base delle informazioni fornite. Il prezzo definitivo verrà confermato dall'idraulico dopo sopralluogo. Affidabilità stima: {Math.round((estimate.confidence ?? 0.6) * 100)}%.
      </div>
    </div>
  );
}
