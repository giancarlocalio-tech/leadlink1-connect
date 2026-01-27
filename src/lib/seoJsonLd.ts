// Centralized JSON-LD structured data generator
// Ensures consistent schema markup across all pages

const BASE_URL = 'https://www.idraulicisubito.com';

interface LocalBusinessOptions {
  name: string;
  description: string;
  url: string;
  areaServed?: AreaServed[];
  serviceTypes?: string[];
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
  };
}

interface AreaServed {
  type: 'Country' | 'City';
  name: string;
  containedIn?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

// Generate Service schema (more appropriate for service aggregators)
function generateService(options: LocalBusinessOptions) {
  const areaServed =
    options.areaServed?.map((area) => {
      if (area.type === 'Country') {
        return { "@type": "Country", "name": area.name };
      }
      return area.containedIn
        ? {
            "@type": "City",
            "name": area.name,
            "containedInPlace": {
              "@type": "AdministrativeArea",
              "name": area.containedIn,
            },
          }
        : { "@type": "City", "name": area.name };
    }) || [{ "@type": "Country", "name": "Italia" }];

  const baseService = {
    "@type": "Service",
    "@id": `${options.url}#service`,
    "name": options.name,
    "description": options.description,
    "url": options.url,
    "areaServed": areaServed.length === 1 ? areaServed[0] : areaServed,
    "serviceType": options.serviceTypes || [
      "Pronto intervento idraulico",
      "Riparazione perdite acqua",
      "Installazione impianti idraulici",
    ],
    "provider": {
      "@type": "Organization",
      "@id": `${BASE_URL}#organization`,
      "name": "Idraulici Subito",
      "url": BASE_URL,
      "logo": `${BASE_URL}/favicon.png`,
    },
  };

  // Add aggregateRating if provided - this enables rich snippets with stars in Google
  if (options.aggregateRating) {
    return {
      ...baseService,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": options.aggregateRating.ratingValue,
        "reviewCount": options.aggregateRating.reviewCount,
        "bestRating": "5",
        "worstRating": "1"
      }
    };
  }

  return baseService;
}

// Generate WebPage schema
function generateWebPage(options: LocalBusinessOptions) {
  return {
    "@type": "WebPage",
    "@id": `${options.url}#webpage`,
    "url": options.url,
    "name": options.name,
    "description": options.description,
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${BASE_URL}#website`,
      "url": BASE_URL,
      "name": "Idraulici Subito",
    },
    "about": {
      "@id": `${options.url}#service`,
    },
  };
}

// Generate FAQPage schema
function generateFAQPage(url: string, faqs: FAQItem[]) {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

// Generate BreadcrumbList schema
function generateBreadcrumbs(items: BreadcrumbItem[]) {
  const fullItems = [{ name: "Home", url: BASE_URL }, ...items];

  return {
    "@type": "BreadcrumbList",
    "@id": `${items[items.length - 1]?.url || BASE_URL}#breadcrumb`,
    "itemListElement": fullItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

// Generate Service schema with Offer for pricing pages
export function generateServiceWithOffer(options: {
  name: string;
  description: string;
  url: string;
  priceRange: string;
  priceCurrency?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${options.url}#service`,
    "name": options.name,
    "description": options.description,
    "url": options.url,
    "areaServed": {
      "@type": "Country",
      "name": "Italia"
    },
    "provider": {
      "@type": "Organization",
      "@id": `${BASE_URL}#organization`,
      "name": "Idraulici Subito",
      "url": BASE_URL,
      "logo": `${BASE_URL}/favicon.png`
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Prezzi ${options.name}`,
      "itemListElement": [{
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": options.name
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": options.priceCurrency || "EUR",
          "price": options.priceRange
        }
      }]
    }
  };
}

// Generate complete JSON-LD objects (array format = best compatibility with Google)
export function generateJsonLd(
  serviceOptions: LocalBusinessOptions,
  faqs: FAQItem[],
  breadcrumbs: BreadcrumbItem[]
) {
  return [
    { "@context": "https://schema.org", ...generateWebPage(serviceOptions) },
    { "@context": "https://schema.org", ...generateService(serviceOptions) },
    { "@context": "https://schema.org", ...generateFAQPage(serviceOptions.url, faqs) },
    { "@context": "https://schema.org", ...generateBreadcrumbs(breadcrumbs) },
  ];
}

// Preset FAQs for common page types
export function getKeywordFAQs(serviceName: string) {
  return [
    {
      question: `Quanto costa un servizio di ${serviceName.toLowerCase()}?`,
      answer: `Il costo per ${serviceName.toLowerCase()} varia in base al tipo di intervento. Su Idraulici Subito puoi richiedere preventivi gratuiti e confrontare le offerte dei professionisti della tua zona.`
    },
    {
      question: `Come trovo un professionista affidabile per ${serviceName.toLowerCase()}?`,
      answer: `Su Idraulici Subito tutti i professionisti sono verificati e recensiti dai clienti. Inserisci la tua richiesta e riceverai contatti da esperti qualificati nella tua zona.`
    },
    {
      question: "Quanto tempo ci vuole per ricevere un preventivo?",
      answer: "In media ricevi una risposta entro 15 minuti dalla tua richiesta. Per emergenze urgenti, i nostri professionisti premium rispondono ancora più velocemente."
    }
  ];
}

/**
 * Generate 7 FAQ items for city landing pages
 * Uses variations to avoid duplicate content across cities
 */
export function getCityFAQs(serviceName: string, cityName: string): FAQItem[] {
  const serviceLC = serviceName.toLowerCase();
  
  return [
    {
      question: `Quanto costa un ${serviceLC} a ${cityName}?`,
      answer: `I costi per un ${serviceLC} a ${cityName} variano in base alla complessità dell'intervento. Un intervento semplice può costare tra 50€ e 100€, mentre lavori più complessi possono superare i 200€. Su Idraulici Subito puoi richiedere preventivi gratuiti e confrontare le offerte dei professionisti verificati della tua zona.`
    },
    {
      question: `Come trovo un ${serviceLC} affidabile a ${cityName}?`,
      answer: `Su Idraulici Subito tutti i professionisti di ${cityName} sono verificati e recensiti dai clienti. Basta inserire la tua richiesta specificando il problema e riceverai contatti da ${serviceLC}i qualificati della zona, con valutazioni e tempi di risposta visibili.`
    },
    {
      question: `Quanto tempo ci vuole per ricevere assistenza a ${cityName}?`,
      answer: `I nostri professionisti a ${cityName} rispondono in media entro 15-30 minuti. Per emergenze urgenti come perdite d'acqua o allagamenti, i professionisti premium garantiscono interventi anche in meno di un'ora.`
    },
    {
      question: `È possibile avere un ${serviceLC} a ${cityName} nei weekend o festivi?`,
      answer: `Sì, molti professionisti su Idraulici Subito offrono disponibilità 24/7 a ${cityName}, inclusi weekend e giorni festivi. Gli interventi fuori orario possono prevedere una maggiorazione tariffaria. Specifica l'urgenza nella richiesta per ricevere risposte mirate.`
    },
    {
      question: `Quali sono i problemi idraulici più comuni a ${cityName}?`,
      answer: `A ${cityName} i problemi più frequenti includono perdite d'acqua da tubature, scarichi intasati, guasti alla caldaia e rubinetti che perdono. Gli edifici più datati possono presentare anche problemi di tubazioni obsolete. I nostri professionisti sono esperti in tutti questi interventi.`
    },
    {
      question: `Come funziona la richiesta di preventivo per ${serviceLC} a ${cityName}?`,
      answer: `Il processo è semplice: descrivi il problema, indica la tua zona a ${cityName} e l'urgenza. Riceverai contatti da professionisti verificati che operano nella tua area. Il servizio di richiesta preventivo è completamente gratuito e senza impegno.`
    },
    {
      question: `I professionisti a ${cityName} rilasciano fattura e garanzia?`,
      answer: `Sì, tutti i professionisti verificati su Idraulici Subito a ${cityName} rilasciano regolare fattura e offrono garanzia sui lavori eseguiti. Prima di accettare un preventivo, puoi sempre chiedere conferma delle condizioni di garanzia.`
    }
  ];
}

export { BASE_URL };
