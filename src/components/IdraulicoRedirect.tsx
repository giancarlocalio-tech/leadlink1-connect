import { useEffect, useState } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
  'idraulico': 'idraulico',
  
  // Legacy slug mappings → current valid slugs (from GSC errors)
  'spurgo-fogne': 'spurgo-fognature',
  'spurgo': 'spurgo-fognature',
  'perdite': 'riparazione-perdite',
  'perdita-acqua': 'riparazione-perdite',
  'riparazione-caldaia': 'manutenzione-caldaie',
  'riparazione-caldaie': 'manutenzione-caldaie',
  'sostituzione-sanitari': 'installazione-sanitari',
  'pulizia-scarichi': 'scarichi-intasati',
  'disostruzione': 'scarichi-intasati',
  'disostruzione-scarichi': 'scarichi-intasati',
  'riparazione-tubazioni': 'riparazione-perdite',
  'scarico-intasato': 'scarichi-intasati',
  'rubinetto': 'rubinetteria',
  'bagno': 'ristrutturazione-bagno',
  'caldaia': 'manutenzione-caldaie',
  'installazione-scaldabagno': 'scaldabagno',
  'certificazione-impianto-idraulico': 'certificazione-impianti',
  'manutenzione-caldaia': 'manutenzione-caldaie',
  // Additional legacy variations
  'termosifone': 'termosifoni',
  'contatore': 'contatore-acqua',
  'impianti-gas': 'impianto-gas',
  'riscaldamento': 'impianto-riscaldamento',
  'doccia': 'box-doccia',
  'sanitari': 'installazione-sanitari',
  'clima': 'condizionatori',
  'climatizzatori': 'condizionatori',
  'climatizzazione': 'condizionatori',
  'pannelli-solari': 'pannelli-solari-termici',
  'solare-termico': 'pannelli-solari-termici',
  'addolcitore': 'addolcitore-acqua',
  'depuratore': 'depuratore-acqua',
  'pompe-calore': 'pompa-calore',
  'certificazione': 'certificazione-impianti',
  'irrigazione': 'irrigazione-giardino',
  'piscina': 'piscine',
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
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

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
      // City not found - show 404 instead of redirect to homepage
      setNotFound(true);
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

    setRedirectPath(newPath);
  }, [params, type]);

  // If city not found, navigate to 404
  if (notFound) {
    return <Navigate to="/404" replace />;
  }

  // If redirect path determined, render with proper 301 meta tags
  if (redirectPath) {
    const fullUrl = `https://www.idraulicisubito.com${redirectPath}`;
    
    return (
      <>
        <Helmet>
          {/* Tell crawlers this is a 301 redirect */}
          <meta name="prerender-status-code" content="301" />
          <meta name="prerender-header" content={`Location: ${fullUrl}`} />
          <link rel="canonical" href={fullUrl} />
          {/* HTTP-Equiv refresh as fallback for crawlers */}
          <meta httpEquiv="refresh" content={`0; url=${fullUrl}`} />
          <title>Redirect...</title>
        </Helmet>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.replace("${redirectPath}");`
          }}
        />
      </>
    );
  }

  // Show nothing while determining redirect
  return null;
}
