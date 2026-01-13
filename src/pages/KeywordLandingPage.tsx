import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Clock, Shield, Star, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/Layout';
import { getKeywordPageBySlug, KEYWORD_PAGES } from '@/lib/seoData';
import heroBg from '@/assets/hero-bg.avif';

interface KeywordLandingPageProps {
  slug: string;
}

export default function KeywordLandingPage({ slug }: KeywordLandingPageProps) {
  const navigate = useNavigate();
  const pageData = getKeywordPageBySlug(slug);
  
  if (!pageData) return null;

  const canonicalUrl = `https://idraulicisubito.com/${pageData.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": pageData.title,
    "description": pageData.description,
    "url": canonicalUrl,
    "provider": {
      "@type": "Organization",
      "name": "Idraulici Subito"
    },
    "areaServed": { "@type": "Country", "name": "Italia" },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "500"
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>{pageData.title}</title>
        <meta name="description" content={pageData.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageData.title} />
        <meta property="og:description" content={pageData.description} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <section className="relative overflow-hidden min-h-[450px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={heroBg} alt={pageData.h1} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center py-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            {pageData.h1}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {pageData.description}
          </p>
          <Button onClick={() => navigate('/')} size="lg" className="text-lg py-6 px-10 rounded-full font-semibold">
            Richiedi Preventivo Gratuito <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Shield className="h-4 w-4 text-white" /><span className="text-white text-sm">100% Gratuito</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Clock className="h-4 w-4 text-white" /><span className="text-white text-sm">Risposta in 15 min</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="h-4 w-4 text-white fill-white" /><span className="text-white text-sm">4.8/5 recensioni</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: CheckCircle, title: 'Professionisti Verificati', desc: 'Solo esperti qualificati' },
              { icon: Clock, title: 'Risposta Rapida', desc: 'Contatto in 15 minuti' },
              { icon: Shield, title: 'Preventivi Gratuiti', desc: 'Nessun impegno' },
              { icon: Phone, title: 'Pronto Intervento', desc: 'Disponibilità 24/7' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Trova il Professionista Giusto per Te</h2>
          <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
            Richiedi un preventivo gratuito in meno di 2 minuti.
          </p>
          <Button onClick={() => navigate('/')} size="lg" variant="secondary" className="text-lg py-6 px-10 rounded-full font-semibold">
            Inizia Ora <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </Layout>
  );
}
