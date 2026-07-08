import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Camera, MessageCircle } from "lucide-react";

/**
 * Stubbed after AI-only pivot.
 * The old lead-capture wizard has been replaced by a CTA linking to /consulenza.
 * Signature is preserved so legacy SEO pages (city/blog/guide) keep compiling.
 */

interface InlineWizardProps {
  cityName?: string;
  serviceName?: string;
  problema?: string;
  compact?: boolean;
  variant?: string;
  [key: string]: any;
}

export function InlineWizard({ cityName, problema }: InlineWizardProps) {
  const params = new URLSearchParams();
  if (problema) params.set("problema", problema);
  if (cityName) params.set("citta", cityName);
  const qs = params.toString();
  const href = `/consulenza${qs ? `?${qs}` : ""}`;

  return (
    <div className="rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-sky-500/5 p-6 md:p-8 my-8 text-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-primary/20 text-primary text-xs font-bold mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        Prima diagnosi gratis
      </div>
      <h3 className="text-xl md:text-2xl font-black mb-2">
        Descrivi il tuo problema all'Idraulico AI
      </h3>
      <p className="text-sm md:text-base text-muted-foreground mb-5 max-w-lg mx-auto">
        Chatta, invia una foto o un video e ricevi la soluzione passo-passo in meno di un minuto.
        Chat illimitata a <strong>4,95€</strong> una tantum.
      </p>
      <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground mb-5">
        <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 text-primary" /> Risposta immediata</span>
        <span className="flex items-center gap-1"><Camera className="w-3.5 h-3.5 text-primary" /> Foto & video</span>
      </div>
      <Link
        to={href}
        className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-colors"
      >
        ✨ Parla con l'Idraulico AI
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default InlineWizard;
