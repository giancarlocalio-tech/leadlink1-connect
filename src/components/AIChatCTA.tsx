/**
 * AIChatCTA — CTA condivisa che porta l'utente alla chat con l'Idraulico AI.
 *
 * Sostituisce le vecchie CTA WhatsApp in tutte le guide/blog/pagine SEO.
 * Ottimizzata per utenti in intent DIY che stanno cercando di risolvere un problema.
 */

import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Camera, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AIChatCTAProps {
  variant?: 'default' | 'urgent' | 'minimal' | 'inline' | 'stuck';
  title?: string;
  description?: string;
  buttonLabel?: string;
  className?: string;
  problemContext?: string;
}

const PRESETS: Record<
  NonNullable<AIChatCTAProps['variant']>,
  { title: string; description: string; buttonLabel: string }
> = {
  default: {
    title: '💬 Non riesci a risolvere da solo?',
    description:
      "Descrivi il problema all'Idraulico AI: ricevi la diagnosi personalizzata in 60 secondi. Prima domanda gratis, senza registrazione.",
    buttonLabel: 'Parla con l\'Idraulico AI',
  },
  urgent: {
    title: '🚨 Situazione urgente?',
    description:
      "Chatta ora con l'Idraulico AI: allega foto o video e ricevi subito i passi da seguire per limitare i danni.",
    buttonLabel: 'Chiedi aiuto ora — Gratis',
  },
  minimal: {
    title: '',
    description: 'Bloccato a metà? Chiedi all\'Idraulico AI.',
    buttonLabel: 'Apri la chat',
  },
  inline: {
    title: '⚡ Non sei sicuro della causa?',
    description:
      "Prima di comprare pezzi o smontare, fai una diagnosi rapida gratis con l'Idraulico AI.",
    buttonLabel: 'Diagnosi gratis in chat',
  },
  stuck: {
    title: '🛑 Bloccato a questo punto?',
    description:
      "Fai una foto del problema e mandala all'Idraulico AI: ti dice subito se puoi continuare o è meglio fermarsi.",
    buttonLabel: 'Chiedi conferma prima di procedere',
  },
};

export function AIChatCTA({
  variant = 'default',
  title,
  description,
  buttonLabel,
  className,
  problemContext,
}: AIChatCTAProps) {
  const preset = PRESETS[variant];
  const finalTitle = title ?? preset.title;
  const finalDesc = description ?? preset.description;
  const finalBtn = buttonLabel ?? preset.buttonLabel;
  const href = problemContext
    ? `/consulenza?q=${encodeURIComponent(problemContext)}`
    : '/consulenza';

  if (variant === 'minimal') {
    return (
      <div
        className={cn(
          'my-6 p-4 bg-primary/5 rounded-lg border border-primary/20',
          className,
        )}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground text-center sm:text-left flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary shrink-0" />
            <span>{finalDesc}</span>
          </p>
          <Button asChild size="sm" className="shrink-0">
            <Link to={href}>
              {finalBtn} <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'my-8 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 shadow-sm',
        className,
      )}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-full bg-primary/15 shrink-0">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          {finalTitle && (
            <h3 className="font-bold text-lg leading-tight mb-1">{finalTitle}</h3>
          )}
          <p className="text-sm text-muted-foreground">{finalDesc}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4 pl-1">
        <span className="flex items-center gap-1">
          <MessageSquare className="w-3.5 h-3.5" /> Prima domanda gratis
        </span>
        <span className="flex items-center gap-1">
          <Camera className="w-3.5 h-3.5" /> Foto & video
        </span>
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Risposta in 60s
        </span>
      </div>

      <Button asChild size="lg" className="w-full sm:w-auto font-semibold">
        <Link to={href}>
          {finalBtn}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </Button>

      <p className="text-[11px] text-muted-foreground mt-3">
        Consulenza completa illimitata solo se ti serve: 4,95€ una tantum, niente abbonamenti.
      </p>
    </div>
  );
}

export default AIChatCTA;
