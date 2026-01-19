-- Tabella per idraulici non registrati (lead da Resend/WhatsApp)
CREATE TABLE public.unregistered_plumbers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Napoli',
  is_active BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index per città per query veloci
CREATE INDEX idx_unregistered_plumbers_city ON public.unregistered_plumbers (city);
CREATE INDEX idx_unregistered_plumbers_active ON public.unregistered_plumbers (is_active) WHERE is_active = true;

-- Unique constraint sul telefono per evitare duplicati
ALTER TABLE public.unregistered_plumbers ADD CONSTRAINT unregistered_plumbers_phone_unique UNIQUE (phone);

-- Enable RLS
ALTER TABLE public.unregistered_plumbers ENABLE ROW LEVEL SECURITY;

-- Solo admin possono gestire questa tabella (signature corretta: uuid, role)
CREATE POLICY "Admins can manage unregistered plumbers"
ON public.unregistered_plumbers
FOR ALL
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Trigger per updated_at
CREATE TRIGGER update_unregistered_plumbers_updated_at
BEFORE UPDATE ON public.unregistered_plumbers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Commento sulla tabella
COMMENT ON TABLE public.unregistered_plumbers IS 'Lead di idraulici non registrati a cui inviare WhatsApp per nuove richieste';