
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT c.relname, c.relkind
    FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
    WHERE n.nspname='public'
      AND c.relname IN (
        'assignment_config','assignment_logs','contact_logs','contact_unlocks',
        'conversation_messages','conversations','credit_packages','credit_transactions',
        'intervention_pricing','italian_cities','plumber_credits','plumber_profiles',
        'plumber_subscriptions','service_requests','service_requests_plumber_view',
        'service_requests_public_meta','subscription_plans','unlock_costs',
        'unregistered_plumbers','whatsapp_logs'
      )
  LOOP
    IF r.relkind = 'v' THEN
      EXECUTE format('DROP VIEW IF EXISTS public.%I CASCADE', r.relname);
    ELSIF r.relkind = 'm' THEN
      EXECUTE format('DROP MATERIALIZED VIEW IF EXISTS public.%I CASCADE', r.relname);
    ELSE
      EXECUTE format('DROP TABLE IF EXISTS public.%I CASCADE', r.relname);
    END IF;
  END LOOP;
END $$;
