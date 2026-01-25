import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { getServiceBySlug } from '@/lib/seoData';

// Legacy service slug mappings
const LEGACY_SERVICE_SLUGS: Record<string, string> = {
  'installazione-vasca': 'box-doccia',
  'vasca': 'box-doccia',
  'vasca-doccia': 'box-doccia',
  'doccia': 'box-doccia',
  // Add more as needed
};

export default function ServiziRedirect() {
  const { service } = useParams<{ service: string }>();
  const serviceSlug = service || '';
  
  // Try to map legacy slug to current slug
  const mappedSlug = LEGACY_SERVICE_SLUGS[serviceSlug] || serviceSlug;
  
  // Check if service exists
  const serviceData = getServiceBySlug(mappedSlug);
  
  if (!serviceData) {
    // Service not found - show 404
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Helmet>
          <meta name="prerender-status-code" content="404" />
          <meta name="robots" content="noindex, nofollow" />
          <title>Servizio non trovato - IdrauliciSubito</title>
        </Helmet>
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
          <h2 className="text-xl text-muted-foreground mb-6">
            Servizio non trovato
          </h2>
          <p className="text-muted-foreground mb-8">
            Il servizio "{serviceSlug}" non è disponibile. Esplora i nostri servizi dalla homepage.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Torna alla Home
            </Link>
            <Link 
              to="/richiesta" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
            >
              Richiedi Preventivo
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Service found - redirect to homepage with service context
  // Since we don't have city context, redirect to keyword page or homepage
  const redirectPath = '/';
  const fullUrl = `https://www.idraulicisubito.com${redirectPath}`;
  
  return (
    <>
      <Helmet>
        <meta name="prerender-status-code" content="301" />
        <meta name="prerender-header" content={`Location: ${fullUrl}`} />
        <link rel="canonical" href={fullUrl} />
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
