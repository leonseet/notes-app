import DashboardSidebar from "@/components/DashboardSidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
  noteModal: React.ReactNode
}

export default async function DashboardLayout({ children, noteModal }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-[300px] flex-col md:flex md:border-r md:light:border-slate-200 md:dark:border-slate-800 px-5">
        <DashboardSidebar />
      </aside>
      <div className="flex-1">{children}</div>
      {noteModal}
    </div>
  )
}
