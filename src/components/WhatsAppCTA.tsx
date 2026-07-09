/**
 * AI Chat CTA
 *
 * Storicamente si chiamava WhatsAppCTA. Il nome è mantenuto per compatibilità
 * con i molti call site sparsi in guide/città/blog: ora però il CTA porta
 * l'utente alla chat con l'Idraulico AI (prima diagnosi gratis, poi €4,95).
 */

import { Link } from "react-router-dom";
import { Sparkles, MessageCircle, ArrowRight, Camera, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  cityName?: string;
  problema?: string;
  className?: string;
  fullWidth?: boolean;
  [key: string]: any;
}


function buildHref({ cityName, problema }: { cityName?: string; problema?: string }) {
  const params = new URLSearchParams();
  if (problema) params.set("problema", problema);
  if (cityName) params.set("citta", cityName);
  const qs = params.toString();
  return `/consulenza${qs ? `?${qs}` : ""}`;
}

export function WhatsAppCTA({
  label,
  size = "md",
  cityName,
  problema,
  className,
  fullWidth,
}: CTAProps) {
  // Ignore any legacy WhatsApp copy still passed by old call sites.
  const cleanLabel =
    !label || /whatsapp/i.test(label)
      ? cityName
        ? `Parla con l'Idraulico AI · ${cityName}`
        : "Parla ora con l'Idraulico AI"
      : label;


  const sizeCls =
    size === "lg"
      ? "h-14 px-8 text-base"
      : size === "sm"
      ? "h-10 px-4 text-sm"
      : "h-12 px-6 text-sm md:text-base";

  return (
    <Link
      to={buildHref({ cityName, problema })}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-bold shadow-md",
        "bg-gradient-to-r from-primary to-sky-500 text-primary-foreground",
        "hover:shadow-lg hover:scale-[1.02] transition-all",
        sizeCls,
        fullWidth && "w-full",
        className,
      )}
    >

      <Sparkles className="w-4 h-4" />
      {cleanLabel}
      <ArrowRight className="w-4 h-4" />

    </Link>
  );
}

interface BoxProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  cityName?: string;
  problema?: string;
  className?: string;
  compact?: boolean;
  [key: string]: any;
}


export function WhatsAppCTABox({
  title,
  description,
  buttonLabel,
  cityName,
  problema,
  className,
}: BoxProps) {
  const cleanTitle =
    !title || /whatsapp/i.test(title)
      ? "🔧 Non riesci a risolvere? Chiedi all'Idraulico AI"
      : title;
  const cleanDescription =
    !description || /whatsapp/i.test(description)
      ? "Descrivi il problema in chat, invia una foto o un breve video: l'AI ti risponde in 30 secondi con la soluzione passo-passo. Se serve, ti troviamo un idraulico vicino a te."
      : description;
  const cleanButton =
    !buttonLabel || /whatsapp/i.test(buttonLabel)
      ? "Parla ora con l'Idraulico AI"
      : buttonLabel;

  return (
    <div
      className={cn(
        "my-6 rounded-2xl border-2 border-primary/30 p-5 md:p-6",
        "bg-gradient-to-br from-primary/10 via-sky-500/5 to-transparent",
        "shadow-sm",
        className,
      )}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-11 h-11 shrink-0 rounded-full bg-primary/15 flex items-center justify-center text-xl">
          🔧
        </div>
        <div>
          <h3 className="font-black text-base md:text-lg leading-tight">{cleanTitle}</h3>
          <p className="text-xs text-primary font-semibold mt-0.5">
            Prima diagnosi gratis · nessuna registrazione
          </p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{cleanDescription}</p>

      <div className="grid grid-cols-3 gap-2 mb-4 text-[11px] md:text-xs">
        <div className="flex items-center gap-1.5 rounded-lg bg-background/60 border px-2 py-1.5">
          <MessageCircle className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="truncate">Chat 24/7</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-background/60 border px-2 py-1.5">
          <Camera className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="truncate">Foto & video</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-background/60 border px-2 py-1.5">
          <Zap className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="truncate">Passo-passo</span>
        </div>
      </div>

      <WhatsAppCTA
        label={cleanButton}
        size="lg"
        cityName={cityName}
        problema={problema}
        className="w-full sm:w-auto"
      />
    </div>
  );
}

