import { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Home,
  AlertTriangle,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { UrgencyType } from '@/lib/types';
import { 
  INTERVENTION_LABELS, 
  URGENCY_LABELS, 
  PROPERTY_LABELS, 
  ACCESSIBILITY_LABELS 
} from '@/lib/types';
import type { TrialRequest, ClaimResult } from '@/hooks/useTrialRequests';

interface TrialRequestCardProps {
  request: TrialRequest;
  onClaim: (requestId: string) => Promise<ClaimResult>;
  claiming: boolean;
  freeRequestsRemaining: number;
}

export function TrialRequestCard({ 
  request, 
  onClaim, 
  claiming, 
  freeRequestsRemaining 
}: TrialRequestCardProps) {
  const [claimResult, setClaimResult] = useState<ClaimResult | null>(null);

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
    }
  };

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
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Chi prima arriva, meglio alloggia!</span>
              <p className="text-xs">Accetta per primo per ottenere i dati del cliente</p>
            </div>
            <Button
              onClick={handleClaim}
              disabled={claiming || freeRequestsRemaining <= 0}
              size="sm"
              className="gap-2"
            >
              {claiming ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Zap className="h-4 w-4" />
              )}
              Accetta ora
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
