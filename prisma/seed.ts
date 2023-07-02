import { PrismaClient, Prisma } from "@prisma/client"
import { createId } from "@paralleldrive/cuid2"
import { hash } from "bcrypt"
import { LexoRank } from "lexorank"

const prisma = new PrismaClient()

async function main() {
  const hashed = await hash("password", 12)
  const demoUserId = createId()

  const demoUser: Prisma.UserCreateInput = {
    id: demoUserId,
    name: "Demo User",
    email: "demo@gmail.com",
    password: hashed,
  }

  await prisma.user.upsert({
    where: { id: demoUserId },
    update: {},
    create: demoUser,
  })

  console.log("User seeded.")

  const note1: Prisma.NoteCreateInput = {
    id: createId(),
    title: "First Note",
    content: { text: "This is the first note." },
    published: true,
    user: { connect: { id: demoUserId } },
  }

  const note2: Prisma.NoteCreateInput = {
    id: createId(),
    title: "Second Note",
    content: { text: "This is the second note." },
    published: true,
    user: { connect: { id: demoUserId } },
  }

  await prisma.note.upsert({
    where: { id: note1.id },
    update: {},
    create: note1,
  })

  await prisma.note.upsert({
    where: { id: note2.id },
    update: {},
    create: note2,
  })

  console.log("Notes seeded.")

  const task1: Prisma.TaskCreateInput = {
    id: createId(),
    title: "First Task",
    user: { connect: { id: demoUserId } },
    status: "todos",
    lexoRank: LexoRank.middle().toString(),
  }

  const task2: Prisma.TaskCreateInput = {
    id: createId(),
    title: "Second Task",
    user: { connect: { id: demoUserId } },
    status: "inprogress",
    lexoRank: LexoRank.middle().toString(),
  }

  const task3: Prisma.TaskCreateInput = {
    id: createId(),
    title: "Third Task",
    user: { connect: { id: demoUserId } },
    status: "done",
    lexoRank: LexoRank.middle().toString(),
  }

  await prisma.task.upsert({
    where: { id: task1.id },
    update: {},
    create: task1,
  })

  await prisma.task.upsert({
    where: { id: task2.id },
    update: {},
    create: task2,
  })

  await prisma.task.upsert({
    where: { id: task3.id },
    update: {},
    create: task3,
  })

  console.log("Tasks seeded.")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
