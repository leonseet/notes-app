import { PrismaClient, Prisma } from "@prisma/client"
import { createId } from "@paralleldrive/cuid2"
import { hash } from "bcrypt"

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

  await prisma.user.upsert({
    where: { id: demoUserId },
    update: {},
    create: demoUser,
  })

  console.log("User seeded.")

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
