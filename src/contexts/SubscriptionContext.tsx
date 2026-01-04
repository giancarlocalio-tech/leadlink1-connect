import { createContext, useContext, ReactNode } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import type { 
  PlumberSubscription, 
  SubscriptionPlanInfo, 
  ContactUnlock 
} from '@/lib/types';

interface SubscriptionContextValue {
  subscription: PlumberSubscription | null;
  plans: SubscriptionPlanInfo[];
  unlocks: ContactUnlock[];
  loading: boolean;
  isRequestUnlocked: (requestId: string) => boolean;
  canUnlockContact: () => { allowed: boolean; reason?: string };
  unlockContact: (requestId: string, isExclusive?: boolean) => Promise<{ error: Error | null; alreadyUnlocked?: boolean }>;
  getCurrentPlan: () => SubscriptionPlanInfo | null;
  getMonthlyUnlocksRemaining: () => number | null;
  getBasicContactsRemaining: () => { used: number; max: number; remaining: number } | null;
  isTrialExhausted: () => boolean;
  getFreeRequestsRemaining: () => number;
  refreshSubscription: () => Promise<void>;
  refreshUnlocks: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const subscriptionData = useSubscription();
  
  return (
    <SubscriptionContext.Provider value={subscriptionData}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptionContext() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscriptionContext must be used within a SubscriptionProvider');
  }
  return context;
}
