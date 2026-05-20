import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from './DashboardSidebar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { usePlumberProfile } from '@/hooks/usePlumberProfile';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
}

// Siena palette (azzurro acqua) applied across the whole plumber dashboard
const SIENA_THEME = {
  ['--primary' as any]: '199 89% 48%',
  ['--primary-foreground' as any]: '0 0% 100%',
  ['--accent' as any]: '199 89% 94%',
  ['--accent-foreground' as any]: '215 55% 20%',
  ['--ring' as any]: '199 89% 48%',
  ['--secondary' as any]: '199 70% 96%',
  ['--secondary-foreground' as any]: '215 55% 20%',
  ['--sidebar-primary' as any]: '199 89% 48%',
  ['--sidebar-primary-foreground' as any]: '0 0% 100%',
  ['--sidebar-ring' as any]: '199 89% 48%',
  ['--sidebar-accent' as any]: '199 89% 94%',
  ['--sidebar-accent-foreground' as any]: '199 89% 28%',
  ['--sidebar-border' as any]: '199 40% 88%',
};

export function DashboardLayout({ children, title, breadcrumbs }: DashboardLayoutProps) {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, hasFetched } = usePlumberProfile();

  if (user && hasFetched && !profile) {
    return <Navigate to="/account" replace />;
  }

  return (
    <SidebarProvider style={SIENA_THEME as React.CSSProperties}>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <SidebarInset className="flex-1 flex flex-col min-w-0 bg-background">
          <header className="flex h-14 shrink-0 items-center gap-2 px-3 md:px-6 sticky top-0 bg-background/95 backdrop-blur z-10 md:hidden border-b border-border">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb className="overflow-hidden">
              <BreadcrumbList className="flex-nowrap overflow-hidden">
                <BreadcrumbItem className="hidden sm:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs?.map((item, index) => (
                  <BreadcrumbItem key={index} className="hidden sm:flex">
                    <BreadcrumbSeparator />
                    {item.href ? (
                      <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <main className="flex-1 px-4 md:px-12 py-6 md:py-10 overflow-x-hidden max-w-6xl mx-auto w-full">
            <div className="mb-6 md:mb-10 flex items-center gap-3">
              <SidebarTrigger className="hidden md:flex -ml-2" />
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight truncate">
                {title}
              </h1>
            </div>
            {authLoading || profileLoading || (user && !hasFetched) ? (
              <div className="py-16 flex items-center justify-center text-sm text-muted-foreground">
                Caricamento…
              </div>
            ) : children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}