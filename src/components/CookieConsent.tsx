import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'cookie_consent';

type ConsentStatus = 'pending' | 'accepted' | 'rejected';


export function CookieConsent() {
  const [status, setStatus] = useState<ConsentStatus>('pending');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem(CONSENT_KEY) as ConsentStatus | null;
    
    if (savedConsent === 'accepted') {
      setStatus('accepted');
      enableTracking();
    } else if (savedConsent === 'rejected') {
      setStatus('rejected');
    } else {
      // Show banner after a small delay for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const enableTracking = () => {
    // Enable Google Analytics & Google Ads
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setStatus('accepted');
    setIsVisible(false);
    enableTracking();
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setStatus('rejected');
    setIsVisible(false);
  };

  if (!isVisible || status !== 'pending') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-5 duration-300">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl shadow-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-shrink-0 hidden sm:block">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Cookie className="w-6 h-6 text-primary" />
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">
              Utilizziamo i cookie 🍪
            </h3>
            <p className="text-sm text-muted-foreground">
              Usiamo cookie per analizzare il traffico e migliorare la tua esperienza. 
              Cliccando "Accetta" acconsenti all'uso dei cookie. 
              <Link to="/privacy" className="text-primary hover:underline ml-1">
                Privacy Policy
              </Link>
            </p>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReject}
              className="flex-1 sm:flex-none"
            >
              Rifiuta
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="flex-1 sm:flex-none"
            >
              Accetta
            </Button>
          </div>

          <button
            onClick={handleReject}
            className="absolute top-2 right-2 sm:hidden p-1 text-muted-foreground hover:text-foreground"
            aria-label="Chiudi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
