import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { getGuideBySlug, getRelatedGuides, GUIDE_CATEGORIES } from '@/lib/guideData';
import { getGuideFAQs } from '@/lib/guideFAQs';
import { getGuideCosts, getRelatedPricingPage } from '@/lib/guideCosts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, AlertTriangle, CheckCircle, XCircle, Phone } from 'lucide-react';

// Guide components
import { GuideFAQSection } from '@/components/guide/GuideFAQSection';
import { GuideCTABox } from '@/components/guide/GuideCTABox';
import { GuideStickyMobileCTA } from '@/components/guide/GuideStickyMobileCTA';
import { GuideTableOfContents, DEFAULT_TOC_ITEMS } from '@/components/guide/GuideTableOfContents';
import { GuideSection } from '@/components/guide/GuideSection';
import { GuideCostsSection } from '@/components/guide/GuideCostsSection';
import { GuideCityLinks } from '@/components/guide/GuideCityLinks';
import { GuideRelatedContent } from '@/components/guide/GuideRelatedContent';
import { GuideAuthorBox } from '@/components/guide/GuideAuthorBox';

export default function GuidePage() {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? getGuideBySlug(slug) : undefined;
  const relatedGuides = slug ? getRelatedGuides(slug, 3) : [];
  const category = guide ? GUIDE_CATEGORIES.find(c => c.slug === guide.category) : undefined;
  const guideFAQs = slug ? getGuideFAQs(slug) : [];
  const guideCosts = slug ? getGuideCosts(slug) : [];
  const relatedPricing = slug ? getRelatedPricingPage(slug) : undefined;

  if (!guide) {
    return (
      <Layout>
        <Helmet>
          <title>Guida Non Trovata | Idraulici Subito</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Guida non trovata</h1>
          <Link to="/guide">
            <Button>Torna alle Guide</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const canonicalUrl = `https://www.idraulicisubito.com/guide/${guide.slug}`;

  // JSON-LD Article Schema
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1,
    description: guide.metaDescription,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
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
    about: {
      '@type': 'Thing',
      name: guide.tags[0] || guide.title
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    }
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.idraulicisubito.com' },
      { '@type': 'ListItem', position: 2, name: 'Guide', item: 'https://www.idraulicisubito.com/guide' },
      { '@type': 'ListItem', position: 3, name: guide.h1, item: canonicalUrl }
    ]
  };

  // FAQPage JSON-LD for AI-optimized questions
  const faqJsonLd = guideFAQs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guideFAQs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${faq.shortAnswer} ${faq.fullAnswer}`
      }
    }))
  } : null;

  return (
    <Layout>
      <Helmet>
        <title>{guide.metaTitle}</title>
        <meta name="description" content={guide.metaDescription} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={guide.metaTitle} />
        <meta property="og:description" content={guide.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="article:published_time" content={guide.publishedAt} />
        <meta property="article:modified_time" content={guide.updatedAt} />
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        {faqJsonLd && (
          <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        )}
      </Helmet>

      {/* Sticky Mobile CTA */}
      <GuideStickyMobileCTA />

      {/* Breadcrumb */}
      <section className="bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/guide" className="hover:text-foreground">Guide</Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">{guide.h1}</span>
          </nav>
        </div>
      </section>

      {/* Header */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link to="/guide" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="h-4 w-4" />
              Torna alle Guide
            </Link>

            <Badge variant="secondary" className="mb-4">{category?.name}</Badge>

            <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
              {guide.h1}
            </h1>

            <p className="text-base md:text-lg text-muted-foreground mb-6">{guide.excerpt}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {guide.readingTime} min di lettura
              </span>
            </div>
            
            {/* EEAT Author Box */}
            <GuideAuthorBox updatedAt={guide.updatedAt} />
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <GuideTableOfContents 
              items={DEFAULT_TOC_ITEMS} 
              showFAQ={guideFAQs.length > 0} 
            />
          </div>
        </div>
      </section>

      {/* Article Content - Structured Sections */}
      <article className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            
            {/* Section 1: Gravity / Emergency */}
            <GuideSection
              id={guide.sections.gravity.id}
              title={guide.sections.gravity.title}
              icon={AlertTriangle}
              iconBgColor="bg-primary/20"
              iconTextColor="text-primary"
              content={guide.sections.gravity.content}
            />

            {/* CTA after emergency section */}
            <GuideCTABox variant="urgent" />

            {/* Section 2: Immediate Actions */}
            <GuideSection
              id={guide.sections.immediateActions.id}
              title={guide.sections.immediateActions.title}
              icon={CheckCircle}
              iconBgColor="bg-secondary"
              iconTextColor="text-secondary-foreground"
              content={guide.sections.immediateActions.content}
            />

            {/* Minimal CTA */}
            <GuideCTABox variant="minimal" />

            {/* Section 3: What NOT to do */}
            <GuideSection
              id={guide.sections.whatNotToDo.id}
              title={guide.sections.whatNotToDo.title}
              icon={XCircle}
              iconBgColor="bg-destructive/20"
              iconTextColor="text-destructive"
              content={guide.sections.whatNotToDo.content}
            />

            {/* Section 4: When to Call */}
            <GuideSection
              id={guide.sections.whenToCall.id}
              title={guide.sections.whenToCall.title}
              icon={Phone}
              iconBgColor="bg-primary/20"
              iconTextColor="text-primary"
              content={guide.sections.whenToCall.content}
            />

            {/* Section 5: Costs */}
            {guideCosts.length > 0 && (
              <GuideCostsSection 
                costs={guideCosts}
                relatedPricingPage={relatedPricing?.slug}
                relatedPricingTitle={relatedPricing?.title}
              />
            )}

            {/* CTA after costs section */}
            <GuideCTABox variant="default" />

            {/* AI-Optimized FAQ Section */}
            {guideFAQs.length > 0 && (
              <GuideFAQSection faqs={guideFAQs} guideTitle={guide.h1} />
            )}

            {/* Section 6: Find a Plumber in Your City */}
            <GuideCityLinks maxCities={15} />

          </div>
        </div>
      </article>

      {/* Related Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GuideRelatedContent 
              relatedGuides={relatedGuides}
              relatedPricingPage={relatedPricing}
              categoryName={category?.name}
            />
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Tag:</h3>
            <div className="flex flex-wrap gap-2">
              {guide.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom padding for sticky CTA on mobile */}
      <div className="h-20 md:h-0" />
    </Layout>
  );
}
