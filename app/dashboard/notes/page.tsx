import DashboardTopbar from "@/components/DashboardTopbar"
import { Button } from "@/components/ui/button"
import { MoreVertical } from "lucide-react"
import { store } from "@/redux/store"
import Link from "next/link"
import { db } from "@/lib/db"
import moment from "moment"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const notes = await db.note.findMany({
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
          <Button>+ New note</Button>
        </div>

        {notes.map((note) => (
          <Link
            href={`/note/${note.id}`}
            key={note.id}
            className="border flex justify-between px-4 py-4 items-center hover:bg-accent"
          >
            <div className="flex flex-col">
              <p className="hover:underline cursor-pointer">{note.title}</p>
              <p className="text-secondary-foreground text-xs">
                {moment(note.updatedAt).format("MMMM Do YYYY, h:mm a")}
              </p>
            </div>
            <MoreVertical className="cursor-pointer" />
          </Link>
        ))}
      </main>
    </div>
  )
}
