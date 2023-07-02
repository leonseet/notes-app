import DashboardTopbar from "@/components/DashboardTopbar"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import NewTaskButton from "@/components/NewTaskButton"
import TaskItem from "@/components/TaskItem"
import DnDContextTasks from "@/components/DnDContextTasks"
import SortableContextTasks from "@/components/SortableContextTasks"

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
      lexoRank: "asc",
    },
  })

  const todosTasks = tasks.filter((task) => task.status === "todos")
  const inProgressTasks = tasks.filter((task) => task.status === "inprogress")
  const doneTasks = tasks.filter((task) => task.status === "done")

  return (
    <div>
      <DnDContextTasks tasks={tasks}>
        <header className="md:light:border-slate-200 sticky z-40 md:border-b md:dark:border-slate-800">
          <DashboardTopbar section="Tasks" />
        </header>

        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <SortableContextTasks taskStatus="todos" tasks={todosTasks}>
            <div>
              <div className="flex items-center justify-between border-b bg-accent px-8 py-3">
                <h2>Todos</h2>
                <NewTaskButton taskStatus="todos" tasks={todosTasks} />
              </div>
              {todosTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </SortableContextTasks>

          <SortableContextTasks taskStatus="inprogress" tasks={inProgressTasks}>
            <div>
              <div className="flex items-center justify-between border-b bg-accent px-8 py-3">
                <h2>In Progress</h2>
                <NewTaskButton taskStatus="inprogress" tasks={inProgressTasks} />
              </div>
              {inProgressTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </SortableContextTasks>

          <SortableContextTasks taskStatus="done" tasks={doneTasks}>
            <div>
              <div className="flex items-center justify-between border-b bg-accent px-8 py-3">
                <h2>Done</h2>
                <NewTaskButton taskStatus="done" tasks={doneTasks} />
              </div>
              {doneTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </SortableContextTasks>
        </main>
      </DnDContextTasks>
    </div>
  )
}
