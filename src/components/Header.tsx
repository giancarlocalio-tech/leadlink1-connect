import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import logoIcon from '@/assets/logo-icon.png';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin(user);
  const isConsulenza = location.pathname.startsWith('/consulenza');

  const handleSignOut = async () => {
    const { error } = await signOut();
    navigate('/');
    if (error) window.location.reload();
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 min-w-0">
            <img
              src={logoIcon}
              alt="Idraulico AI"
              className="h-9 w-auto object-contain shrink-0"
              width={72}
              height={72}
            />
            <span className="text-sm sm:text-xl font-extrabold tracking-tight text-foreground truncate">
              Idraulico AI
            </span>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4">
            {isAdmin && (
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  <Shield className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Admin</span>
                </Button>
              </Link>
            )}
            {user && (
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Esci</span>
              </Button>
            )}
            {!isConsulenza && (
              <Link to="/consulenza">
                <Button size="sm" className="text-xs sm:text-sm px-3 sm:px-4 bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 font-semibold">
                  <span className="text-base leading-none">✨</span>
                  <span>Parla con l'AI</span>
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
