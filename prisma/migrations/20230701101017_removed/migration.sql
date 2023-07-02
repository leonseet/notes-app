/*
  Warnings:

  - You are about to drop the column `taskListId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `TaskList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_taskListId_fkey";

-- DropForeignKey
ALTER TABLE "TaskList" DROP CONSTRAINT "TaskList_userId_fkey";

-- DropIndex
DROP INDEX "Task_taskListId_idx";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "taskListId",
ADD COLUMN     "status" TEXT NOT NULL;

-- DropTable
DROP TABLE "TaskList";
