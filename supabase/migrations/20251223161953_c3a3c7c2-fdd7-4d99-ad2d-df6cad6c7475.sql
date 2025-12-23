-- Add trial_ends_at column to track 7-day free trial period
ALTER TABLE public.plumber_subscriptions 
ADD COLUMN trial_ends_at TIMESTAMP WITH TIME ZONE;

-- Add a comment explaining the field
COMMENT ON COLUMN public.plumber_subscriptions.trial_ends_at IS 'End date of the 7-day free trial period';