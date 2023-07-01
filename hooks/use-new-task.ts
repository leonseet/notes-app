import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { TaskStatus } from "@/types"

interface useNewTaskProps {
  taskStatus: TaskStatus
}

const useNewTask = ({ taskStatus }: useNewTaskProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function createNewTask() {
    setIsLoading(true)

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Task",
        taskStatus,
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

    const task = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    // router.push(`/task/${task.id}`)
  }

  return { createNewTask, isLoading }
}

export default useNewTask
