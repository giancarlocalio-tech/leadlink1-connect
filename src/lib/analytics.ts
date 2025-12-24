// Google Analytics 4 tracking utilities
// Configurare il GA_MEASUREMENT_ID nelle variabili d'ambiente

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Event types for type safety
export type AnalyticsEvent = 
  | 'page_view'
  | 'lead_form_start'
  | 'lead_form_step'
  | 'lead_form_submit'
  | 'lead_form_success'
  | 'plumber_registration_start'
  | 'plumber_registration_submit'
  | 'cta_click'
  | 'phone_click'
  | 'scroll_depth';

interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

// Initialize GA4 (called from index.html)
export function initGA(measurementId: string): void {
  if (typeof window === 'undefined') return;
  
  // Create script element for gtag
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false, // We'll handle page views manually for SPA
  });
}

// Track page views (for SPA navigation)
export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
}

// Track custom events
export function trackEvent(
  eventName: AnalyticsEvent,
  params?: EventParams
): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', eventName, params);
}

// Track conversions (for Google Ads)
export function trackConversion(
  conversionLabel: string,
  value?: number,
  currency: string = 'EUR'
): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'conversion', {
    send_to: conversionLabel,
    value: value,
    currency: currency,
  });
}

// Specific tracking functions for key events
export const analytics = {
  // Track when user starts filling the lead form
  leadFormStart: (interventionType?: string, source?: string) => {
    trackEvent('lead_form_start', {
      intervention_type: interventionType,
      source: source || 'organic',
    });
  },

  // Track form step progression
  leadFormStep: (step: number, stepName: string) => {
    trackEvent('lead_form_step', {
      step_number: step,
      step_name: stepName,
    });
  },

  // Track form submission
  leadFormSubmit: (interventionType: string, city: string, urgency: string) => {
    trackEvent('lead_form_submit', {
      intervention_type: interventionType,
      city: city,
      urgency: urgency,
    });
  },

  // Track successful lead generation (main conversion)
  leadFormSuccess: (interventionType: string, city: string) => {
    trackEvent('lead_form_success', {
      intervention_type: interventionType,
      city: city,
    });
    // Also track as Google Ads conversion if configured
    // trackConversion('AW-XXXXXXXXX/XXXXXXXXX');
  },

  // Track plumber registration
  plumberRegistrationStart: () => {
    trackEvent('plumber_registration_start');
  },

  plumberRegistrationSubmit: (city: string) => {
    trackEvent('plumber_registration_submit', {
      city: city,
    });
  },

  // Track CTA clicks
  ctaClick: (ctaName: string, location: string) => {
    trackEvent('cta_click', {
      cta_name: ctaName,
      location: location,
    });
  },

  // Track page views for SPA
  pageView: (path: string, title?: string) => {
    trackPageView(path, title);
  },
};

export default analytics;
