import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import SidebarSection from "./sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarSection />
      <main className="w-full p-5">
        <SidebarTrigger className="mb-5"/>
        {children}
      </main>
    </SidebarProvider>
  )
}