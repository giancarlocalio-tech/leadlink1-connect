import { Phone, Mail, MapPin, Home, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  INTERVENTION_LABELS, 
  URGENCY_LABELS, 
  PROPERTY_LABELS
} from '@/lib/types';
import type { AcceptedTrialRequest } from '@/hooks/useTrialRequests';

interface AcceptedTrialRequestCardProps {
  request: AcceptedTrialRequest;
}

export function AcceptedTrialRequestCard({ request }: AcceptedTrialRequestCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="overflow-hidden border-success/50 bg-success/5">
      <CardContent className="p-0">
        {/* Success Header */}
        <div className="p-4 border-b border-success/30 bg-success/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-semibold">Richiesta accettata</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatDate(request.accepted_at)}
            </span>
          </div>
        </div>

        {/* Request Details */}
        <div className="p-4 border-b border-border">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="default">
              {INTERVENTION_LABELS[request.intervention_type]}
            </Badge>
            <Badge variant="secondary">
              {URGENCY_LABELS[request.urgency]}
            </Badge>
          </div>
          <p className="text-foreground leading-relaxed text-sm">{request.description}</p>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {request.city}
            </span>
            <span className="flex items-center gap-1">
              <Home className="h-3.5 w-3.5" />
              {PROPERTY_LABELS[request.property_type]}
            </span>
          </div>
        </div>

        {/* Client Contact Info */}
        <div className="p-4 bg-success/5">
          <h4 className="font-medium mb-3 text-sm">Dati del cliente</h4>
          <div className="space-y-2">
            <p className="font-medium text-foreground">{request.client_name}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${request.client_phone}`}
                className="flex items-center gap-2 text-primary hover:underline font-medium"
              >
                <Phone className="h-4 w-4" />
                {request.client_phone}
              </a>
              {request.client_email && (
                <a
                  href={`mailto:${request.client_email}`}
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  {request.client_email}
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
