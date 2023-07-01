import DashboardTopbar from "@/components/DashboardTopbar"
import { Circle, GripVertical } from "lucide-react"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import NewTaskButton from "@/components/NewTaskButton"
import TaskItem from "@/components/TaskItem"

export const metadata = {
  title: "Tasks",
}

export default async function TasksPage() {
  const session = await getServerSession(authOptions)
  const tasks = await db.task.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  const todosTasks = tasks.filter((task) => task.status === "todos")
  const inProgressTasks = tasks.filter((task) => task.status === "inprogress")
  const doneTasks = tasks.filter((task) => task.status === "done")

  return (
    <div>
      <header className="md:light:border-slate-200 sticky z-40 md:border-b md:dark:border-slate-800">
        <DashboardTopbar section="Tasks" />
      </header>

      <main className="flex w-full flex-1 flex-col overflow-hidden">
        <div>
          <div className="flex items-center justify-between border-b bg-accent px-8 py-3">
            <h2>Todos</h2>
            <NewTaskButton taskStatus="todos" />
          </div>
          {todosTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between border-b bg-accent px-8 py-3">
            <h2>In Progress</h2>
            <NewTaskButton taskStatus="inprogress" />
          </div>
          {inProgressTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between border-b bg-accent px-8 py-3">
            <h2>Done</h2>
            <NewTaskButton taskStatus="done" />
          </div>
          {doneTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </main>
    </div>
  )
}
