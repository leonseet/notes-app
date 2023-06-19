import NoteModal from "@/components/NoteModal";
import Editor from "@/components/Editor";
import { db } from "@/lib/db";

export default async function NoteModalPage({ params }) {
  const id = params.id;
  const note = await db.note.findFirst({
    where: {
      id,
    },
  });

  if (!note) {
    return null;
  }

  return (
    <NoteModal>
      <div className="bg-background rounded-md h-full p-6 border shadow-md">
        <Editor note={note} />
      </div>
    </NoteModal>
  );
}
