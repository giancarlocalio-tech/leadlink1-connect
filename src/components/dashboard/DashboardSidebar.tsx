import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  User, 
  Settings,
  LogOut,
  Shield,
  Coins
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

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Richieste', url: '/dashboard/richieste', icon: FileText },
  { title: 'Crediti', url: '/dashboard/crediti', icon: Coins },
  { title: 'Profilo', url: '/dashboard/profilo', icon: User },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin(user);

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">IS</span>
            </div>
            <span className="font-semibold text-foreground">Idraulici Subito</span>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
            <span className="text-primary-foreground font-bold text-sm">IS</span>
          </div>
        )}
      </SidebarHeader>

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
                      className="flex items-center gap-3"
                      activeClassName="bg-accent text-accent-foreground"
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
                      className="flex items-center gap-3"
                      activeClassName="bg-accent text-accent-foreground"
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