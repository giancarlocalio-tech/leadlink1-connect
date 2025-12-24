import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  CheckCircle,
  XCircle,
  Timer,
  User,
  Home,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import type { ServiceRequest, UrgencyType } from '@/lib/types';
import { 
  INTERVENTION_LABELS, 
  URGENCY_LABELS, 
  PROPERTY_LABELS, 
  ACCESSIBILITY_LABELS 
} from '@/lib/types';
import { WizardAnswersSection } from './WizardAnswersSection';

interface AssignedRequestCardProps {
  request: ServiceRequest;
  onAccepted: () => void;
  onDeclined: () => void;
}

export function AssignedRequestCard({ request, onAccepted, onDeclined }: AssignedRequestCardProps) {
  const [accepting, setAccepting] = useState(false);
  const [declining, setDeclining] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [progressPercent, setProgressPercent] = useState(100);

  // Calculate timer
  useEffect(() => {
    if (!request.assignment_expires_at || !request.assignment_started_at) return;

    const calculateTime = () => {
      const now = new Date().getTime();
      const expiresAt = new Date(request.assignment_expires_at!).getTime();
      const startedAt = new Date(request.assignment_started_at!).getTime();
      const totalDuration = expiresAt - startedAt;
      const remaining = expiresAt - now;

      if (remaining <= 0) {
        setTimeRemaining(0);
        setProgressPercent(0);
        return;
      }

      setTimeRemaining(remaining);
      setProgressPercent((remaining / totalDuration) * 100);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [request.assignment_expires_at, request.assignment_started_at]);

  const formatTimeRemaining = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

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

  const handleAccept = async () => {
    setAccepting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Sessione scaduta, effettua nuovamente il login');
        return;
      }

      const response = await supabase.functions.invoke('accept-request', {
        body: { request_id: request.id }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (response.data?.error) {
        throw new Error(response.data.error);
      }

      toast.success('Richiesta accettata! Contatta il cliente.');
      onAccepted();
    } catch (error) {
      console.error('Error accepting request:', error);
      toast.error(error instanceof Error ? error.message : 'Errore nell\'accettare la richiesta');
    } finally {
      setAccepting(false);
    }
  };

  const handleDecline = async () => {
    setDeclining(true);
    try {
      // For now, declining just means letting the timer expire
      // In the future, we could add an explicit decline action
      toast.info('La richiesta verrà riassegnata ad un altro professionista.');
      onDeclined();
    } catch (error) {
      console.error('Error declining request:', error);
    } finally {
      setDeclining(false);
    }
  };

  const isAccepted = request.status === 'accepted';
  const isExpired = !isAccepted && timeRemaining !== null && timeRemaining <= 0;

  return (
    <Card className={`overflow-hidden transition-shadow hover:shadow-md ${
      request.urgency === 'subito' ? 'ring-2 ring-destructive/50' : ''
    } ${isAccepted ? 'ring-2 ring-green-500/50' : ''}`}>
      <CardContent className="p-0">
        {/* Timer Bar - Only show for non-accepted requests */}
        {!isAccepted && !isExpired && timeRemaining !== null && (
          <div className="p-3 bg-primary/5 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Timer className="h-4 w-4 text-primary" />
                <span>Tempo rimanente per accettare</span>
              </div>
              <span className={`font-mono font-bold ${
                progressPercent < 20 ? 'text-destructive' : 'text-primary'
              }`}>
                {formatTimeRemaining(timeRemaining)}
              </span>
            </div>
            <Progress 
              value={progressPercent} 
              className={`h-2 ${progressPercent < 20 ? '[&>div]:bg-destructive' : ''}`}
            />
          </div>
        )}

        {/* Accepted banner */}
        {isAccepted && (
          <div className="p-3 bg-green-500/10 border-b border-green-500/30">
            <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400 font-medium">
              <CheckCircle className="h-4 w-4" />
              <span>Richiesta accettata - contatta il cliente</span>
            </div>
          </div>
        )}

        {/* Expired banner - Only show for non-accepted expired requests */}
        {isExpired && (
          <div className="p-3 bg-muted border-b border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <XCircle className="h-4 w-4" />
              <span>Tempo scaduto - richiesta in riassegnazione</span>
            </div>
          </div>
        )}

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
              <Badge variant="outline" className="border-primary text-primary">
                <Zap className="h-3 w-3 mr-1" />
                Esclusiva per te
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

        {/* Wizard Answers */}
        <WizardAnswersSection answers={request.wizard_answers} />

        {/* Action buttons */}
        <div className="p-4 border-t border-border">
          {request.status === 'accepted' ? (
            // Show contact details if already accepted
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="bg-success/10 rounded-full p-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-success" />
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
          ) : isExpired ? (
            <div className="text-center text-muted-foreground text-sm py-2">
              La richiesta sta per essere riassegnata...
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-muted rounded-full p-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Cliente in attesa</p>
                  <p className="text-xs text-muted-foreground">
                    Accetta per vedere i dettagli di contatto
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleDecline}
                  disabled={declining || accepting}
                  size="sm"
                >
                  {declining ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-1" />
                  )}
                  Rifiuta
                </Button>
                <Button
                  onClick={handleAccept}
                  disabled={accepting || declining}
                  size="sm"
                  className="gap-2"
                >
                  {accepting ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                  Accetta
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
