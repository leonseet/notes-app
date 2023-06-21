"use client"
import { Note } from "@prisma/client"
import moment from "moment"
import Link from "next/link"
import { FC, useState } from "react"
import NoteSettingButton from "./NoteSettingButton"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useRouter } from "next/navigation"
import { toast } from "./ui/use-toast"

interface NoteCardProps {
  note: Pick<Note, "id" | "title" | "updatedAt" | "createdAt" | "published">
}

const NoteCard: FC<NoteCardProps> = ({ note }) => {
  const [firstClick, setFirstClick] = useState(false)
  const router = useRouter()

  const onDelete = async (event) => {
    event.preventDefault()
    if (firstClick) {
      const response = await fetch(`/api/notes/${note.id}`, {
        method: "DELETE",
      })

      setFirstClick(false)

      if (!response?.ok) {
        return toast({
          title: "Something went wrong.",
          description: "Your note was not deleted. Please try again.",
          variant: "destructive",
        })
      }

      router.refresh()

      return toast({
        description: "Your note was deleted.",
        variant: "default",
      })
    } else {
      setFirstClick(true)
    }
  }

  const onOpenChange = () => {
    setFirstClick(false)
  }
  return (
    <ContextMenu onOpenChange={onOpenChange}>
      <ContextMenuTrigger>
        <div
          key={note.id}
          className="border flex justify-between px-4 py-4 items-center hover:bg-accent/50"
        >
          <div className="flex flex-col">
            <Link href={`/note/${note.id}`} className="hover:underline cursor-pointer">
              {note.title}
            </Link>
            <p className="text-secondary-foreground text-xs">
              {moment(note.updatedAt).format("MMMM Do YYYY, h:mm a")}
            </p>
          </div>
          <NoteSettingButton noteId={note.id} />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-36">
        <ContextMenuItem
          onSelect={onDelete}
          className={
            firstClick
              ? " bg-red-500 text-white focus:bg-red-500 focus:text-white cursor-pointer"
              : "cursor-pointer"
          }
        >
          {" "}
          {firstClick ? "Confirm Delete?" : "Delete"}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default NoteCard
