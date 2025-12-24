import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { DashboardSidebar } from './DashboardSidebar';
import { Separator } from '@/components/ui/separator';
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

export function DashboardLayout({ children, title, breadcrumbs }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <SidebarInset className="flex-1 flex flex-col min-w-0">
          <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-3 md:px-4 sticky top-0 bg-background z-10">
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
          <main className="flex-1 p-3 md:p-6 overflow-x-hidden">
            <div className="mb-4 md:mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-foreground truncate">{title}</h1>
            </div>
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}