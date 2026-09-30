import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Inbox,
  MessageSquare,
  Wallet,
  User,
  Shield,
  Settings,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { useCredits } from '@/hooks/useCredits';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import { formatEuro } from '@/lib/currency';

const menuItems = [
  { title: 'Opportunità', url: '/dashboard/richieste', icon: Inbox },
  { title: 'Preventivi', url: '/dashboard/preventivi', icon: MessageSquare },
  { title: 'Profilo', url: '/dashboard/profilo', icon: User },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin } = useAdmin(user);
  const { credits } = useCredits();
  const { profile } = usePlumberProfile();

  const isActive = (path: string) => location.pathname === path;
  const balanceCents = credits?.balance_cents ?? 0;

  const displayName = profile?.full_name || profile?.business_name || user?.email?.split('@')[0] || 'Account';
  const initials = (profile?.full_name || profile?.business_name || user?.email || '?')
    .split(' ')
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  // ProntoPro-style: solid pill background on active item (neutral muted, not colored)
  const activeClass = 'bg-muted text-foreground font-semibold';
  const inactiveClass = 'text-muted-foreground hover:bg-muted/60 hover:text-foreground';

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-5 pb-4">
        {!collapsed ? (
          <Link to="/dashboard" className="block">
            <span className="font-extrabold text-xl tracking-tight text-primary">
              IdrauliciSubito
            </span>
          </Link>
        ) : (
          <Link to="/dashboard" className="block text-center">
            <span className="font-extrabold text-lg text-primary">IS</span>
          </Link>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={collapsed ? item.title : undefined}
                    className="h-11 rounded-full px-4 data-[active=true]:bg-muted data-[active=true]:text-foreground data-[active=true]:font-semibold hover:bg-muted/60"
                  >
                    <NavLink to={item.url} end className="flex items-center gap-3">
                      <item.icon className="h-[18px] w-[18px] shrink-0" />
                      {!collapsed && <span className="text-[15px]">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Saldo come voce di menu, stile ProntoPro */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname.startsWith('/dashboard/crediti')}
                  tooltip={collapsed ? `Saldo: ${formatEuro(balanceCents)}` : undefined}
                  className="h-11 rounded-full px-4 data-[active=true]:bg-muted data-[active=true]:text-foreground data-[active=true]:font-semibold hover:bg-muted/60"
                >
                  <NavLink to="/dashboard/crediti" end className="flex items-center gap-3">
                    <Wallet className="h-[18px] w-[18px] shrink-0" />
                    {!collapsed && (
                      <span className="text-[15px]">
                        Saldo: <span className="font-semibold text-foreground">{formatEuro(balanceCents)}</span>
                      </span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive('/admin')}
                    tooltip={collapsed ? 'Admin' : undefined}
                    className="h-11 rounded-full px-4 data-[active=true]:bg-muted data-[active=true]:text-foreground data-[active=true]:font-semibold hover:bg-muted/60"
                  >
                    <NavLink to="/admin" end className="flex items-center gap-3">
                      <Shield className="h-[18px] w-[18px] shrink-0" />
                      {!collapsed && <span className="text-[15px]">Admin</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <button
          type="button"
          onClick={() => navigate('/dashboard/profilo')}
          className="w-full flex items-center gap-3 text-left rounded-xl hover:bg-muted/60 p-2 -m-2 transition-colors"
        >
          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
            {initials}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-foreground truncate">{displayName}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Settings className="h-3 w-3" />
                Impostazioni
              </div>
            </div>
          )}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
