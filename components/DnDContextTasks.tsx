"use client"

import { FC, useState } from "react"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import TaskItem from "./TaskItem"
import { Task } from "@prisma/client"
import { LexoRank } from "lexorank"
import { toast } from "./ui/use-toast"
import { useRouter } from "next/navigation"

interface DnDContextTasksProps {
  tasks: Task[]
  children: React.ReactNode
}

const DnDContextTasks: FC<DnDContextTasksProps> = ({ tasks, children }) => {
  // console.log("🚀 ~ file: DnDContextTasks.tsx:14 ~ tasks:", tasks)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const router = useRouter()

  const onDragStart = (e: DragStartEvent) => {
    const { active } = e
    setActiveId(active.id as string)
    setActiveTask(tasks.filter((task) => task.id === active.id)[0])
    // console.log("🚀 ~ file: DnDContextTasks.tsx:13 ~ onDragStart ~ active:", active)
  }

  const onDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e

    const activeId = active.id
    const overId = over?.id

    if (!overId) return

    const activeList = active.data.current?.sortable.items
    const overList = over?.data.current?.sortable.items

    const activeTask = tasks.filter((task) => task.id === activeId)[0]
    const overTask = tasks.filter((task) => task.id === overId)[0]

    let newRank = ""
    // shifting up the list
    if (activeTask.lexoRank > overTask.lexoRank) {
      const overIndex = overList?.indexOf(overId)
      const overRank = overTask.lexoRank

      if (overIndex === 0) {
        newRank = LexoRank.parse(overRank).genPrev().toString()
      } else {
        const prevTask = tasks.filter((task) => task.id === overList[overIndex - 1])[0]
        const prevRank = prevTask.lexoRank
        newRank = LexoRank.parse(overRank).between(LexoRank.parse(prevRank)).toString()
      }
    }

    // shifting down the list
    if (activeTask.lexoRank < overTask.lexoRank) {
      const overIndex = overList?.indexOf(overId)
      const overRank = overTask.lexoRank

      if (overIndex === overList?.length - 1) {
        newRank = LexoRank.parse(overRank).genNext().toString()
      } else {
        const nextTask = tasks.filter((task) => task.id === overList[overIndex + 1])[0]
        const nextRank = nextTask.lexoRank
        newRank = LexoRank.parse(overRank).between(LexoRank.parse(nextRank)).toString()
      }
    }

    const response = await fetch(`/api/tasks/${activeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lexoRank: newRank,
      }),
    })

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your task was not updated. Please try again.",
        variant: "destructive",
      })
    }

    router.refresh()
  }

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {children}
      {activeTask && (
        <DragOverlay>
          <TaskItem task={activeTask} />
        </DragOverlay>
      )}
    </DndContext>
  )
}

export default DnDContextTasks
