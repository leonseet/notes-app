import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { TaskStatus } from "@/types"
import { Task } from "@prisma/client"
import { addTopLexorank } from "@/lib/add-top-lexorank"

interface useNewTaskProps {
  taskStatus: TaskStatus
  tasks: Task[]
}

const useNewTask = ({ taskStatus, tasks }: useNewTaskProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function createNewTask() {
    setIsLoading(true)
    const newRank = await addTopLexorank(tasks)

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Task",
        taskStatus,
        lexoRank: newRank,
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your task was not created. Please try again.",
        variant: "destructive",
      })
    }

    // const task = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    // router.push(`/task/${task.id}`)
  }

  return { createNewTask, isLoading }
}

export default useNewTask
