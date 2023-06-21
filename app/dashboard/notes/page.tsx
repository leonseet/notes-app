import DashboardTopbar from "@/components/DashboardTopbar"
import { Button } from "@/components/ui/button"
import { MoreVertical } from "lucide-react"
import { store } from "@/redux/store"
import Link from "next/link"
import { db } from "@/lib/db"
import moment from "moment"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import NewNoteButton from "@/components/NewNoteButton"
import NoteSettingButton from "@/components/NoteSettingButton"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const notes = await db.note.findMany({
    where: {
      userId: session?.user?.id,
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <div>
      <header className="sticky z-40 md:border-b md:light:border-slate-200 md:dark:border-slate-800">
        <DashboardTopbar section="Notes" />
      </header>

      <main className="flex w-full flex-1 flex-col overflow-hidden px-7 py-7 gap-4">
        <div className="flex justify-between items-center mb-4">
          <p className="">Create and manage notes.</p>
          <NewNoteButton />
        </div>

        {notes.map((note) => (
          <div key={note.id} className="border flex justify-between px-4 py-4 items-center">
            <div className="flex flex-col">
              <Link href={`/note/${note.id}`} className="hover:underline cursor-pointer">
                {note.title}
              </Link>
              <p className="text-secondary-foreground text-xs">
                {moment(note.updatedAt).format("MMMM Do YYYY, h:mm a")}
              </p>
            </div>
            <NoteSettingButton />
          </div>
        ))}
      </main>
    </div>
  )
}
