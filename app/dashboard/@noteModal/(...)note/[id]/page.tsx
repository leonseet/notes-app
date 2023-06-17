import NoteModal from "@/components/NoteModal"
import { XIcon, Maximize2Icon, Clock3Icon, TagIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Editor from "@/components/Editor"

export default function NoteModalPage() {
  return (
    <NoteModal>
      <div className="bg-secondary rounded-md h-full p-6 border">
        {/* <div>
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

          <div className="mt-6 flex">
            <div className="flex flex-col w-24 gap-2">
              <div className="flex items-center gap-1">
                <Clock3Icon className="w-4 h-4" />
                <p>Created</p>
              </div>
              <div className="flex items-center gap-1">
                <Clock3Icon className="w-4 h-4" />
                <p>Modified</p>
              </div>
              <div className="flex items-center gap-1">
                <TagIcon className="w-4 h-4" />
                <p>Tags</p>
              </div>
            </div>

            <div className="flex flex-col w-fit gap-2">
              <input
                type="text"
                value="June 9, 2023"
                className="ml-20 outline-none bg-transparent"
              />
              <input
                type="text"
                value="June 9, 2023"
                className="ml-20 outline-none bg-transparent"
              />
            </div>
          </div>

          <Separator className="mt-6" />
        </div> */}

        <Editor
          note={{
            id: "1",
            title: "Title",
            content: "Content",
            published: false,
          }}
        />
      </div>
    </NoteModal>
  )
}
