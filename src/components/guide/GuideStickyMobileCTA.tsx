/**
 * GuideStickyMobileCTA - Sticky bottom CTA on mobile
 * Punta alla chat con l'Idraulico AI (prima diagnosi gratis).
 */

import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

export function GuideStickyMobileCTA() {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMobile || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
      <Link
        to="/consulenza"
        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary to-sky-500 text-primary-foreground font-bold rounded-full px-6 py-3 shadow-lg transition-all"
      >
        <Sparkles className="h-5 w-5" />
        Parla con l'Idraulico AI · Gratis
        <ArrowRight className="h-4 w-4" />
      </Link>
      <p className="text-[10px] text-muted-foreground text-center mt-1.5">
        Diagnosi immediata · Foto e video · Nessuna registrazione
      </p>
    </div>
  );
}
