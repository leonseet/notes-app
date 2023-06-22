import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

const useNewNote = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function createNewNote() {
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

  return { createNewNote, isLoading }
}

export default useNewNote
