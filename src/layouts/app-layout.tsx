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
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-white/10 bg-[#111110] px-4">
          <SidebarTrigger className="text-yellow-400 hover:bg-[#27241a] hover:text-yellow-300" />
          <span className="text-sm font-semibold tracking-wider text-white">
            KLIP <span className="text-yellow-400">BARBERSHOP</span>
          </span>
        </header>
        <main className="dark min-h-screen bg-background text-white">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
