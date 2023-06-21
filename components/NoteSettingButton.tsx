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

interface NoteSettingButtonProps {}

const NoteSettingButton: FC<NoteSettingButtonProps> = ({}) => {
  const [firstClick, setFirstClick] = useState(false)

  const onDelete = (event) => {
    event.preventDefault()
    if (firstClick) {
      console.log("delete")
      setFirstClick(false)
    } else {
      setFirstClick(true)
    }
  }

  const onOpenChange = (open) => {
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
          className={firstClick ? " bg-red-500 text-white focus:bg-red-500 focus:text-white" : ""}
        >
          {firstClick ? "Confirm Delete?" : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NoteSettingButton
