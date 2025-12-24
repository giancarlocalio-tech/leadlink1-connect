import { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Lock,
  Unlock,
  User,
  Home,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import type { ServiceRequest, UrgencyType } from '@/lib/types';
import { 
  INTERVENTION_LABELS, 
  URGENCY_LABELS, 
  PROPERTY_LABELS, 
  ACCESSIBILITY_LABELS 
} from '@/lib/types';
import { WizardAnswersSection } from './WizardAnswersSection';

interface RequestCardProps {
  request: ServiceRequest;
  isUnlocked: boolean;
  canUnlock: { allowed: boolean; reason?: string };
  onUnlock: (requestId: string) => Promise<{ error: Error | null }>;
}

export function RequestCard({ request, isUnlocked, canUnlock, onUnlock }: RequestCardProps) {
  const [unlocking, setUnlocking] = useState(false);
  const [showDetails, setShowDetails] = useState(isUnlocked);

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

  const handleUnlock = async () => {
    if (!canUnlock.allowed) {
      toast.error(canUnlock.reason || 'Non puoi sbloccare questo contatto');
      return;
    }

    setUnlocking(true);
    const { error } = await onUnlock(request.id);
    setUnlocking(false);

    if (error) {
      toast.error(error.message);
    } else {
      setShowDetails(true);
      toast.success('Contatto sbloccato!');
    }
  };

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
              {request.is_exclusive && (
                <Badge variant="outline" className="border-amber-500 text-amber-600">
                  Esclusivo
                </Badge>
              )}
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

        {/* Wizard Answers */}
        <WizardAnswersSection answers={request.wizard_answers} />

        {/* Contact section */}
        <div className="p-4 border-t border-border">
          {isUnlocked || showDetails ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="bg-success/10 rounded-full p-1.5">
                  <Unlock className="h-3.5 w-3.5 text-success" />
                </div>
                <span className="font-medium text-foreground">{request.client_name}</span>
              </div>
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
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-muted rounded-full p-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Cliente interessato</p>
                  <p className="text-xs text-muted-foreground">
                    Sblocca per vedere i dati di contatto
                  </p>
                </div>
              </div>
              <Button
                onClick={handleUnlock}
                disabled={unlocking || !canUnlock.allowed}
                size="sm"
                className="gap-2"
              >
                {unlocking ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <Lock className="h-4 w-4" />
                )}
                Sblocca
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}