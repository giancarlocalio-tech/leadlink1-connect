import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getProblemCityPageBySlug, getCityLocalContent } from "@/lib/problemCityPagesData";
import { Layout } from "@/components/Layout";
import { Breadcrumb, BreadcrumbItem } from "@/components/seo/Breadcrumb";
import { SummaryBox } from "@/components/blog/SummaryBox";
import { MethodCard } from "@/components/blog/MethodCard";
import { WarningBox } from "@/components/blog/WarningBox";
import { ProCallBox } from "@/components/blog/ProCallBox";
import { FinalCTABox } from "@/components/blog/FinalCTABox";
import { CityWhySection } from "@/components/seo/CityWhySection";
import { LocalMiniFAQ, generateLocalFAQItems } from "@/components/seo/LocalMiniFAQ";
import { MidArticleCTA } from "@/components/seo/MidArticleCTA";
import { HeroCtaBanner } from "@/components/seo/HeroCtaBanner";
import { MapPin, AlertCircle, Wrench, Home } from "lucide-react";

const ProblemCityPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract slug from pathname (e.g., "/lavandino-intasato-milano" -> "lavandino-intasato-milano")
  const slug = location.pathname.replace(/^\//, '');
  
  const pageData = getProblemCityPageBySlug(slug);
  
  if (!pageData) {
    return (
      <Layout>
        <Helmet>
          <meta name="prerender-status-code" content="404" />
          <meta name="robots" content="noindex, nofollow" />
          <title>Pagina non trovata | Idraulici Subito</title>
        </Helmet>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Pagina non trovata</h1>
          <p className="text-muted-foreground mb-6">
            La pagina che stai cercando non esiste.
          </p>
          <button 
            onClick={() => navigate("/")}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg"
          >
            Torna alla Home
          </button>
        </div>
      </Layout>
    );
  }

  // Get city local content for enhanced sections
  const cityLocalData = getCityLocalContent(pageData.citySlug);

  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Blog", url: "/blog" },
    { name: pageData.h1, url: `/${pageData.slug}` }
  ];

  const canonicalUrl = `https://www.idraulicisubito.com/${pageData.slug}`;
  const problemContext = `${pageData.problemName} a ${pageData.cityName}`;

  // Generate local FAQ items for schema
  const localFAQItems = generateLocalFAQItems(
    pageData.cityName,
    pageData.problemName,
    pageData.problemSlug
  );

  // JSON-LD Schema - Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": pageData.h1,
    "description": pageData.metaDescription,
    "author": {
      "@type": "Organization",
      "name": "Idraulici Subito"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Idraulici Subito",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.idraulicisubito.com/logo.png"
      }
    },
    "mainEntityOfPage": canonicalUrl,
    "about": {
      "@type": "Thing",
      "name": pageData.problemName,
      "description": `Guida pratica per risolvere ${pageData.problemName.toLowerCase()} a ${pageData.cityName}`
    }
  };

  // JSON-LD Schema - FAQ (extended with local questions)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      // Original generic FAQs
      {
        "@type": "Question",
        "name": `Come risolvere ${pageData.problemName.toLowerCase()} a ${pageData.cityName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Per risolvere ${pageData.problemName.toLowerCase()} a ${pageData.cityName}, puoi provare metodi fai-da-te come acqua calda, bicarbonato e aceto, o lo sturalavandini. Se il problema persiste, è consigliabile chiamare un idraulico professionista.`
        }
      },
      // Local FAQ questions (cost, time, urgency)
      ...localFAQItems.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    ]
  };

  // JSON-LD Schema - Breadcrumb
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.idraulicisubito.com" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.idraulicisubito.com/blog" },
      { "@type": "ListItem", "position": 3, "name": pageData.h1, "item": canonicalUrl }
    ]
  };

  // JSON-LD Schema - LocalBusiness / Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${pageData.problemName} a ${pageData.cityName}`,
    "description": pageData.metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "Idraulici Subito",
      "url": "https://www.idraulicisubito.com"
    },
    "areaServed": {
      "@type": "City",
      "name": pageData.cityName
    },
    "serviceType": "Idraulico"
  };

  // Map methods to summary items with icons
  const summaryItems = pageData.methods.map(m => ({
    icon: m.icon,
    label: m.title.replace(/Metodo \d+ — /, '')
  }));

  // Get problem icon
  const problemIcon = pageData.problemSlug.includes('lavandino') ? '🪠' :
                       pageData.problemSlug.includes('wc') ? '🚽' :
                       pageData.problemSlug.includes('scaldabagno') ? '🚿' :
                       pageData.problemSlug.includes('caldaia') ? '🔥' :
                       pageData.problemSlug.includes('tubo') ? '💧' :
                       pageData.problemSlug.includes('doccia') ? '🚿' :
                       pageData.problemSlug.includes('termosifone') ? '🌡️' : '🔧';

  return (
    <Layout>
      <Helmet>
        <title>{pageData.metaTitle}</title>
        <meta name="description" content={pageData.metaDescription} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageData.metaTitle} />
        <meta property="og:description" content={pageData.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageData.metaTitle} />
        <meta name="twitter:description" content={pageData.metaDescription} />
        
        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>

      <article className="bg-background min-h-screen">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Hero CTA Banner - Above the fold */}
        <HeroCtaBanner 
          cityName={pageData.cityName} 
          problemContext={problemContext}
        />

        {/* Header */}
        <header className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-primary mb-4">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">{pageData.cityName}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              {pageData.h1}
            </h1>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Summary Box */}
            <SummaryBox
              icon={problemIcon}
              title={`Problema con ${pageData.problemName.toLowerCase()}? Prova questi passaggi prima di chiamare un idraulico`}
              items={summaryItems}
            />

            {/* Introduction */}
            <section className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed" 
                 dangerouslySetInnerHTML={{ __html: pageData.introText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} 
              />
            </section>

            {/* Causes Section */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-primary" />
                {pageData.causesTitle}
              </h2>
              <ul className="space-y-3">
                {pageData.causes.map((cause, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-primary mt-1">✓</span>
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Why Section - Localized */}
            {cityLocalData && (
              <CityWhySection
                cityName={pageData.cityName}
                problemName={pageData.problemName}
                waterType={cityLocalData.waterType}
                buildingAge={cityLocalData.buildingAge}
                commonIssues={cityLocalData.commonIssues}
                neighborhoods={cityLocalData.neighborhoods}
                problemSlug={pageData.problemSlug}
              />
            )}

            {/* Methods Section */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Wrench className="h-6 w-6 text-primary" />
                Cosa Puoi Provare da Solo
              </h2>
              <div className="grid gap-6">
                {pageData.methods.map((method, index) => (
                  <MethodCard
                    key={index}
                    icon={method.icon}
                    number={index + 1}
                    title={method.title.replace(/Metodo \d+ — /, '')}
                    description={method.description}
                    steps={method.steps}
                  />
                ))}
              </div>
            </section>

            {/* Mid-Article CTA */}
            <MidArticleCTA 
              cityName={pageData.cityName}
              problemContext={problemContext}
              variant="compact"
            />

            {/* Warnings */}
            {pageData.warnings.length > 0 && (
              <section className="space-y-4">
                {pageData.warnings.map((warning, index) => (
                  <WarningBox key={index}>
                    {warning}
                  </WarningBox>
                ))}
              </section>
            )}

            {/* When to Call Section */}
            <ProCallBox title={pageData.whenToCallTitle}>
              {pageData.whenToCallText}
            </ProCallBox>

            {/* Local Paragraph - Original */}
            <section className="bg-muted/30 rounded-2xl p-6 md:p-8 border border-border">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Home className="h-5 w-5 text-primary" />
                {pageData.localParagraphTitle}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {pageData.localParagraphText}
              </p>
            </section>

            {/* Local Mini FAQ - 3 Questions */}
            <LocalMiniFAQ
              cityName={pageData.cityName}
              problemName={pageData.problemName}
              problemSlug={pageData.problemSlug}
            />

            {/* Full CTA - Before Final */}
            <MidArticleCTA 
              cityName={pageData.cityName}
              problemContext={problemContext}
              variant="full"
            />

            {/* Final CTA with Form */}
            <FinalCTABox
              title={pageData.ctaTitle}
              description={pageData.ctaText}
              interventionType={pageData.interventionType}
              problemContext={problemContext}
            />
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ProblemCityPage;
