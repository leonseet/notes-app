"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Note } from "@prisma/client";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import * as z from "zod";

import "@/styles/editor.css";
import "@/styles/editor-mod.css";
import { cn } from "@/lib/utils";
import { notePatchSchema } from "@/lib/validations/note";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Loader2Icon,
  XIcon,
  ExpandIcon,
  Clock3Icon,
  TagIcon,
} from "lucide-react";
import { Separator } from "./ui/separator";

interface EditorProps {
  note: Pick<Note, "id" | "title" | "content" | "published">;
}

type FormData = z.infer<typeof notePatchSchema>;

const Editor = ({ note }: EditorProps) => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(notePatchSchema),
  });
  const ref = React.useRef<EditorJS>();
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  // const [isMounted, setIsMounted] = React.useState<boolean>(false)

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;

    const body = notePatchSchema.parse(note);

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your note...",
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      });
    }
  }, [note]);

  // React.useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setIsMounted(true)
  //   }
  // }, [])

  React.useEffect(() => {
    // if (isMounted) {
    initializeEditor();

    return () => {
      ref.current?.destroy();
      ref.current = undefined;
    };
    // }
  }, [initializeEditor]);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const blocks = await ref.current?.save();
    console.log(blocks);

    const response = await fetch(`/api/notes/${note.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        content: blocks,
      }),
    });

    setIsSaving(false);

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your note was not saved. Please try again.",
        variant: "destructive",
      });
    }

    router.refresh();

    return toast({
      description: "Your note has been saved.",
    });
  }

  // if (!isMounted) {
  //   return null
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-16">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/dashboard/notes"
              className={cn(buttonVariants({ variant: "ghost" }), "px-1.5")}
            >
              <XIcon className="h-5 w-5" />
            </Link>
            <Link
              href="/dashboard/notes"
              className={cn(buttonVariants({ variant: "ghost" }), "px-1.5")}
            >
              <ExpandIcon className="h-4 w-4" />
            </Link>
            <p className="text-sm ml-10 text-muted-foreground">
              {note.published ? "Published" : "Draft"}
            </p>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {isSaving && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            <span>Save</span>
          </button>
        </div>

        <div
          className="prose-stone dark:prose-invert mx-16"
          style={{ minWidth: "100%" }}
        >
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={note.title}
            placeholder="Note title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register("title")}
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

          <Separator className="my-6" />
          <div id="editor" className="h-fit" />

          <p className="-mt-72 text-sm text-gray-500 opacity-40">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
      </div>
    </form>
  );
};

export default Editor;
