import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';

export default function DashboardRedirect() {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profLoading, hasFetched } = usePlumberProfile() as any;

  if (authLoading || (user && (profLoading || !hasFetched))) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-sm text-muted-foreground">
        Caricamento…
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (profile) return <Navigate to="/dashboard/richieste" replace />;
  return <Navigate to="/account" replace />;
}
