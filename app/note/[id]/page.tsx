import CommandButton from "@/components/CommandButton";
import Editor from "@/components/Editor";
import { db } from "@/lib/db";

export const metadata = {
  title: "Note Page",
};

export default async function NotePage({ params }) {
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
    <div className="bg-background min-h-screen border py-6">
      <div className="container">
        <Editor fullScreen note={note} />
      </div>
      <div className="hidden">
        <CommandButton />
      </div>
    </div>
  );
}
