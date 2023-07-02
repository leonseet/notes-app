// import { getServerSession } from "next-auth"
import * as z from "zod"

// import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
// import { taskPatchSchema } from "@/lib/validations/task"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

const routeContextSchema = z.object({
  params: z.object({
    taskId: z.string(),
  }),
})

export async function DELETE(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    // Validate the route params.
    const { params } = routeContextSchema.parse(context)

    // Check if the user has access to this task.
    if (!(await verifyCurrentUserHasAccessTotask(params.taskId))) {
      return new Response(null, { status: 403 })
    }

    // Delete the task.
    await db.task.delete({
      where: {
        id: params.taskId as string,
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

    // Check if the user has access to this task.
    if (!(await verifyCurrentUserHasAccessTotask(params.taskId))) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    // const json = await req.json()
    // const body = taskPatchSchema.parse(json)
    const body = await req.json()

    // Update the task.
    // TODO: Implement sanitization for content.
    await db.task.update({
      where: {
        id: params.taskId,
      },
      data: {
        title: body.title,
        content: body.content,
        updatedAt: new Date(),
        lexoRank: body.lexoRank,
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

async function verifyCurrentUserHasAccessTotask(taskId: string) {
  const session = await getServerSession(authOptions)
  const count = await db.task.count({
    where: {
      id: taskId,
      userId: session?.user.id,
    },
  })

  return count > 0
}
