// Google Analytics 4 tracking utilities
// Configurare il GA_MEASUREMENT_ID nelle variabili d'ambiente

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// GCLID Storage key
const GCLID_STORAGE_KEY = 'gclid';
const GCLID_TIMESTAMP_KEY = 'gclid_timestamp';
const GCLID_EXPIRY_DAYS = 90; // Google Ads attribution window

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

// Capture and store GCLID from URL parameters
export function captureGclid(): string | null {
  if (typeof window === 'undefined') return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  const gclid = urlParams.get('gclid');
  
  if (gclid) {
    // Store GCLID with timestamp
    localStorage.setItem(GCLID_STORAGE_KEY, gclid);
    localStorage.setItem(GCLID_TIMESTAMP_KEY, Date.now().toString());
    console.log('[Analytics] GCLID captured:', gclid);
    return gclid;
  }
  
  return getStoredGclid();
}

// Get stored GCLID if not expired
export function getStoredGclid(): string | null {
  if (typeof window === 'undefined') return null;
  
  const gclid = localStorage.getItem(GCLID_STORAGE_KEY);
  const timestamp = localStorage.getItem(GCLID_TIMESTAMP_KEY);
  
  if (!gclid || !timestamp) return null;
  
  // Check if GCLID has expired
  const storedTime = parseInt(timestamp, 10);
  const expiryTime = GCLID_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  
  if (Date.now() - storedTime > expiryTime) {
    // GCLID expired, remove it
    localStorage.removeItem(GCLID_STORAGE_KEY);
    localStorage.removeItem(GCLID_TIMESTAMP_KEY);
    return null;
  }
  
  return gclid;
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
  
  // Capture GCLID on initialization
  captureGclid();
}

// Track page views (for SPA navigation)
export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  // Capture GCLID on every page view (in case user lands on a different page)
  captureGclid();
  
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

// Track conversions (for Google Ads) with GCLID
export function trackConversion(
  conversionLabel: string,
  value?: number,
  currency: string = 'EUR'
): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  const gclid = getStoredGclid();
  
  const conversionData: Record<string, unknown> = {
    send_to: conversionLabel,
    value: value,
    currency: currency,
  };
  
  // Include GCLID if available for explicit attribution
  if (gclid) {
    conversionData.gclid = gclid;
    console.log('[Analytics] Conversion tracked with GCLID:', gclid);
  }
  
  window.gtag('event', 'conversion', conversionData);
}

// Track Google Ads conversion for lead form success
export function trackAdsConversion(
  interventionType: string,
  city: string
): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  const gclid = getStoredGclid();
  
  // Track conversion to Google Ads (AW-17828815580)
  const conversionData: Record<string, unknown> = {
    send_to: 'AW-17828815580/lead_form_conversion',
    intervention_type: interventionType,
    city: city,
  };
  
  if (gclid) {
    conversionData.gclid = gclid;
    console.log('[Analytics] Ads conversion tracked with GCLID:', gclid);
  }
  
  window.gtag('event', 'conversion', conversionData);
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
    // Track Google Ads conversion with GCLID
    trackAdsConversion(interventionType, city);
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
  
  // Get current GCLID (for debugging)
  getGclid: () => getStoredGclid(),
  
  // Capture GCLID from URL (call on app init)
  captureGclid: () => captureGclid(),
};

export default analytics;
