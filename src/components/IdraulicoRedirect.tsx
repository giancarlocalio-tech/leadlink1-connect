import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCityBySlug, getServiceBySlug } from '@/lib/seoData';

// Legacy service slug mappings to current slugs
const LEGACY_SERVICE_SLUGS: Record<string, string> = {
  // Exact matches to current valid slugs
  'riparazione-perdite': 'riparazione-perdite',
  'valvole-termostatiche': 'valvole-termostatiche',
  'manutenzione-caldaie': 'manutenzione-caldaie',
  'spurgo-fognature': 'spurgo-fognature',
  'scarichi-intasati': 'scarichi-intasati',
  'pronto-intervento': 'pronto-intervento',
  'installazione-sanitari': 'installazione-sanitari',
  'condizionatori': 'condizionatori',
  'impianto-riscaldamento': 'impianto-riscaldamento',
  'ristrutturazione-bagno': 'ristrutturazione-bagno',
  'scaldabagno': 'scaldabagno',
  'autoclave': 'autoclave',
  'addolcitore-acqua': 'addolcitore-acqua',
  'depuratore-acqua': 'depuratore-acqua',
  'pompa-calore': 'pompa-calore',
  'pannelli-solari-termici': 'pannelli-solari-termici',
  'termosifoni': 'termosifoni',
  'impianto-gas': 'impianto-gas',
  'contatore-acqua': 'contatore-acqua',
  'box-doccia': 'box-doccia',
  'vasca-doccia': 'vasca-doccia',
  'rubinetteria': 'rubinetteria',
  'scarichi-fognature': 'scarichi-fognature',
  'certificazione-impianti': 'certificazione-impianti',
  'irrigazione-giardino': 'irrigazione-giardino',
  'piscine': 'piscine',
  // Legacy slug mappings → current valid slugs
  'spurgo-fogne': 'spurgo-fognature',
  'spurgo': 'spurgo-fognature',
  'perdite': 'riparazione-perdite',
  'riparazione-caldaia': 'manutenzione-caldaie',
  'riparazione-caldaie': 'manutenzione-caldaie',
  'sostituzione-sanitari': 'installazione-sanitari',
  'pulizia-scarichi': 'scarichi-intasati',
  'disostruzione': 'scarichi-intasati',
  'disostruzione-scarichi': 'scarichi-intasati',
  'riparazione-tubazioni': 'riparazione-perdite',
  'perdita-acqua': 'riparazione-perdite',
  'scarico-intasato': 'scarichi-intasati',
  'rubinetto': 'rubinetteria',
  'bagno': 'ristrutturazione-bagno',
  'caldaia': 'manutenzione-caldaie',
  'installazione-scaldabagno': 'scaldabagno',
  // Additional legacy slugs from GSC
  'idraulico': 'idraulico',
  'certificazione-impianto-idraulico': 'certificazione-impianti',
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
