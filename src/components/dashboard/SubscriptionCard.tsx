import { Check, Crown, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { PlumberSubscription, SubscriptionPlanInfo } from '@/lib/types';

interface SubscriptionCardProps {
  subscription: PlumberSubscription | null;
  currentPlan: SubscriptionPlanInfo | null;
  unlocksRemaining: number | null;
  onUpgrade?: () => void;
}

export function SubscriptionCard({ 
  subscription, 
  currentPlan,
  unlocksRemaining,
  onUpgrade 
}: SubscriptionCardProps) {
  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case 'premium':
        return <Crown className="h-5 w-5" />;
      case 'medium':
        return <Star className="h-5 w-5" />;
      default:
        return <Zap className="h-5 w-5" />;
    }
  };

  const getPlanColor = (planType: string) => {
    switch (planType) {
      case 'premium':
        return 'bg-gradient-to-r from-amber-500 to-orange-500';
      case 'medium':
        return 'bg-gradient-to-r from-purple-500 to-indigo-500';
      default:
        return 'bg-gradient-to-r from-primary to-blue-600';
    }
  };

  if (!subscription || !currentPlan) {
    return (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-lg">Nessun abbonamento attivo</CardTitle>
          <CardDescription>
            Attiva un abbonamento per iniziare a ricevere contatti
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={onUpgrade} className="w-full">
            Scegli un piano
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const usagePercentage = currentPlan.max_exclusive_contacts 
    ? (subscription.exclusive_contacts_used / currentPlan.max_exclusive_contacts) * 100
    : 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg text-white ${getPlanColor(currentPlan.plan_type)}`}>
              {getPlanIcon(currentPlan.plan_type)}
            </div>
            <div>
              <CardTitle className="text-lg">{currentPlan.name}</CardTitle>
              <CardDescription>{currentPlan.description}</CardDescription>
            </div>
          </div>
          <Badge 
            variant={subscription.status === 'active' ? 'default' : 'secondary'}
            className="capitalize"
          >
            {subscription.status === 'active' ? 'Attivo' : subscription.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">€{currentPlan.price_monthly}</span>
          <span className="text-muted-foreground">/mese</span>
        </div>

        {currentPlan.plan_type === 'medium' && currentPlan.max_exclusive_contacts && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Contatti esclusivi usati</span>
              <span className="font-medium">
                {subscription.exclusive_contacts_used}/{currentPlan.max_exclusive_contacts}
              </span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
            {unlocksRemaining !== null && unlocksRemaining <= 2 && (
              <p className="text-xs text-warning">
                ⚠️ Ti rimangono solo {unlocksRemaining} contatti esclusivi questo mese
              </p>
            )}
          </div>
        )}

        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-success" />
            <span>
              {currentPlan.contacts_are_exclusive 
                ? 'Contatti esclusivi' 
                : 'Contatti condivisi'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-success" />
            <span>
              {currentPlan.max_exclusive_contacts 
                ? `Max ${currentPlan.max_exclusive_contacts} contatti/mese`
                : 'Contatti illimitati'}
            </span>
          </div>
        </div>

        {subscription.current_period_end && (
          <p className="text-xs text-muted-foreground pt-2">
            Rinnovo: {new Date(subscription.current_period_end).toLocaleDateString('it-IT')}
          </p>
        )}
      </CardContent>
      {currentPlan.plan_type !== 'premium' && (
        <CardFooter>
          <Button variant="outline" onClick={onUpgrade} className="w-full">
            Upgrade piano
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}