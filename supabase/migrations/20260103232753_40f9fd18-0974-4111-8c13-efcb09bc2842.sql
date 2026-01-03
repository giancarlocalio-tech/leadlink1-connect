-- Trigger to automatically create a trial subscription when a plumber profile is created
CREATE OR REPLACE FUNCTION public.handle_new_plumber_subscription()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $$
BEGIN
  -- Create a trial subscription for the new plumber
  INSERT INTO public.plumber_subscriptions (
    plumber_id,
    plan_type,
    status,
    is_trial,
    free_requests_remaining,
    monthly_contacts_used,
    exclusive_contacts_used
  ) VALUES (
    NEW.id,
    'basic',
    'pending',
    true,
    3,
    0,
    0
  )
  ON CONFLICT (plumber_id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Create the trigger on plumber_profiles
DROP TRIGGER IF EXISTS on_plumber_profile_created ON public.plumber_profiles;
CREATE TRIGGER on_plumber_profile_created
  AFTER INSERT ON public.plumber_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_plumber_subscription();

-- Also ensure existing plumbers without subscriptions get one
INSERT INTO public.plumber_subscriptions (plumber_id, plan_type, status, is_trial, free_requests_remaining, monthly_contacts_used, exclusive_contacts_used)
SELECT id, 'basic', 'pending', true, 3, 0, 0
FROM public.plumber_profiles pp
WHERE NOT EXISTS (
  SELECT 1 FROM public.plumber_subscriptions ps WHERE ps.plumber_id = pp.id
);