import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import SidebarSection from "./sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarSection />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}