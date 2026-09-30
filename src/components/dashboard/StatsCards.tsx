import { FileText, Unlock, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardsProps {
  totalRequests: number;
  unlockedContacts: number;
  pendingRequests: number;
  thisMonthUnlocks: number;
}

export function StatsCards({ 
  totalRequests, 
  unlockedContacts, 
  pendingRequests,
  thisMonthUnlocks 
}: StatsCardsProps) {
  const stats = [
    {
      title: 'Richieste disponibili',
      value: totalRequests,
      icon: FileText,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Contatti sbloccati',
      value: unlockedContacts,
      icon: Unlock,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Questo mese',
      value: thisMonthUnlocks,
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'In attesa',
      value: pendingRequests,
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}