export type InterventionType = 
  | 'perdita_acqua'
  | 'rubinetto_rotto'
  | 'scarico_intasato'
  | 'caldaia'
  | 'altro';

export type UrgencyType = 
  | 'subito'
  | 'entro_24_ore'
  | 'prossimi_giorni';

export type PropertyType = 
  | 'casa'
  | 'appartamento'
  | 'negozio';

export type AccessibilityType = 
  | 'facile'
  | 'media'
  | 'difficile';

export type AvailabilityType = 
  | 'giorni_feriali'
  | 'weekend'
  | 'emergenze';

export type SubscriptionPlan = 'basic' | 'medium' | 'premium';
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired' | 'pending';

export interface ServiceRequest {
  id: string;
  intervention_type: InterventionType;
  city: string;
  description: string;
  urgency: UrgencyType;
  property_type: PropertyType;
  accessibility: AccessibilityType;
  client_name: string;
  client_phone: string;
  client_email?: string;
  privacy_accepted: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  assigned_plumber_id?: string;
  is_exclusive: boolean;
  assigned_at?: string;
}

export interface PlumberProfile {
  id: string;
  user_id: string;
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  main_city: string;
  description?: string;
  intervention_types: InterventionType[];
  availability: AvailabilityType[];
  service_areas: string[];
  email_verified: boolean;
  photo_url?: string;
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionPlanInfo {
  id: string;
  plan_type: SubscriptionPlan;
  name: string;
  description?: string;
  price_monthly: number;
  max_exclusive_contacts?: number;
  contacts_are_exclusive: boolean;
  created_at: string;
  updated_at: string;
}

export interface PlumberSubscription {
  id: string;
  plumber_id: string;
  plan_type: SubscriptionPlan;
  status: SubscriptionStatus;
  current_period_start?: string;
  current_period_end?: string;
  exclusive_contacts_used: number;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ContactUnlock {
  id: string;
  plumber_id: string;
  request_id: string;
  is_exclusive: boolean;
  unlocked_at: string;
}

export interface RequestFormData {
  interventionType: InterventionType | '';
  city: string;
  description: string;
  urgency: UrgencyType | '';
  propertyType: PropertyType | '';
  accessibility: AccessibilityType | '';
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  privacyAccepted: boolean;
}

export const INTERVENTION_LABELS: Record<InterventionType, string> = {
  perdita_acqua: 'Perdita d\'acqua',
  rubinetto_rotto: 'Rubinetto rotto',
  scarico_intasato: 'Scarico intasato',
  caldaia: 'Caldaia',
  altro: 'Altro',
};

export const URGENCY_LABELS: Record<UrgencyType, string> = {
  subito: 'Subito',
  entro_24_ore: 'Entro 24 ore',
  prossimi_giorni: 'Nei prossimi giorni',
};

export const PROPERTY_LABELS: Record<PropertyType, string> = {
  casa: 'Casa',
  appartamento: 'Appartamento',
  negozio: 'Negozio',
};

export const ACCESSIBILITY_LABELS: Record<AccessibilityType, string> = {
  facile: 'Facile',
  media: 'Media',
  difficile: 'Difficile',
};

export const AVAILABILITY_LABELS: Record<AvailabilityType, string> = {
  giorni_feriali: 'Giorni feriali',
  weekend: 'Weekend',
  emergenze: 'Emergenze',
};

export const SUBSCRIPTION_LABELS: Record<SubscriptionPlan, string> = {
  basic: 'Basic',
  medium: 'Medium',
  premium: 'Premium',
};
