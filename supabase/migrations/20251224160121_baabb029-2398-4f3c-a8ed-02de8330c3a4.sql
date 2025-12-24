-- 1) Make SELECT policies explicitly authenticated-only (and explicitly deny anon)

-- service_requests: keep INSERT for public, but restrict SELECT to authenticated contexts only
DROP POLICY IF EXISTS "Admins can manage all requests" ON public.service_requests;
CREATE POLICY "Admins can manage all requests"
ON public.service_requests
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Ensure plumbers can only see assigned/accepted requests (no public browsing of PII)
DROP POLICY IF EXISTS "Plumbers can view their assigned requests" ON public.service_requests;
CREATE POLICY "Plumbers can view their assigned requests"
ON public.service_requests
FOR SELECT
TO authenticated
USING (
  (assigned_plumber_id IN (
    SELECT pp.id FROM public.plumber_profiles pp WHERE pp.user_id = auth.uid()
  ))
  OR
  (accepted_by_id IN (
    SELECT pp.id FROM public.plumber_profiles pp WHERE pp.user_id = auth.uid()
  ))
  OR
  public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Explicitly deny anon SELECT (defense-in-depth + satisfies scanners)
DROP POLICY IF EXISTS "Deny anon select service_requests" ON public.service_requests;
CREATE POLICY "Deny anon select service_requests"
ON public.service_requests
FOR SELECT
TO anon
USING (false);

-- Keep existing public INSERT policy, but ensure it targets anon and authenticated explicitly
DROP POLICY IF EXISTS "Anyone can create service requests" ON public.service_requests;
CREATE POLICY "Anyone can create service requests"
ON public.service_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (privacy_accepted = true);


-- plumber_profiles: only owner + admin; explicitly deny anon
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.plumber_profiles;
CREATE POLICY "Admins can view all profiles"
ON public.plumber_profiles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Plumbers can view their own profile" ON public.plumber_profiles;
CREATE POLICY "Plumbers can view their own profile"
ON public.plumber_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Deny anon select plumber_profiles" ON public.plumber_profiles;
CREATE POLICY "Deny anon select plumber_profiles"
ON public.plumber_profiles
FOR SELECT
TO anon
USING (false);

-- Keep existing INSERT/UPDATE/DELETE policies as-is, but scope them to authenticated for clarity
DROP POLICY IF EXISTS "Plumbers can insert their own profile" ON public.plumber_profiles;
CREATE POLICY "Plumbers can insert their own profile"
ON public.plumber_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Plumbers can update their own profile" ON public.plumber_profiles;
CREATE POLICY "Plumbers can update their own profile"
ON public.plumber_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can update all profiles" ON public.plumber_profiles;
CREATE POLICY "Admins can update all profiles"
ON public.plumber_profiles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can delete profiles" ON public.plumber_profiles;
CREATE POLICY "Admins can delete profiles"
ON public.plumber_profiles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));


-- 2) Server-side validation for plumber_profiles (trigger-based, avoids CHECK immutability issues)
CREATE OR REPLACE FUNCTION public.validate_plumber_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_phone text;
  v_email text;
  v_city text;
BEGIN
  -- Trim key text fields
  NEW.full_name := btrim(NEW.full_name);
  NEW.business_name := btrim(NEW.business_name);
  NEW.phone := btrim(NEW.phone);
  NEW.email := btrim(NEW.email);
  NEW.main_city := btrim(NEW.main_city);

  IF NEW.full_name IS NULL OR length(NEW.full_name) = 0 OR length(NEW.full_name) > 200 THEN
    RAISE EXCEPTION 'full_name invalid';
  END IF;

  IF NEW.business_name IS NULL OR length(NEW.business_name) = 0 OR length(NEW.business_name) > 200 THEN
    RAISE EXCEPTION 'business_name invalid';
  END IF;

  IF NEW.main_city IS NULL OR length(NEW.main_city) = 0 OR length(NEW.main_city) > 120 THEN
    RAISE EXCEPTION 'main_city invalid';
  END IF;

  IF NEW.phone IS NULL OR length(NEW.phone) < 7 OR length(NEW.phone) > 30 OR NEW.phone !~ '^[+0-9\s()\-]{7,30}$' THEN
    RAISE EXCEPTION 'phone invalid';
  END IF;

  IF NEW.email IS NULL OR length(NEW.email) > 255 OR NEW.email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'email invalid';
  END IF;

  IF NEW.description IS NOT NULL AND length(NEW.description) > 2000 THEN
    RAISE EXCEPTION 'description too long';
  END IF;

  -- Validate service_areas entries length (if present)
  IF NEW.service_areas IS NOT NULL THEN
    IF array_length(NEW.service_areas, 1) > 80 THEN
      RAISE EXCEPTION 'service_areas too many';
    END IF;
    -- ensure no ridiculously long entries
    FOR v_city IN SELECT unnest(NEW.service_areas)
    LOOP
      IF v_city IS NULL OR length(btrim(v_city)) = 0 OR length(btrim(v_city)) > 120 THEN
        RAISE EXCEPTION 'service_area invalid';
      END IF;
    END LOOP;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_validate_plumber_profile ON public.plumber_profiles;
CREATE TRIGGER trg_validate_plumber_profile
BEFORE INSERT OR UPDATE
ON public.plumber_profiles
FOR EACH ROW
EXECUTE FUNCTION public.validate_plumber_profile();
