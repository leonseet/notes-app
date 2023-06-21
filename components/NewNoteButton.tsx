"use client"

import { FC, useState } from "react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { toast } from "./ui/use-toast"

interface NewNoteButtonProps {}

const NewNoteButton: FC<NewNoteButtonProps> = ({}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const response = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Post",
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not created. Please try again.",
        variant: "destructive",
      })
    }

    const note = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    router.push(`/note/${note.id}`)
  }

  return (
    <div>
      {!isLoading ? (
        <Button onClick={onClick}>+ New note</Button>
      ) : (
        <Button loading="yes">+ New note</Button>
      )}
    </div>
  )
}

export default NewNoteButton
