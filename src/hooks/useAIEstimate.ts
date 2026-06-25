import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AIEstimate {
  priceMin: number;
  priceMax: number;
  durationMinHours: number;
  durationMaxHours: number;
  diagnosis: string;
  plumberSteps: string[];
  urgencyLevel: 'bassa' | 'media' | 'alta' | 'critica' | string;
  urgencyReason: string;
  riskIfPostponed: string;
  confidence: number;
  notes?: string;
}

export interface EstimateInput {
  interventionType: string;
  description: string;
  city: string;
  urgency?: string;
  answers?: Array<{ questionId: string; questionTitle?: string; answer: string }>;
  photoUrls?: string[];
}

export function useAIEstimate() {
  const [estimate, setEstimate] = useState<AIEstimate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (input: EstimateInput) => {
    setLoading(true);
    setError(null);
    setEstimate(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('ai-estimate', {
        body: input,
      });
      if (fnError) throw new Error(fnError.message);
      if ((data as any)?.error) throw new Error((data as any).error);
      const est = (data as any)?.estimate as AIEstimate;
      if (!est) throw new Error('Risposta AI non valida');
      setEstimate(est);
      return est;
    } catch (e: any) {
      const msg = e?.message || 'Errore durante la generazione della stima';
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setEstimate(null);
    setError(null);
  }, []);

  return { estimate, loading, error, generate, reset };
}
