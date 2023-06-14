import { notFound } from "next/navigation"
import Providers from "@/components/Providers"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  //   const user = await getCurrentUser()

  //   if (!user) {
  //     return notFound()
  //   }

  return (
    <div className="flex min-h-screen">
      <Providers>{children}</Providers>
    </div>
  )
}
