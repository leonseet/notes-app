// import { getServerSession } from "next-auth/next"
import * as z from "zod"

// import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
// import { RequiresProPlanError } from "@/lib/exceptions"
// import { getUserSubscriptionPlan } from "@/lib/subscription"

const taskCreateSchema = z.object({
  title: z.string(),
  taskStatus: z.string(),
  content: z.string().optional(),
})

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions)

//     if (!session) {
//       return new Response("Unauthorized", { status: 403 })
//     }

//     const { user } = session
//     const tasks = await db.task.findMany({
//       select: {
//         id: true,
//         title: true,
//         published: true,
//         createdAt: true,
//       },
//       where: {
//         authorId: user.id,
//       },
//     })

//     return new Response(JSON.stringify(tasks))
//   } catch (error) {
//     return new Response(null, { status: 500 })
//   }
// }

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const { user } = session

    const json = await req.json()
    const body = taskCreateSchema.parse(json)

    const task = await db.task.create({
      data: {
        title: body.title,
        content: body.content,
        status: body.taskStatus,
        userId: user.id,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(task))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
