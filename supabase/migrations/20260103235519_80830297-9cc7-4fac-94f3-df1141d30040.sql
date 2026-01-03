-- Create a function to get available requests for trial plumbers
-- These are requests in their service areas that haven't been accepted yet

CREATE OR REPLACE FUNCTION public.get_trial_available_requests(p_plumber_id uuid)
RETURNS TABLE (
  id uuid,
  intervention_type intervention_type,
  urgency urgency_type,
  property_type property_type,
  accessibility accessibility_type,
  city text,
  description text,
  created_at timestamp with time zone,
  is_exclusive boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_service_areas text[];
  v_is_trial boolean;
BEGIN
  -- Check if plumber is in trial mode
  SELECT ps.is_trial, pp.service_areas 
  INTO v_is_trial, v_service_areas
  FROM plumber_subscriptions ps
  JOIN plumber_profiles pp ON pp.id = ps.plumber_id
  WHERE ps.plumber_id = p_plumber_id;
  
  -- Only return results for trial users
  IF NOT v_is_trial THEN
    RETURN;
  END IF;
  
  -- Return available requests in the plumber's service areas
  -- that are either 'new' or 'assigned' but not yet 'accepted'
  -- and not already accepted by another trial plumber
  RETURN QUERY
  SELECT 
    sr.id,
    sr.intervention_type,
    sr.urgency,
    sr.property_type,
    sr.accessibility,
    sr.city,
    sr.description,
    sr.created_at,
    sr.is_exclusive
  FROM service_requests sr
  WHERE sr.city = ANY(v_service_areas)
    AND sr.status IN ('new', 'assigned')
    -- Exclude requests already accepted
    AND sr.accepted_by_id IS NULL
    -- Exclude requests this plumber already tried to accept
    AND NOT EXISTS (
      SELECT 1 FROM contact_unlocks cu 
      WHERE cu.request_id = sr.id AND cu.plumber_id = p_plumber_id
    )
  ORDER BY 
    CASE sr.urgency 
      WHEN 'subito' THEN 1 
      WHEN 'entro_24_ore' THEN 2 
      ELSE 3 
    END,
    sr.created_at DESC;
END;
$$;

-- Create a function for trial plumbers to claim a request (first come, first served)
CREATE OR REPLACE FUNCTION public.trial_claim_request(p_plumber_id uuid, p_request_id uuid)
RETURNS TABLE (
  success boolean,
  message text,
  client_name text,
  client_phone text,
  client_email text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_is_trial boolean;
  v_free_requests_remaining integer;
  v_request_status text;
  v_request_city text;
  v_service_areas text[];
  v_accepted_by uuid;
  v_client_name text;
  v_client_phone text;
  v_client_email text;
BEGIN
  -- Check if plumber is in trial mode and has remaining requests
  SELECT ps.is_trial, ps.free_requests_remaining, pp.service_areas
  INTO v_is_trial, v_free_requests_remaining, v_service_areas
  FROM plumber_subscriptions ps
  JOIN plumber_profiles pp ON pp.id = ps.plumber_id
  WHERE ps.plumber_id = p_plumber_id;
  
  IF NOT v_is_trial THEN
    RETURN QUERY SELECT false, 'Non sei in modalità trial'::text, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  IF COALESCE(v_free_requests_remaining, 0) <= 0 THEN
    RETURN QUERY SELECT false, 'Hai esaurito le richieste gratuite. Scegli un piano per continuare.'::text, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  -- Check request status and if it's in the plumber's service area
  SELECT sr.status, sr.city, sr.accepted_by_id, sr.client_name, sr.client_phone, sr.client_email
  INTO v_request_status, v_request_city, v_accepted_by, v_client_name, v_client_phone, v_client_email
  FROM service_requests sr
  WHERE sr.id = p_request_id
  FOR UPDATE; -- Lock the row to prevent race conditions
  
  IF v_request_status IS NULL THEN
    RETURN QUERY SELECT false, 'Richiesta non trovata'::text, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  IF v_accepted_by IS NOT NULL THEN
    RETURN QUERY SELECT false, 'Questa richiesta è già stata accettata da un altro idraulico'::text, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  IF NOT (v_request_city = ANY(v_service_areas)) THEN
    RETURN QUERY SELECT false, 'Questa richiesta non è nella tua zona di lavoro'::text, NULL::text, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  -- Claim the request
  UPDATE service_requests
  SET 
    status = 'accepted',
    accepted_at = now(),
    accepted_by_id = p_plumber_id,
    is_exclusive = true
  WHERE id = p_request_id;
  
  -- Decrement free requests
  UPDATE plumber_subscriptions
  SET free_requests_remaining = GREATEST(0, COALESCE(free_requests_remaining, 0) - 1)
  WHERE plumber_id = p_plumber_id;
  
  -- Create contact unlock record
  INSERT INTO contact_unlocks (plumber_id, request_id, is_exclusive)
  VALUES (p_plumber_id, p_request_id, true)
  ON CONFLICT DO NOTHING;
  
  -- Log the acceptance
  INSERT INTO assignment_logs (request_id, plumber_id, plumber_plan, expires_at, responded, response_type, response_at)
  VALUES (p_request_id, p_plumber_id, 'basic', now(), true, 'accepted', now());
  
  RETURN QUERY SELECT true, 'Richiesta accettata con successo!'::text, v_client_name, v_client_phone, v_client_email;
END;
$$;