// import { getServerSession } from "next-auth"
import * as z from "zod"

// import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { notePatchSchema } from "@/lib/validations/note"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

const routeContextSchema = z.object({
  params: z.object({
    noteId: z.string(),
  }),
})

export async function DELETE(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this note.
    if (!(await verifyCurrentUserHasAccessToNote(params.noteId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the note.
    await db.note.delete({
      where: {
        id: params.noteId as string,
      },
    })

    return new Response(null, { status: 204 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function PATCH(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    // Validate route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this note.
    if (!(await verifyCurrentUserHasAccessToNote(params.noteId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const json = await req.json()
    const body = notePatchSchema.parse(json)

    // Update the note.
    // TODO: Implement sanitization for content.
    await db.note.update({
      where: {
        id: params.noteId,
      },
      data: {
        title: body.title,
        content: body.content,
        updatedAt: new Date(),
        published: body.published,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

async function verifyCurrentUserHasAccessToNote(noteId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.note.count({
    where: {
      id: noteId,
      userId: session?.user.id,
    },
  })

  return count > 0
}
