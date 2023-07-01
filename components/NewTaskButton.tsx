"use client"
import useNewTask from "@/hooks/use-new-task"
import { TaskStatus } from "@/types"
import { Plus } from "lucide-react"
import { FC } from "react"
import { Button } from "./ui/button"

interface NewTaskButtonProps {
  taskStatus: TaskStatus
}

const NewTaskButton: FC<NewTaskButtonProps> = ({ taskStatus }) => {
  const { createNewTask, isLoading } = useNewTask({ taskStatus })

  return (
    <div>
      {!isLoading ? (
        <Button variant="ghost" className="p-0" onClick={createNewTask}>
          <Plus className="h-5 w-5" />
        </Button>
      ) : (
        <Button variant="ghost" className="p-0" loading="yes" />
      )}
    </div>
  )
}

export default NewTaskButton
