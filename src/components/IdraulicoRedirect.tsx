import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCityBySlug, getServiceBySlug } from '@/lib/seoData';

// Legacy service slug mappings to current slugs
const LEGACY_SERVICE_SLUGS: Record<string, string> = {
  'spurgo-fogne': 'scarico-intasato',
  'riparazione-perdite': 'perdita-acqua',
  'spurgo': 'scarico-intasato',
  'perdite': 'perdita-acqua',
  'riparazione-caldaia': 'manutenzione-caldaie',
  'riparazione-caldaie': 'manutenzione-caldaie',
  'installazione-sanitari': 'installazione-sostituzione',
  'sostituzione-sanitari': 'installazione-sostituzione',
  'pulizia-scarichi': 'scarico-intasato',
  'disostruzione': 'scarico-intasato',
  'disostruzione-scarichi': 'scarico-intasato',
  'riparazione-tubazioni': 'perdita-acqua',
};

// Legacy city slug mappings
const LEGACY_CITY_SLUGS: Record<string, string> = {
  // Add any legacy city slug mappings here if needed
};

interface IdraulicoRedirectProps {
  type: 'city' | 'city-service';
}

export default function IdraulicoRedirect({ type }: IdraulicoRedirectProps) {
  const navigate = useNavigate();
  const params = useParams<{ city?: string; service?: string }>();

  useEffect(() => {
    let citySlug = params.city || '';
    let serviceSlug = params.service || '';

    // Check for legacy city slugs
    if (LEGACY_CITY_SLUGS[citySlug]) {
      citySlug = LEGACY_CITY_SLUGS[citySlug];
    }

    // Check for legacy service slugs
    if (LEGACY_SERVICE_SLUGS[serviceSlug]) {
      serviceSlug = LEGACY_SERVICE_SLUGS[serviceSlug];
    }

    // Validate city exists
    const cityData = getCityBySlug(citySlug);
    if (!cityData) {
      // City not found, redirect to homepage
      navigate('/', { replace: true });
      return;
    }

    // Build the new URL
    let newPath: string;
    if (type === 'city-service' && serviceSlug) {
      // Validate service exists
      const serviceData = getServiceBySlug(serviceSlug);
      if (serviceData) {
        newPath = `/${citySlug}-${serviceSlug}`;
      } else {
        // Service not found, redirect to city page
        newPath = `/${citySlug}`;
      }
    } else {
      newPath = `/${citySlug}`;
    }

    // Perform 301-style redirect (replace in history)
    navigate(newPath, { replace: true });
  }, [params, navigate, type]);

  // Show nothing while redirecting
  return null;
}
