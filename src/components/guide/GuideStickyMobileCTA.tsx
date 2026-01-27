/**
 * GuideStickyMobileCTA - Sticky mobile CTA button
 * 
 * Fixed at bottom of screen on mobile devices for maximum conversion.
 * Only visible when user has scrolled past the header.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export function GuideStickyMobileCTA() {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Only show on mobile
  if (!isMobile || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
      <Link to="/richiesta" className="block">
        <Button size="lg" className="w-full">
          <Phone className="h-4 w-4 mr-2" />
          Trova Idraulico Ora
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </Link>
    </div>
  );
}
