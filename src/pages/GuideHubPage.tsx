/**
 * GuideHubPage - Pillar page for guide categories
 * 
 * Displays comprehensive content (800-1200 words) with:
 * - Overview section
 * - Top searched problems (FASE 2)
 * - Common problems
 * - When to worry
 * - Prevention tips
 * - Costs table + summary (FASE 3)
 * - FAQ with schema markup
 * - Links to related guides (silo structure)
 * - City links (FASE 6)
 * - Final CTA (FASE 4)
 * - Enhanced schema markup with "about" (FASE 5)
 */

import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { getHubPageBySlug } from '@/lib/hubPagesData';
import { GUIDES, GUIDE_CATEGORIES } from '@/lib/guideData';
import { PRICING_PAGES } from '@/lib/pricingPagesData';
import { GuideCityLinks } from '@/components/guide/GuideCityLinks';
import { HubHeroSection } from '@/components/hub/HubHeroSection';
import { HubTableOfContents } from '@/components/hub/HubTableOfContents';
import { HubTopSearchedProblems } from '@/components/hub/HubTopSearchedProblems';
import { HubContentSection } from '@/components/hub/HubContentSection';
import { HubCostsSummary } from '@/components/hub/HubCostsSummary';
import { HubFAQSection } from '@/components/hub/HubFAQSection';
import { HubRelatedGuides } from '@/components/hub/HubRelatedGuides';
import { HubFinalCTA } from '@/components/hub/HubFinalCTA';
import { HubOtherTopics } from '@/components/hub/HubOtherTopics';
import { GuideAuthorBox } from '@/components/guide/GuideAuthorBox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  AlertTriangle,
  Shield,
  Wrench,
  Euro,
  HelpCircle,
  Droplets,
  Trash2,
  Flame,
  ShowerHead,
  Search
} from 'lucide-react';

// Category icon mapping
const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'perdite': Droplets,
  'scarichi': Trash2,
  'caldaie': Flame,
  'sanitari': ShowerHead,
  'emergenze': AlertTriangle,
};

export default function GuideHubPage() {
  const location = useLocation();
  
  // Extract slug from pathname: /guide/perdite-acqua -> perdite-acqua
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const category = pathSegments.length >= 2 ? pathSegments[1] : undefined;
  
  const hub = category ? getHubPageBySlug(category) : undefined;
  
  // Get related guides for this category
  const categoryGuides = hub 
    ? GUIDES.filter(g => g.category === hub.categorySlug)
    : [];
  
  // Get category info
  const categoryInfo = hub 
    ? GUIDE_CATEGORIES.find(c => c.slug === hub.categorySlug)
    : undefined;
  
  // Get related pricing pages
  const relatedPricing = hub
    ? PRICING_PAGES.filter(p => hub.relatedPricingPages.includes(p.slug))
    : [];

  const CategoryIcon = hub ? (CATEGORY_ICONS[hub.categorySlug] || BookOpen) : BookOpen;

  if (!hub) {
    return (
      <Layout>
        <Helmet>
          <title>Hub Non Trovato | Idraulici Subito</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Pagina non trovata</h1>
          <Link to="/guide">
            <Button>Torna alle Guide</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const canonicalUrl = `https://www.idraulicisubito.com/guide/${hub.slug}`;

  // FASE 5: Enhanced Article JSON-LD with "about"
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: hub.h1,
    description: hub.metaDescription,
    about: {
      '@type': 'Thing',
      name: hub.aboutTopic
    },
    datePublished: hub.publishedAt,
    dateModified: hub.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'Redazione IdrauliciSubito',
      url: 'https://www.idraulicisubito.com/chi-siamo'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Idraulici Subito',
      url: 'https://www.idraulicisubito.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.idraulicisubito.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    }
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: hub.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.idraulicisubito.com' },
      { '@type': 'ListItem', position: 2, name: 'Guide', item: 'https://www.idraulicisubito.com/guide' },
      { '@type': 'ListItem', position: 3, name: hub.h1, item: canonicalUrl }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>{hub.metaTitle}</title>
        <meta name="description" content={hub.metaDescription} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={hub.metaTitle} />
        <meta property="og:description" content={hub.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="article:published_time" content={hub.publishedAt} />
        <meta property="article:modified_time" content={hub.updatedAt} />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <section className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/guide" className="hover:text-foreground">Guide</Link>
            <span>/</span>
            <span className="text-foreground">{categoryInfo?.name || hub.h1}</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <HubHeroSection 
        hub={hub} 
        CategoryIcon={CategoryIcon} 
      />

      {/* Table of Contents */}
      <HubTableOfContents />

      {/* Main Content */}
      <article className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Overview Section */}
            <HubContentSection 
              id="panoramica"
              icon={BookOpen}
              iconColorClass="bg-primary/10 text-primary"
              title="Panoramica"
              htmlContent={hub.content.overview}
            />

            {/* FASE 2: Top Searched Problems */}
            <HubTopSearchedProblems 
              problems={hub.topSearchedProblems}
              categoryName={categoryInfo?.name || hub.h1}
            />

            {/* Common Problems Section */}
            <HubContentSection 
              id="problemi-comuni"
              icon={AlertTriangle}
              iconColorClass="bg-destructive/10 text-destructive"
              title="Problemi Più Comuni"
              htmlContent={hub.content.commonProblems}
            />

            {/* CTA Box */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Hai un problema urgente?</h3>
                  <p className="text-muted-foreground">
                    Trova un idraulico professionista nella tua zona in pochi minuti.
                  </p>
                </div>
                <Link to="/richiesta">
                  <Button size="lg">
                    Richiedi Assistenza
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* When to Worry Section */}
            <HubContentSection 
              id="quando-preoccuparsi"
              icon={Shield}
              iconColorClass="bg-amber-500/10 text-amber-600"
              title="Quando Preoccuparsi"
              htmlContent={hub.content.whenToWorry}
            />

            {/* Prevention Section */}
            <HubContentSection 
              id="prevenzione"
              icon={Wrench}
              iconColorClass="bg-green-500/10 text-green-600"
              title="Prevenzione e Manutenzione"
              htmlContent={hub.content.prevention}
            />

            {/* FASE 3: Costs Section with Summary */}
            <HubCostsSummary 
              htmlContent={hub.content.costs}
              costsSummary={hub.costsSummary}
              relatedPricing={relatedPricing}
            />

            {/* FAQ Section */}
            <HubFAQSection faqs={hub.faqs} />

            {/* Related Guides Section (Silo Links) */}
            <HubRelatedGuides 
              categoryGuides={categoryGuides}
            />

            {/* FASE 6: City Links */}
            <GuideCityLinks maxCities={15} />

            {/* FASE 4: Final CTA */}
            <HubFinalCTA />

          </div>
        </div>
      </article>

      {/* Other Hub Pages Links */}
      <HubOtherTopics currentSlug={hub.slug} />
    </Layout>
  );
}
