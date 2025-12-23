-- Enum per i ruoli utente
CREATE TYPE public.app_role AS ENUM ('admin', 'plumber');

-- Enum per tipi di intervento
CREATE TYPE public.intervention_type AS ENUM (
  'perdita_acqua',
  'rubinetto_rotto',
  'scarico_intasato',
  'caldaia',
  'altro'
);

-- Enum per urgenza
CREATE TYPE public.urgency_type AS ENUM (
  'subito',
  'entro_24_ore',
  'prossimi_giorni'
);

-- Enum per tipo abitazione
CREATE TYPE public.property_type AS ENUM (
  'casa',
  'appartamento',
  'negozio'
);

-- Enum per accessibilità
CREATE TYPE public.accessibility_type AS ENUM (
  'facile',
  'media',
  'difficile'
);

-- Enum per disponibilità idraulico
CREATE TYPE public.availability_type AS ENUM (
  'giorni_feriali',
  'weekend',
  'emergenze'
);

-- Tabella profili idraulici
CREATE TABLE public.plumber_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  main_city TEXT NOT NULL,
  description TEXT,
  intervention_types intervention_type[] DEFAULT '{}',
  availability availability_type[] DEFAULT '{}',
  service_areas TEXT[] DEFAULT '{}',
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabella ruoli utente (separata per sicurezza)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Tabella richieste clienti
CREATE TABLE public.service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  intervention_type intervention_type NOT NULL,
  city TEXT NOT NULL,
  description TEXT NOT NULL,
  urgency urgency_type NOT NULL,
  property_type property_type NOT NULL,
  accessibility accessibility_type NOT NULL,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  client_email TEXT,
  privacy_accepted BOOLEAN NOT NULL DEFAULT false,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabella contatti (quando un idraulico contatta un cliente)
CREATE TABLE public.contact_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plumber_id UUID REFERENCES public.plumber_profiles(id) ON DELETE CASCADE NOT NULL,
  request_id UUID REFERENCES public.service_requests(id) ON DELETE CASCADE NOT NULL,
  contacted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (plumber_id, request_id)
);

-- Enable RLS
ALTER TABLE public.plumber_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_logs ENABLE ROW LEVEL SECURITY;

-- Funzione per verificare ruoli (security definer)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Funzione per verificare se utente è idraulico
CREATE OR REPLACE FUNCTION public.is_plumber(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.plumber_profiles
    WHERE user_id = _user_id
  )
$$;

-- RLS Policies per plumber_profiles
CREATE POLICY "Plumbers can view their own profile"
ON public.plumber_profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Plumbers can update their own profile"
ON public.plumber_profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Plumbers can insert their own profile"
ON public.plumber_profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
ON public.plumber_profiles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all profiles"
ON public.plumber_profiles FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete profiles"
ON public.plumber_profiles FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies per user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies per service_requests
-- Chiunque può inserire richieste (clienti non registrati)
CREATE POLICY "Anyone can create service requests"
ON public.service_requests FOR INSERT
TO anon, authenticated
WITH CHECK (privacy_accepted = true);

-- Idraulici possono vedere le richieste (senza contatti completi inizialmente)
CREATE POLICY "Plumbers can view requests"
ON public.service_requests FOR SELECT
TO authenticated
USING (public.is_plumber(auth.uid()));

-- Admin può vedere e gestire tutte le richieste
CREATE POLICY "Admins can manage all requests"
ON public.service_requests FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies per contact_logs
CREATE POLICY "Plumbers can log their contacts"
ON public.contact_logs FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.plumber_profiles
    WHERE id = plumber_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Plumbers can view their contacts"
ON public.contact_logs FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.plumber_profiles
    WHERE id = plumber_id AND user_id = auth.uid()
  )
);

CREATE POLICY "Admins can view all contacts"
ON public.contact_logs FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger per aggiornare updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_plumber_profiles_updated_at
BEFORE UPDATE ON public.plumber_profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_service_requests_updated_at
BEFORE UPDATE ON public.service_requests
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();