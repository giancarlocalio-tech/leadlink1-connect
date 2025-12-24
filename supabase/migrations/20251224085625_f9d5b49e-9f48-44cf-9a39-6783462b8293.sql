-- Create a trigger function to assign the 'plumber' role when a plumber profile is created
CREATE OR REPLACE FUNCTION public.handle_new_plumber_profile()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert the 'plumber' role for this user
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.user_id, 'plumber')
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Create trigger to run after inserting a plumber profile
DROP TRIGGER IF EXISTS on_plumber_profile_created ON public.plumber_profiles;
CREATE TRIGGER on_plumber_profile_created
  AFTER INSERT ON public.plumber_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_plumber_profile();