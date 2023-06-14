import DashboardTopbar from "@/components/DashboardTopbar"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { MoreVertical, Plus, Circle, GripVertical } from "lucide-react"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  return (
    <div>
      <header className="sticky z-40 md:border-b md:light:border-slate-200 md:dark:border-slate-800">
        <DashboardTopbar section="Todos" />
      </header>

      <main className="flex w-full flex-1 flex-col overflow-hidden">
        <div>
          <div className="border-b flex justify-between px-8 py-3 items-center bg-accent">
            <h2>Todo</h2>
            <Plus className="w-5 h-5" />
          </div>
          <div className="border-b flex justify-between px-8 py-5 items-center hover:bg-accent/50">
            <div className="flex gap-3 items-center">
              <GripVertical className="w-4 h-4 text-gray-400 -ml-6" />
              <p className="text-secondary-foreground text-md">LEO-13</p>
              <Circle className="w-4 h-4 text-gray-500" />
              <p className="cursor-pointer">First Todo</p>
            </div>
            <p className="text-secondary-foreground">June 9, 2023</p>
          </div>
        </div>

        <div>
          <div className="border-b flex justify-between px-8 py-3 items-center bg-accent">
            <h2>In Progress</h2>
            <Plus className="w-5 h-5" />
          </div>
          <div className="border-b flex justify-between px-8 py-5 items-center hover:bg-accent/50">
            <div className="flex gap-3 items-center">
              <GripVertical className="w-4 h-4 text-gray-400 -ml-6" />
              <p className="text-secondary-foreground text-md">LEO-13</p>
              <Circle className="w-4 h-4 text-yellow-500" />
              <p className="cursor-pointer">First Todo</p>
            </div>
            <p className="text-secondary-foreground">June 9, 2023</p>
          </div>
        </div>

        <div>
          <div className="border-b flex justify-between px-8 py-3 items-center bg-accent">
            <h2>Done</h2>
            <Plus className="w-5 h-5" />
          </div>
          <div className="border-b flex justify-between px-8 py-5 items-center hover:bg-accent/50">
            <div className="flex gap-3 items-center">
              <GripVertical className="w-4 h-4 text-gray-400 -ml-6" />
              <p className="text-secondary-foreground text-md">LEO-13</p>
              <Circle className="w-4 h-4 text-green-500" />
              <p className="cursor-pointer">First Todo</p>
            </div>
            <p className="text-secondary-foreground">June 9, 2023</p>
          </div>
        </div>
      </main>
    </div>
  )
}
