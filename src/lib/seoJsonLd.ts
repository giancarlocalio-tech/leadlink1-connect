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

export function getCityFAQs(serviceName: string, cityName: string) {
  return [
    {
      question: `Quanto costa un ${serviceName.toLowerCase()} a ${cityName}?`,
      answer: `Il costo di un ${serviceName.toLowerCase()} a ${cityName} varia in base al tipo di intervento. Su Idraulici Subito puoi richiedere preventivi gratuiti e confrontare le offerte dei professionisti della tua zona.`
    },
    {
      question: `Come trovo un ${serviceName.toLowerCase()} affidabile a ${cityName}?`,
      answer: `Su Idraulici Subito tutti i professionisti sono verificati e recensiti dai clienti. Inserisci la tua richiesta e riceverai contatti da ${serviceName.toLowerCase()}i qualificati di ${cityName} e provincia.`
    },
    {
      question: `Quanto tempo ci vuole per ricevere un preventivo a ${cityName}?`,
      answer: `In media ricevi una risposta entro 15 minuti dalla tua richiesta. Per emergenze urgenti a ${cityName}, i nostri professionisti premium rispondono ancora più velocemente.`
    }
  ];
}

export { BASE_URL };
