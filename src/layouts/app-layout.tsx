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
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:not-sr-only"
      >
        Saltar al contenido principal
      </a>
      <AppSidebar />
      <SidebarInset
        id="main-content"
        tabIndex={-1}
        className="dark min-h-screen bg-background text-white"
      >
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-white/10 bg-[#111110] px-4">
          <SidebarTrigger className="text-yellow-400 hover:bg-[#27241a] hover:text-yellow-300" />
          <span className="text-sm font-semibold tracking-wider text-white">
            KLIP <span className="text-yellow-400">BARBERSHOP</span>
          </span>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
