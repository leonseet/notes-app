"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import EditorJS from "@editorjs/editorjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { Note } from "@prisma/client"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import * as z from "zod"

import "@/styles/editor.css"
import "@/styles/editor-mod.css"
import { cn } from "@/lib/utils"
import { notePatchSchema } from "@/lib/validations/note"
import { Button, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Loader2Icon, XIcon, ExpandIcon, Clock3Icon, TagIcon, ChevronLeftIcon } from "lucide-react"
import { BsCloudCheck } from "react-icons/bs"
import { Separator } from "./ui/separator"
import moment from "moment"
import { useCallback, useEffect, useRef, useState } from "react"

interface EditorProps {
  note: Note
  fullScreen?: boolean
}

type FormData = z.infer<typeof notePatchSchema>

const Editor = ({ note, fullScreen }: EditorProps) => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(notePatchSchema),
  })
  const ref = useRef<EditorJS>()
  const router = useRouter()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [top, setTop] = useState(true)
  // const [isMounted, setIsMounted] = React.useState<boolean>(false)

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Embed = (await import("@editorjs/embed")).default
    const Table = (await import("@editorjs/table")).default
    const List = (await import("@editorjs/nested-list")).default
    const Code = (await import("@editorjs/code")).default
    const LinkTool = (await import("@editorjs/link")).default
    const InlineCode = (await import("@editorjs/inline-code")).default
    const Checklist = (await import("@editorjs/checklist")).default

    const body = notePatchSchema.parse(note)

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
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
          checklist: Checklist,
        },
      })
    }
  }, [note])

  // React.useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setIsMounted(true)
  //   }
  // }, [])

  useEffect(() => {
    // if (isMounted) {
    initializeEditor()

    return () => {
      ref.current?.destroy()
      ref.current = undefined
    }
    // }
  }, [initializeEditor])

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const blocks = await ref.current?.save()
    // console.log(blocks)

    const response = await fetch(`/api/notes/${note.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        content: blocks,
        published: true,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your note was not saved. Please try again.",
        variant: "destructive",
      })
    }

    if (fullScreen) {
      router.push("/dashboard/notes")
    } else {
      router.back()
      router.refresh()
    }

    return toast({
      description: "Your note has been saved.",
    })
  }

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    }
    window.addEventListener("scroll", scrollHandler)
    return () => window.removeEventListener("scroll", scrollHandler)
  }, [top])

  // if (!isMounted) {
  //   return null
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-16">
        <div
          className={`sticky top-0 z-30 flex w-full items-center justify-between bg-background px-4 py-4 ${
            !top && `shadow-sm dark:shadow-slate-900`
          }`}
        >
          <div className="flex items-center">
            {!fullScreen && (
              <div className="flex items-center">
                <Button
                  onClick={() => router.back()}
                  className="px-1.5"
                  variant="ghost"
                  type="button"
                >
                  <XIcon className="h-5 w-5" />
                </Button>
                <Button
                  onClick={() => location.reload()}
                  // onClick={() => router.push(`/note/${note.id}`)}
                  className="px-1.5"
                  variant="ghost"
                  type="button"
                >
                  <ExpandIcon className="h-4 w-4" />
                </Button>
              </div>
            )}

            {fullScreen && (
              <div>
                <Link
                  href="/dashboard/notes"
                  className={cn(buttonVariants({ variant: "ghost" }), "space-x-2 px-1.5")}
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                  <p>Back</p>
                </Link>
              </div>
            )}
            {note.published && (
              <div className="flex items-center justify-center gap-2">
                <BsCloudCheck className="ml-10 h-5 w-5 text-green-700" />
                <p className="text-sm  text-muted-foreground">
                  {moment(note.updatedAt).format("MMM Do YY, h:mm a")}
                </p>
              </div>
            )}
            {!note.published && <p className="ml-10 text-sm text-muted-foreground">Draft</p>}
          </div>
          <Button type="submit">
            {isSaving && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            <span>Save</span>
          </Button>
        </div>

        <div className={`${fullScreen && "container"}`}>
          <div className="prose-stone px-16 dark:prose-invert" style={{ minWidth: "100%" }}>
            <TextareaAutosize
              autoFocus
              id="title"
              defaultValue={note.title}
              placeholder="Note title"
              className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
              {...register("title")}
            />

            <div className="mt-6 flex">
              <div className="flex w-24 flex-col gap-2">
                <div className="flex items-center gap-1">
                  <Clock3Icon className="h-4 w-4" />
                  <p>Created</p>
                </div>
                {/* <div className="flex items-center gap-1">
                <Clock3Icon className="w-4 h-4" />
                <p>Modified</p>
              </div> */}
                <div className="flex items-center gap-1">
                  <TagIcon className="h-4 w-4" />
                  <p>Tags</p>
                </div>
              </div>

              <div className="flex w-fit flex-col gap-2">
                <p className="ml-20 bg-transparent outline-none">
                  {moment(note.createdAt).format("MMMM Do YYYY, h:mm a")}
                </p>
                {/* <p className="ml-20 outline-none bg-transparent">
                {moment(note.updatedAt).format("MMMM Do YYYY, h:mm a")}
              </p> */}
              </div>
            </div>

            <Separator className="my-6" />
            <div id="editor" />

            <p className="mt-6text-sm text-gray-500 opacity-40">
              Use <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd> to
              open the command menu.
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Editor
