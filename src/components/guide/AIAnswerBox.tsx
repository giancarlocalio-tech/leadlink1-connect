/**
 * AI Answer Box — Componente ottimizzato per AI Overviews / GEO.
 *
 * Posizionato in cima all'articolo, fornisce:
 *  - Risposta diretta in 40-80 parole (formato preferito da Google AI)
 *  - Stats citabili (tempo, costo, difficoltà)
 *  - Steps numerati brevi
 *
 * SEO/GEO note:
 *  - Usa <h2> con id="risposta-rapida" per essere citabile come ancora
 *  - Markup semantico (<dl>, <ol>) per estrazione strutturata
 *  - Niente JS interattivo: tutto SSR-friendly e crawler-friendly
 */

import { Clock, Wrench, Wallet, AlertCircle, Sparkles } from 'lucide-react';
import type { QuickAnswer } from '@/lib/guideQuickAnswers';

interface AIAnswerBoxProps {
  quickAnswer: QuickAnswer;
}

const difficultyColor: Record<NonNullable<QuickAnswer['difficulty']>, string> = {
  Facile: 'text-green-700 bg-green-50 border-green-200',
  Media: 'text-amber-700 bg-amber-50 border-amber-200',
  Difficile: 'text-orange-700 bg-orange-50 border-orange-200',
  'Solo professionista': 'text-red-700 bg-red-50 border-red-200',
};

export function AIAnswerBox({ quickAnswer }: AIAnswerBoxProps) {
  const { answer, steps, time, cost, difficulty, whenToCallPro } = quickAnswer;

  return (
    <aside
      aria-labelledby="risposta-rapida"
      className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-5 md:p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/15">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <h2
          id="risposta-rapida"
          className="text-lg md:text-xl font-bold text-foreground m-0"
        >
          Risposta rapida
        </h2>
      </div>

      {/* Risposta diretta — il blocco che le AI estraggono */}
      <p className="text-base md:text-lg leading-relaxed text-foreground mb-4">
        {answer}
      </p>

      {/* Stats citabili */}
      {(time || cost || difficulty) && (
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {time && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-background border border-border">
              <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Tempo
                </dt>
                <dd className="text-sm font-medium text-foreground">{time}</dd>
              </div>
            </div>
          )}
          {cost && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-background border border-border">
              <Wallet className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <dt className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Costo
                </dt>
                <dd className="text-sm font-medium text-foreground">{cost}</dd>
              </div>
            </div>
          )}
          {difficulty && (
            <div
              className={`flex items-start gap-2 p-3 rounded-lg border ${difficultyColor[difficulty]}`}
            >
              <Wrench className="w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide opacity-80">
                  Difficoltà
                </dt>
                <dd className="text-sm font-medium">{difficulty}</dd>
              </div>
            </div>
          )}
        </dl>
      )}

      {/* Steps numerati — formato che AI Overviews adora */}
      {steps && steps.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-2">
            Cosa fare in {steps.length} passi
          </h3>
          <ol className="space-y-2">
            {steps.map((step, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <span className="text-sm md:text-base text-foreground leading-snug">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Quando chiamare il pro — frase decisiva */}
      {whenToCallPro && (
        <div className="flex gap-2 items-start p-3 rounded-lg bg-amber-50 border border-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-900 m-0">
            <strong>Chiama un idraulico:</strong> {whenToCallPro}
          </p>
        </div>
      )}
    </aside>
  );
}
