"use client"

import { Circle, GripVertical } from "lucide-react"
import { FC } from "react"
import { Task } from "@prisma/client"
import moment from "moment"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface TaskItemProps {
  task: Task
}

const TaskItem: FC<TaskItemProps> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center justify-between border-b px-8 py-5 hover:bg-accent/50"
    >
      <div className="flex items-center gap-3">
        <GripVertical {...listeners} className="-ml-6 h-4 w-4 text-gray-400" />
        <p className="text-md text-secondary-foreground">LEO-13</p>
        <Circle className="h-4 w-4 text-gray-500" />
        <p className="cursor-pointer">{task.title}</p>
      </div>
      <p className="text-secondary-foreground">
        {moment(task.createdAt).format("MMMM Do YYYY, h:mm a")}
      </p>
    </div>
  )
}

export default TaskItem
