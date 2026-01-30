import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getProblemCityPageBySlug, getCityLocalContent } from "@/lib/problemCityPagesData";
import { Layout } from "@/components/Layout";
import { Breadcrumb, BreadcrumbItem } from "@/components/seo/Breadcrumb";
import { SummaryBox } from "@/components/blog/SummaryBox";
import { MethodCard } from "@/components/blog/MethodCard";
import { WarningBox } from "@/components/blog/WarningBox";
import { FinalCTABox } from "@/components/blog/FinalCTABox";
import { CityWhySection } from "@/components/seo/CityWhySection";
import { LocalMiniFAQ, generateLocalFAQItems } from "@/components/seo/LocalMiniFAQ";
import { MidArticleCTA } from "@/components/seo/MidArticleCTA";
import { HeroCtaBanner } from "@/components/seo/HeroCtaBanner";
import { RelatedGuideLink } from "@/components/seo/RelatedGuideLink";
import { SimilarProblemsInCity } from "@/components/seo/SimilarProblemsInCity";
import { ProblemCityCostSection } from "@/components/seo/ProblemCityCostSection";
import { ProblemCityZonesSection } from "@/components/seo/ProblemCityZonesSection";
import { ProblemCityWhenToCallSection } from "@/components/seo/ProblemCityWhenToCallSection";
import { ProblemCityWhereSection } from "@/components/seo/ProblemCityWhereSection";
import { ProblemCityWarningSignsSection } from "@/components/seo/ProblemCityWarningSignsSection";
import { ProblemCityMistakesSection } from "@/components/seo/ProblemCityMistakesSection";
import { ProblemCityDIYLimitations } from "@/components/seo/ProblemCityDIYLimitations";
import { MapPin, AlertCircle, Wrench, Home, ListChecks, Ban, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const ProblemCityPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
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
          <p className="text-muted-foreground mb-6">La pagina che stai cercando non esiste.</p>
          <button onClick={() => navigate("/")} className="bg-primary text-primary-foreground px-6 py-3 rounded-lg">
            Torna alla Home
          </button>
        </div>
      </Layout>
    );
  }

  const cityLocalData = getCityLocalContent(pageData.citySlug);

  const breadcrumbItems: BreadcrumbItem[] = [
    { name: pageData.cityName, url: `/${pageData.citySlug}` },
    { name: pageData.problemName, url: `/${pageData.slug}` }
  ];

  const canonicalUrl = `https://www.idraulicisubito.com/${pageData.slug}`;
  const problemContext = `${pageData.problemName} a ${pageData.cityName}`;

  // Generate local FAQ items for schema (expanded to 4+ questions)
  const localFAQItems = generateLocalFAQItems(pageData.cityName, pageData.problemName, pageData.problemSlug);

  // JSON-LD Schema - Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": pageData.h1,
    "description": pageData.metaDescription,
    "author": { "@type": "Organization", "name": "Idraulici Subito" },
    "publisher": {
      "@type": "Organization",
      "name": "Idraulici Subito",
      "logo": { "@type": "ImageObject", "url": "https://www.idraulicisubito.com/logo.png" }
    },
    "mainEntityOfPage": canonicalUrl,
    "about": {
      "@type": "Thing",
      "name": pageData.problemName,
      "description": `Guida pratica per risolvere ${pageData.problemName.toLowerCase()} a ${pageData.cityName}`
    }
  };

  // JSON-LD Schema - FAQ (4+ questions)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Come risolvere ${pageData.problemName.toLowerCase()} a ${pageData.cityName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Per risolvere ${pageData.problemName.toLowerCase()} a ${pageData.cityName}, puoi provare metodi fai-da-te come acqua calda, bicarbonato e aceto, o lo sturalavandini. Se il problema persiste, è consigliabile chiamare un idraulico professionista.`
        }
      },
      {
        "@type": "Question",
        "name": `Quando chiamare un idraulico per ${pageData.problemName.toLowerCase()} a ${pageData.cityName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Chiama un idraulico a ${pageData.cityName} se il problema persiste dopo i tentativi fai-da-te, se noti cattivi odori, se l'acqua risale o se il problema si ripresenta frequentemente.`
        }
      },
      ...localFAQItems.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
      }))
    ]
  };

  // JSON-LD Schema - Breadcrumb
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.idraulicisubito.com" },
      { "@type": "ListItem", "position": 2, "name": pageData.cityName, "item": `https://www.idraulicisubito.com/${pageData.citySlug}` },
      { "@type": "ListItem", "position": 3, "name": pageData.problemName, "item": canonicalUrl }
    ]
  };

  // JSON-LD Schema - Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${pageData.problemName} a ${pageData.cityName}`,
    "description": pageData.metaDescription,
    "provider": { "@type": "Organization", "name": "Idraulici Subito", "url": "https://www.idraulicisubito.com" },
    "areaServed": { "@type": "City", "name": pageData.cityName },
    "serviceType": "Idraulico"
  };

  // Map methods to summary items
  const summaryItems = pageData.methods.map(m => ({
    icon: m.icon,
    label: m.title.replace(/Metodo \d+ — /, '')
  }));

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
        <meta property="og:title" content={pageData.metaTitle} />
        <meta property="og:description" content={pageData.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageData.metaTitle} />
        <meta name="twitter:description" content={pageData.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      <article className="bg-background min-h-screen">
        <Breadcrumb items={breadcrumbItems} />
        <HeroCtaBanner cityName={pageData.cityName} problemContext={problemContext} />

        {/* H1 SEO-optimized */}
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

        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto space-y-10">
            
            {/* Summary Box */}
            <SummaryBox
              icon={problemIcon}
              title={`Problema con ${pageData.problemName.toLowerCase()}? Prova questi passaggi prima di chiamare un idraulico`}
              items={summaryItems}
            />

            {/* 2️⃣ INTRO OTTIMIZZATA SEO + LOCALE (min 6 righe) */}
            <section className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed" 
                 dangerouslySetInnerHTML={{ __html: pageData.introText.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} 
              />
            </section>

            {/* 3️⃣ SEZIONE "DOVE SUCCEDE PIÙ SPESSO A [CITTÀ]" */}
            {cityLocalData && (
              <ProblemCityWhereSection
                cityName={pageData.cityName}
                citySlug={pageData.citySlug}
                problemName={pageData.problemName}
                problemSlug={pageData.problemSlug}
                neighborhoods={cityLocalData.neighborhoods}
                buildingAge={cityLocalData.buildingAge}
              />
            )}

            {/* CAUSE COMUNI */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-primary" />
                Cause Comuni di {pageData.problemName} a {pageData.cityName}
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

            {/* Localized Why Section */}
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

            {/* 4️⃣ COSA FARE SUBITO (Metodi fai-da-te) */}
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <ListChecks className="h-6 w-6 text-primary" />
                Cosa Fare Subito se Hai {pageData.problemName} a {pageData.cityName}
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
              
              {/* ⚠️ Warning: quando il fai-da-te NON funziona */}
              <ProblemCityDIYLimitations problemSlug={pageData.problemSlug} />
            </section>

            {/* Mid-Article CTA */}
            <MidArticleCTA cityName={pageData.cityName} problemContext={problemContext} variant="compact" />

            {/* 5️⃣ SEGNALI DI PROBLEMA GRAVE */}
            <ProblemCityWarningSignsSection
              problemName={pageData.problemName}
              problemSlug={pageData.problemSlug}
            />

            {/* COSA NON FARE - Warnings */}
            {pageData.warnings.length > 0 && (
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Ban className="h-6 w-6 text-destructive" />
                  Cosa NON Fare con {pageData.problemName}
                </h2>
                <div className="space-y-4">
                  {pageData.warnings.map((warning, index) => (
                    <WarningBox key={index}>{warning}</WarningBox>
                  ))}
                </div>
              </section>
            )}

            {/* 7️⃣ ERRORI COMUNI CHE PEGGIORANO IL PROBLEMA */}
            <ProblemCityMistakesSection
              problemName={pageData.problemName}
              problemSlug={pageData.problemSlug}
            />

            {/* QUANDO CHIAMARE UN IDRAULICO */}
            <ProblemCityWhenToCallSection
              cityName={pageData.cityName}
              problemName={pageData.problemName}
              problemSlug={pageData.problemSlug}
            />

            {/* 6️⃣ SEZIONE PREZZI LOCALIZZATA */}
            <ProblemCityCostSection
              cityName={pageData.cityName}
              citySlug={pageData.citySlug}
              problemName={pageData.problemName}
              problemSlug={pageData.problemSlug}
            />

            {/* 7️⃣ ZONE SERVITE */}
            {cityLocalData && (
              <ProblemCityZonesSection
                cityName={pageData.cityName}
                citySlug={pageData.citySlug}
                neighborhoods={cityLocalData.neighborhoods}
                problemName={pageData.problemName}
              />
            )}

            {/* 8️⃣ FAQ CON SCHEMA MARKUP */}
            <LocalMiniFAQ
              cityName={pageData.cityName}
              problemName={pageData.problemName}
              problemSlug={pageData.problemSlug}
            />

            {/* 9️⃣ LINK INTERNI */}
            <RelatedGuideLink 
              problemSlug={pageData.problemSlug}
              problemName={pageData.problemName}
            />

            <SimilarProblemsInCity
              currentProblemSlug={pageData.problemSlug}
              citySlug={pageData.citySlug}
              cityName={pageData.cityName}
            />

            {/* Full CTA */}
            <MidArticleCTA cityName={pageData.cityName} problemContext={problemContext} variant="full" />

            {/* 🔟 CTA FINALE SUPER FORTE */}
            <FinalCTABox
              title={`Hai ancora ${pageData.problemName} a ${pageData.cityName}?`}
              description={`Invia una richiesta gratuita e ricevi preventivi da idraulici disponibili nella tua zona. Intervento rapido in tutta ${pageData.cityName} e provincia. Nessun impegno, solo professionisti verificati.`}
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
