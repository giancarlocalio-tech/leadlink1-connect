import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import logoIcon from '@/assets/logo-icon.png';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/auth';
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin(user);

  const handleSignOut = async () => {
    const { error } = await signOut();

    // Always route away from protected pages
    navigate('/');

    // If we had an error (or UI is stuck), hard reload ensures fresh auth state
    if (error) window.location.reload();
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img 
              src={logoIcon} 
              alt="Idraulici Subito" 
              className="h-9 w-auto object-contain"
              width={72}
              height={72}
            />
            <span className="text-xl font-extrabold tracking-tight text-foreground hidden sm:inline">Idraulici Subito</span>
          </Link>
          
          <nav className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm">
                      <Shield className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Admin</span>
                    </Button>
                  </Link>
                )}
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Esci</span>
                </Button>
              </>
            ) : (
              <>
                {!isLoginPage && (
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                )}
                {!isRegisterPage && (
                  <Link to="/auth">
                    <Button size="sm" className="text-xs sm:text-sm px-2 sm:px-4">
                      Registrati come idraulico
                    </Button>
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
