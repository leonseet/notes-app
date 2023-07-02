import { Task } from "@prisma/client"
import { LexoRank } from "lexorank"

export async function addTopLexorank(tasks: Task[]) {
  const topRank = tasks[0]?.lexoRank
  const newRank = LexoRank.parse(topRank).genPrev()
  return newRank.toString()
}
