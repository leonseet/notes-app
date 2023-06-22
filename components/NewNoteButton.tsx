"use client"

import { FC } from "react"
import { Button } from "./ui/button"
import useNewNote from "@/hooks/use-new-note"

interface NewNoteButtonProps {}

const NewNoteButton: FC<NewNoteButtonProps> = ({}) => {
  const { createNewNote, isLoading } = useNewNote()

  return (
    <div>
      {!isLoading ? (
        <Button onClick={createNewNote}>+ New note</Button>
      ) : (
        <Button loading="yes">+ New note</Button>
      )}
    </div>
  )
}

export default NewNoteButton
