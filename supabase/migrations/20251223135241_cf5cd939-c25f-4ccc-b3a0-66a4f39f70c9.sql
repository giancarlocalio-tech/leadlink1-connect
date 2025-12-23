-- Enum for subscription plans
CREATE TYPE public.subscription_plan AS ENUM ('basic', 'medium', 'premium');

-- Subscription status
CREATE TYPE public.subscription_status AS ENUM ('active', 'cancelled', 'expired', 'pending');

-- Subscription plans configuration
CREATE TABLE public.subscription_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_type subscription_plan NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  price_monthly DECIMAL(10,2) NOT NULL,
  max_exclusive_contacts INTEGER, -- NULL means unlimited
  contacts_are_exclusive BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Plumber subscriptions
CREATE TABLE public.plumber_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plumber_id UUID NOT NULL REFERENCES public.plumber_profiles(id) ON DELETE CASCADE,
  plan_type subscription_plan NOT NULL,
  status subscription_status NOT NULL DEFAULT 'pending',
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  exclusive_contacts_used INTEGER NOT NULL DEFAULT 0,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(plumber_id)
);

-- Contact unlocks tracking (when plumber unlocks client details)
CREATE TABLE public.contact_unlocks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plumber_id UUID NOT NULL REFERENCES public.plumber_profiles(id) ON DELETE CASCADE,
  request_id UUID NOT NULL REFERENCES public.service_requests(id) ON DELETE CASCADE,
  is_exclusive BOOLEAN NOT NULL DEFAULT false,
  unlocked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(plumber_id, request_id)
);

-- Add columns to service_requests for exclusive assignment
ALTER TABLE public.service_requests 
ADD COLUMN assigned_plumber_id UUID REFERENCES public.plumber_profiles(id),
ADD COLUMN is_exclusive BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN assigned_at TIMESTAMP WITH TIME ZONE;

-- Add columns to plumber_profiles for complete profile
ALTER TABLE public.plumber_profiles
ADD COLUMN photo_url TEXT,
ADD COLUMN rating DECIMAL(2,1) DEFAULT 0,
ADD COLUMN review_count INTEGER DEFAULT 0;

-- Enable RLS
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plumber_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_unlocks ENABLE ROW LEVEL SECURITY;

-- Subscription plans: everyone can view
CREATE POLICY "Anyone can view subscription plans"
ON public.subscription_plans
FOR SELECT
USING (true);

-- Subscription plans: only admins can modify
CREATE POLICY "Admins can manage subscription plans"
ON public.subscription_plans
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Plumber subscriptions: plumber can view own subscription
CREATE POLICY "Plumbers can view own subscription"
ON public.plumber_subscriptions
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.plumber_profiles
  WHERE plumber_profiles.id = plumber_subscriptions.plumber_id
  AND plumber_profiles.user_id = auth.uid()
));

-- Plumber subscriptions: admins can manage all
CREATE POLICY "Admins can manage all subscriptions"
ON public.plumber_subscriptions
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Contact unlocks: plumber can view own unlocks
CREATE POLICY "Plumbers can view own unlocks"
ON public.contact_unlocks
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.plumber_profiles
  WHERE plumber_profiles.id = contact_unlocks.plumber_id
  AND plumber_profiles.user_id = auth.uid()
));

-- Contact unlocks: plumber can create own unlocks
CREATE POLICY "Plumbers can create own unlocks"
ON public.contact_unlocks
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.plumber_profiles
  WHERE plumber_profiles.id = contact_unlocks.plumber_id
  AND plumber_profiles.user_id = auth.uid()
));

-- Admins can manage all contact unlocks
CREATE POLICY "Admins can manage all contact unlocks"
ON public.contact_unlocks
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Triggers for updated_at
CREATE TRIGGER update_subscription_plans_updated_at
BEFORE UPDATE ON public.subscription_plans
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_plumber_subscriptions_updated_at
BEFORE UPDATE ON public.plumber_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default plans
INSERT INTO public.subscription_plans (plan_type, name, description, price_monthly, max_exclusive_contacts, contacts_are_exclusive) VALUES
('basic', 'Basic', 'Accesso a tutti i contatti condivisi nella tua zona', 29.99, NULL, false),
('medium', 'Medium', 'Contatti esclusivi - massimo 5 al mese', 79.99, 5, true),
('premium', 'Premium', 'Contatti esclusivi illimitati', 149.99, NULL, true);