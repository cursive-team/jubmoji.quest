/*
  Warnings:

  - A unique constraint covering the columns `[index]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `index` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CardTag" AS ENUM ('OFFICIAL', 'ROLES', 'APPLICATIONS', 'COMMUNITY', 'DEV_TOOLS', 'INFRASTRUCTURE', 'PRIVACY', 'PERSONAL');

-- CreateEnum
CREATE TYPE "ProofType" AS ENUM ('IN_COLLECTION', 'IN_COLLECTION_NONCE', 'N_UNIQUE_IN_COLLECTION');

-- CreateEnum
CREATE TYPE "PowerType" AS ENUM ('QR_CODE', 'TELEGRAM', 'TWITTER');

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "index" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "owner" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Quest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" "CardTag"[],
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "proofType" "ProofType" NOT NULL,
    "proofParams" JSONB NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Power" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sigNullifierRandomness" TEXT,
    "powerType" "PowerType" NOT NULL,
    "powerParams" JSONB NOT NULL,
    "questId" INTEGER NOT NULL,

    CONSTRAINT "Power_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PrerequisiteCards" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CollectionCards" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PrerequisiteCards_AB_unique" ON "_PrerequisiteCards"("A", "B");

-- CreateIndex
CREATE INDEX "_PrerequisiteCards_B_index" ON "_PrerequisiteCards"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionCards_AB_unique" ON "_CollectionCards"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionCards_B_index" ON "_CollectionCards"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Card_index_key" ON "Card"("index");

-- AddForeignKey
ALTER TABLE "Power" ADD CONSTRAINT "Power_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrerequisiteCards" ADD CONSTRAINT "_PrerequisiteCards_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrerequisiteCards" ADD CONSTRAINT "_PrerequisiteCards_B_fkey" FOREIGN KEY ("B") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionCards" ADD CONSTRAINT "_CollectionCards_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionCards" ADD CONSTRAINT "_CollectionCards_B_fkey" FOREIGN KEY ("B") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
