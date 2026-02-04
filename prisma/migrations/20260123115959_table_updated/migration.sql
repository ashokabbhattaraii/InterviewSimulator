/*
  Warnings:

  - You are about to drop the column `answerId` on the `Attempt` table. All the data in the column will be lost.
  - You are about to drop the column `isCorrect` on the `Attempt` table. All the data in the column will be lost.
  - You are about to drop the column `questionId` on the `Attempt` table. All the data in the column will be lost.
  - You are about to drop the column `timeSpent` on the `Attempt` table. All the data in the column will be lost.
  - Added the required column `mockType` to the `Attempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result` to the `Attempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAttempt` to the `Attempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCorrect` to the `Attempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalIncorrect` to the `Attempt` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MockType" AS ENUM ('MCQ', 'Coding', 'Behavioral', 'Technical');

-- DropForeignKey
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_answerId_fkey";

-- DropForeignKey
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_questionId_fkey";

-- DropIndex
DROP INDEX "Attempt_userId_createdAt_idx";

-- DropIndex
DROP INDEX "Attempt_userId_questionId_idx";

-- AlterTable
ALTER TABLE "Attempt" DROP COLUMN "answerId",
DROP COLUMN "isCorrect",
DROP COLUMN "questionId",
DROP COLUMN "timeSpent",
ADD COLUMN     "mockType" "MockType" NOT NULL,
ADD COLUMN     "result" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalAttempt" INTEGER NOT NULL,
ADD COLUMN     "totalCorrect" INTEGER NOT NULL,
ADD COLUMN     "totalIncorrect" INTEGER NOT NULL;
