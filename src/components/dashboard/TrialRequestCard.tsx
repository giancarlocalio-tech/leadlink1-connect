import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Home,
  AlertTriangle,
  Zap,
  CheckCircle2,
  Coins,
  Lock,
  Euro,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { formatEuroFromCents } from '@/lib/currency';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { UrgencyType } from '@/lib/types';
import { 
  INTERVENTION_LABELS, 
  URGENCY_LABELS, 
  PROPERTY_LABELS, 
  ACCESSIBILITY_LABELS 
} from '@/lib/types';
import type { TrialRequest, ClaimResult } from '@/hooks/useTrialRequests';

// Costo sblocco in centesimi per livello di urgenza
const UNLOCK_COSTS_CENTS: Record<UrgencyType, number> = {
  subito: 600,
  entro_24_ore: 400,
  prossimi_giorni: 250,
};

export interface UnlockWithCreditsResult {
  success: boolean;
  message: string;
  amount_spent_cents?: number;
  new_balance_cents?: number;
  client_name?: string;
  client_phone?: string;
  client_email?: string;
}

export interface QuoteSubmission {
  quote_amount_cents: number;
  quote_message: string;
}

interface TrialRequestCardProps {
  request: TrialRequest;
  onClaim: (requestId: string, quote?: QuoteSubmission) => Promise<ClaimResult>;
  onUnlockWithCredits?: (requestId: string, quote?: QuoteSubmission) => Promise<UnlockWithCreditsResult>;
  claiming: boolean;
  freeRequestsRemaining: number;
  balanceCents?: number;
  onAccepted?: () => void;
}

export function TrialRequestCard({ 
  request, 
  onClaim, 
  onUnlockWithCredits,
  claiming, 
  freeRequestsRemaining,
  balanceCents = 0,
  onAccepted
}: TrialRequestCardProps) {
  const navigate = useNavigate();
  const [claimResult, setClaimResult] = useState<ClaimResult | null>(null);
  const [creditUnlockResult, setCreditUnlockResult] = useState<UnlockWithCreditsResult | null>(null);
  const [unlocking, setUnlocking] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [priceStr, setPriceStr] = useState('');
  const [quoteMessage, setQuoteMessage] = useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getUrgencyVariant = (urgency: UrgencyType): 'destructive' | 'secondary' | 'outline' => {
    switch (urgency) {
      case 'subito':
        return 'destructive';
      case 'entro_24_ore':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const handleClaim = async () => {
    const result = await onClaim(request.id);
    if (result.success) {
      setClaimResult(result);
      onAccepted?.();
    }
  };

  // Parse "12,50" or "12.50" → 1250 cents
  const parsePriceCents = (s: string): number | null => {
    const cleaned = s.replace(/\s/g, '').replace(',', '.');
    if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
    const n = parseFloat(cleaned);
    if (!isFinite(n) || n <= 0) return null;
    return Math.round(n * 100);
  };

  const priceCents = parsePriceCents(priceStr);
  const quoteValid = !!priceCents && quoteMessage.trim().length >= 10;

  const handleSendQuote = async () => {
    if (!priceCents) {
      toast.error('Inserisci un prezzo valido (es. 120 o 89,50)');
      return;
    }
    if (quoteMessage.trim().length < 10) {
      toast.error('Il preventivo deve contenere almeno 10 caratteri');
      return;
    }

    const quote: QuoteSubmission = {
      quote_amount_cents: priceCents,
      quote_message: quoteMessage.trim(),
    };

    setUnlocking(true);
    try {
      // If user still has trial requests, use the trial flow (free).
      // Otherwise debit balance via paid unlock.
      const useTrial = freeRequestsRemaining > 0;

      if (useTrial) {
        const result = await onClaim(request.id, quote);
        if (!result.success) {
          toast.error(result.message);
          return;
        }
        setClaimResult(result);
      } else {
        if (!onUnlockWithCredits) {
          toast.error('Sblocco non disponibile');
          return;
        }
        const result = await onUnlockWithCredits(request.id, quote);
        if (!result.success) {
          toast.error(result.message);
          return;
        }
        setCreditUnlockResult(result);
      }

      onAccepted?.();
      toast.success('Preventivo inviato al cliente!');
      setTimeout(() => navigate('/dashboard/preventivi'), 1200);
    } finally {
      setUnlocking(false);
    }
  };

  const unlockCostCents = UNLOCK_COSTS_CENTS[request.urgency];
  const trialExhausted = freeRequestsRemaining <= 0;
  const hasInsufficientBalance = trialExhausted && balanceCents < unlockCostCents;
  const isProcessing = claiming || unlocking;

  // Show unlocked state with client info (credit unlock)
  if (creditUnlockResult?.success) {
    return (
      <Card className="overflow-hidden border-success/50 bg-success/5">
        <CardContent className="p-0">
          {/* Success Header */}
          <div className="p-4 border-b border-success/30 bg-success/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-success">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-semibold">Contatto sbloccato!</span>
              </div>
              <Badge variant="secondary" className="gap-1">
                <Coins className="h-3 w-3" />
                -{formatEuroFromCents(creditUnlockResult.amount_spent_cents)}
              </Badge>
            </div>
          </div>

          {/* Request Details */}
          <div className="p-4 border-b border-border">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="default">
                {INTERVENTION_LABELS[request.intervention_type]}
              </Badge>
              <Badge variant={getUrgencyVariant(request.urgency)}>
                {request.urgency === 'subito' && <AlertTriangle className="h-3 w-3 mr-1" />}
                {URGENCY_LABELS[request.urgency]}
              </Badge>
            </div>
            <p className="text-foreground leading-relaxed">{request.description}</p>
          </div>

          {/* Client Contact Info */}
          <div className="p-4 bg-success/5">
            <h4 className="font-medium mb-3">Dati del cliente</h4>
            <div className="space-y-2">
              <p className="font-medium text-foreground">{creditUnlockResult.client_name}</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${creditUnlockResult.client_phone}`}
                  className="flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  <Phone className="h-4 w-4" />
                  {creditUnlockResult.client_phone}
                </a>
                {creditUnlockResult.client_email && (
                  <a
                    href={`mailto:${creditUnlockResult.client_email}`}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {creditUnlockResult.client_email}
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show claimed state with client info
  if (claimResult?.success) {
    return (
      <Card className="overflow-hidden border-success/50 bg-success/5">
        <CardContent className="p-0">
          {/* Success Header */}
          <div className="p-4 border-b border-success/30 bg-success/10">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-semibold">Richiesta accettata!</span>
            </div>
          </div>

          {/* Request Details */}
          <div className="p-4 border-b border-border">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="default">
                {INTERVENTION_LABELS[request.intervention_type]}
              </Badge>
              <Badge variant={getUrgencyVariant(request.urgency)}>
                {request.urgency === 'subito' && <AlertTriangle className="h-3 w-3 mr-1" />}
                {URGENCY_LABELS[request.urgency]}
              </Badge>
            </div>
            <p className="text-foreground leading-relaxed">{request.description}</p>
          </div>

          {/* Client Contact Info */}
          <div className="p-4 bg-success/5">
            <h4 className="font-medium mb-3">Dati del cliente</h4>
            <div className="space-y-2">
              <p className="font-medium text-foreground">{claimResult.client_name}</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${claimResult.client_phone}`}
                  className="flex items-center gap-2 text-primary hover:underline font-medium"
                >
                  <Phone className="h-4 w-4" />
                  {claimResult.client_phone}
                </a>
                {claimResult.client_email && (
                  <a
                    href={`mailto:${claimResult.client_email}`}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {claimResult.client_email}
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">
                {INTERVENTION_LABELS[request.intervention_type]}
              </Badge>
              <Badge variant={getUrgencyVariant(request.urgency)}>
                {request.urgency === 'subito' && <AlertTriangle className="h-3 w-3 mr-1" />}
                {URGENCY_LABELS[request.urgency]}
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDate(request.created_at)}
            </span>
          </div>

          <p className="text-foreground leading-relaxed">{request.description}</p>
        </div>

        {/* Details */}
        <div className="p-4 bg-muted/30">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {request.city}
            </span>
            <span className="flex items-center gap-1">
              <Home className="h-3.5 w-3.5" />
              {PROPERTY_LABELS[request.property_type]}
            </span>
            <span>
              Accessibilità: {ACCESSIBILITY_LABELS[request.accessibility]}
            </span>
          </div>
        </div>

        {/* Action section */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              {trialExhausted ? (
                <>
                  <span className="font-medium text-foreground flex items-center gap-1">
                    <Lock className="h-3.5 w-3.5" />
                    {hasInsufficientBalance ? 'Contatto bloccato' : 'Contatto da sbloccare'}
                  </span>
                  {hasInsufficientBalance ? (
                    <p className="text-xs flex items-center gap-1 mt-0.5 text-destructive">
                      <Coins className="h-3 w-3" />
                      Saldo insufficiente ({formatEuroFromCents(balanceCents)} / {formatEuroFromCents(unlockCostCents)})
                    </p>
                  ) : (
                    <p className="text-xs flex items-center gap-1 mt-0.5">
                      <Coins className="h-3 w-3" />
                      Servono <span className="font-semibold text-primary">{formatEuroFromCents(unlockCostCents)}</span> per sbloccare
                    </p>
                  )}
                </>
              ) : (
                <>
                  <span className="font-medium text-foreground">Chi prima arriva, meglio alloggia!</span>
                  <p className="text-xs">Accetta per primo per ottenere i dati del cliente</p>
                </>
              )}
            </div>
            <Button
              onClick={trialExhausted ? handleUnlockWithCredits : handleClaim}
              disabled={isProcessing || (trialExhausted && (!onUnlockWithCredits || hasInsufficientBalance))}
              size="sm"
              className="gap-2 shrink-0"
              variant={hasInsufficientBalance ? "outline" : "default"}
            >
              {isProcessing ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : trialExhausted ? (
                <Coins className="h-4 w-4" />
              ) : (
                <Zap className="h-4 w-4" />
              )}
              {hasInsufficientBalance 
                ? 'Saldo insufficiente' 
                : trialExhausted 
                  ? `Sblocca (${formatEuroFromCents(unlockCostCents)})` 
                  : 'Accetta ora'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
