"use client"

import { FC } from "react"
import { SortableContext } from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
import { Task } from "@prisma/client"

interface SortableContextTasksProps {
  taskStatus: string
  tasks: Task[]
  children: React.ReactNode
}

const SortableContextTasks: FC<SortableContextTasksProps> = ({ taskStatus, tasks, children }) => {
  const { setNodeRef } = useDroppable({
    id: taskStatus + "-droppable",
  })
  return (
    <SortableContext items={tasks} id={taskStatus}>
      <div ref={setNodeRef}>{children}</div>
    </SortableContext>
  )
}

export default SortableContextTasks
