import { PrismaClient, Prisma } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

async function main() {
  const note1: Prisma.NoteCreateInput = {
    id: uuidv4(),
    title: "First Note",
    content: { text: "This is the first note." },
    published: true,
    authorId: "author1",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const note2: Prisma.NoteCreateInput = {
    id: uuidv4(),
    title: "Second Note",
    content: { text: "This is the second note." },
    published: false,
    authorId: "author2",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await prisma.note.upsert({
    where: { id: note1.id },
    update: {},
    create: note1,
  });

  await prisma.note.upsert({
    where: { id: note2.id },
    update: {},
    create: note2,
  });

  console.log("Notes seeded.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
