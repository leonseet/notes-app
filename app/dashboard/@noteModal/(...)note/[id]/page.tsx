import NoteModal from "@/components/NoteModal"
import { XIcon, Maximize2Icon } from "lucide-react"

export default function NoteModalPage() {
  return (
    <NoteModal>
      <div className="bg-secondary rounded-md h-full p-4 border">
        <div>
          <div className="flex items-center">
            <div className="cursor-pointer h-9 w-9 hover:bg-accent flex items-center justify-center rounded-md">
              <XIcon className="w-7 h-7" />
            </div>
            <div className="cursor-pointer h-9 w-9 hover:bg-accent flex items-center justify-center rounded-md">
              <Maximize2Icon className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="mx-10 md:mx-20">
          <input
            type="text"
            value="Untitled Note"
            className="mt-16 text-4xl font-bold outline-none bg-transparent"
          />
        </div>
      </div>
    </NoteModal>
  )
}
