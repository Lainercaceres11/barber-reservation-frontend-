import { Outlet } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:not-sr-only"
      >
        Saltar al contenido principal
      </a>
      <AppSidebar />
      <SidebarInset
        id="main-content"
        tabIndex={-1}
        className="dark min-h-screen bg-ink text-white"
      >
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-white/10 bg-ink px-5 sm:px-8">
          <SidebarTrigger className="text-brass hover:bg-pine-soft hover:text-brass-light" />
          <span className="font-heading text-sm font-semibold tracking-[0.16em] text-bone">
            KLIP <span className="text-brass">/</span> BARBERSHOP
          </span>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
