"use client"
import useNewNote from "@/hooks/use-new-note"
import { FC } from "react"
import { Button } from "./ui/button"
import { Loader2, PlusSquare } from "lucide-react"

interface DashboardNewNoteButtonProps {}

const DashboardNewNoteButton: FC<DashboardNewNoteButtonProps> = ({}) => {
  const { createNewNote, isLoading } = useNewNote()
  return (
    <Button
      onClick={createNewNote}
      size="sm"
      variant="background"
      className="w-full justify-start space-x-2"
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <PlusSquare className="h-5 w-5" />
      )}
      <p>New Note</p>
    </Button>
  )
}

export default DashboardNewNoteButton
