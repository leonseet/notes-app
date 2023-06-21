import { db } from "@/lib/db"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"
import { createId } from "@paralleldrive/cuid2"

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json()
    const hashed = await hash(password, 12)

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashed,
      },
    })

    return NextResponse.json({
      detail: "User created.",
      user: {
        email: user.email,
      },
    })
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        error: err.message,
      }),
      {
        status: 500,
      }
    )
  }
}
