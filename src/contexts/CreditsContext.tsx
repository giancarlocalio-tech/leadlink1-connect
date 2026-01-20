import { createContext, useContext, ReactNode } from 'react';
import { useCredits, CreditPackage, PlumberCredits, CreditTransaction, UnlockCost } from '@/hooks/useCredits';

interface CreditsContextValue {
  credits: PlumberCredits | null;
  packages: CreditPackage[];
  transactions: CreditTransaction[];
  unlockCosts: UnlockCost[];
  loading: boolean;
  purchasing: boolean;
  purchaseCredits: (packageId: string) => Promise<{ url?: string; error?: string }>;
  verifyPurchase: (sessionId: string) => Promise<{ success: boolean; credits_added?: number; new_balance?: number; error?: string }>;
  getUnlockCost: (urgency: string) => number;
  canUnlockWithCredits: (urgency: string) => { allowed: boolean; reason?: string };
  refreshCredits: () => Promise<void>;
  refreshTransactions: () => Promise<void>;
}

const CreditsContext = createContext<CreditsContextValue | null>(null);

export function CreditsProvider({ children }: { children: ReactNode }) {
  const creditsData = useCredits();
  
  return (
    <CreditsContext.Provider value={creditsData}>
      {children}
    </CreditsContext.Provider>
  );
}

export function useCreditsContext() {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error('useCreditsContext must be used within a CreditsProvider');
  }
  return context;
}
