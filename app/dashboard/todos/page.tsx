import DashboardTopbar from "@/components/DashboardTopbar"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { MoreVertical, Plus, Circle, GripVertical } from "lucide-react"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export const metadata = {
  title: "Todos",
}

export default async function TodosPage() {
  const session = await getServerSession(authOptions)
  const notes = await db.note.findMany({
    where: {
      userId: session?.user?.id,
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <div>
      <header className="md:light:border-slate-200 sticky z-40 md:border-b md:dark:border-slate-800">
        <DashboardTopbar section="Todos" />
      </header>

      <main className="flex w-full flex-1 flex-col overflow-hidden">
        <div>
          <div className="flex items-center justify-between border-b bg-accent px-8 py-3">
            <h2>Todo</h2>
            <Plus className="h-5 w-5" />
          </div>
          <div className="flex items-center justify-between border-b px-8 py-5 hover:bg-accent/50">
            <div className="flex items-center gap-3">
              <GripVertical className="-ml-6 h-4 w-4 text-gray-400" />
              <p className="text-md text-secondary-foreground">LEO-13</p>
              <Circle className="h-4 w-4 text-gray-500" />
              <p className="cursor-pointer">First Todo</p>
            </div>
            <p className="text-secondary-foreground">June 9, 2023</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between border-b bg-accent px-8 py-3">
            <h2>In Progress</h2>
            <Plus className="h-5 w-5" />
          </div>
          <div className="flex items-center justify-between border-b px-8 py-5 hover:bg-accent/50">
            <div className="flex items-center gap-3">
              <GripVertical className="-ml-6 h-4 w-4 text-gray-400" />
              <p className="text-md text-secondary-foreground">LEO-13</p>
              <Circle className="h-4 w-4 text-yellow-500" />
              <p className="cursor-pointer">First Todo</p>
            </div>
            <p className="text-secondary-foreground">June 9, 2023</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between border-b bg-accent px-8 py-3">
            <h2>Done</h2>
            <Plus className="h-5 w-5" />
          </div>
          <div className="flex items-center justify-between border-b px-8 py-5 hover:bg-accent/50">
            <div className="flex items-center gap-3">
              <GripVertical className="-ml-6 h-4 w-4 text-gray-400" />
              <p className="text-md text-secondary-foreground">LEO-13</p>
              <Circle className="h-4 w-4 text-green-500" />
              <p className="cursor-pointer">First Todo</p>
            </div>
            <p className="text-secondary-foreground">June 9, 2023</p>
          </div>
        </div>
      </main>
    </div>
  )
}
