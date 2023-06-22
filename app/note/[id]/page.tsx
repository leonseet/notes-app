import CommandButton from "@/components/CommandButton"
import Editor from "@/components/Editor"
import { db } from "@/lib/db"

export const metadata = {
  title: "Note Page",
}

export default async function NotePage({ params }) {
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
    <div className="min-h-screen border bg-background pb-6">
      <div className="">
        <Editor fullScreen note={note} />
      </div>
      <div className="hidden">
        <CommandButton />
      </div>
    </div>
  )
}
