import NoteModal from "@/components/NoteModal"
import Editor from "@/components/Editor"
import { db } from "@/lib/db"
import { ScrollArea } from "@/components/ui/scroll-area"

export default async function NoteModalPage({ params }) {
  const id = params.id
  const note = await db.note.findFirst({
    where: {
      id,
    },
  })

  if (!note) {
    return null
  }

  return (
    <NoteModal>
      <ScrollArea className="h-full rounded-md border bg-background pb-6 shadow-md">
        <Editor note={note} />
      </ScrollArea>
    </NoteModal>
  )
}
