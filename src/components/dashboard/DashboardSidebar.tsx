import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Wallet,
  User,
  LogOut,
  Shield,
  Plus,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { useCredits } from '@/hooks/useCredits';
import { formatEuro } from '@/lib/currency';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Opportunità', url: '/dashboard/richieste', icon: FileText },
  { title: 'Il mio conto', url: '/dashboard/crediti', icon: Wallet },
  { title: 'Profilo', url: '/dashboard/profilo', icon: User },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin(user);
  const { credits } = useCredits();

  const isActive = (path: string) => location.pathname === path;
  const balanceCents = credits?.balance_cents ?? 0;

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-sm">IS</span>
            </div>
            <span className="font-semibold text-foreground text-base">Idraulici Subito</span>
          </div>
        ) : (
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center mx-auto shadow-sm">
            <span className="text-primary-foreground font-bold text-sm">IS</span>
          </div>
        )}
      </SidebarHeader>

      {/* Saldo evidenziato in stile ProntoPro */}
      {!collapsed && (
        <div className="px-4 pb-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard/crediti/ricarica')}
            className="w-full text-left rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-3 hover:from-primary/10 hover:to-primary/15 transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Saldo
              </span>
              <Plus className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="text-xl font-bold text-foreground">
              {formatEuro(balanceCents)}
            </div>
            <div className="text-xs text-primary mt-0.5">Ricarica ora</div>
          </button>
        </div>
      )}

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={collapsed ? item.title : undefined}
                  >
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 rounded-lg"
                      activeClassName="bg-accent text-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Amministrazione</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/admin')}
                    tooltip={collapsed ? 'Admin' : undefined}
                  >
                    <NavLink
                      to="/admin"
                      end
                      className="flex items-center gap-3 rounded-lg"
                      activeClassName="bg-accent text-accent-foreground font-medium"
                    >
                      <Shield className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>Admin</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={async () => {
            const { error } = await signOut();
            navigate('/');
            if (error) window.location.reload();
          }}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Esci</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
