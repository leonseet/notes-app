"use client"

import { MoreVertical, CheckIcon } from "lucide-react"
import { FC, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Note } from "@prisma/client"
import { toast } from "./ui/use-toast"
import { useRouter } from "next/navigation"

interface NoteSettingButtonProps {
  noteId: string
}

const NoteSettingButton: FC<NoteSettingButtonProps> = ({ noteId }) => {
  const [firstClick, setFirstClick] = useState(false)
  const router = useRouter()

  const onDelete = async (event) => {
    event.preventDefault()
    if (firstClick) {
      const response = await fetch(`/api/notes/${noteId}`, {
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
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger>
        <div className="py-1.5 px-1 border rounded-md">
          <MoreVertical className="cursor-pointer w-4 h-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem
          onSelect={onDelete}
          className={
            firstClick
              ? " bg-red-500 text-white focus:bg-red-500 focus:text-white cursor-pointer"
              : "cursor-pointer"
          }
        >
          {firstClick ? "Confirm Delete?" : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NoteSettingButton
