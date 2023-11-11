/*
  Warnings:

  - You are about to drop the column `tags` on the `Quest` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('PERSONAL', 'GROUP');

-- AlterEnum
ALTER TYPE "PowerType" ADD VALUE 'POAP';

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "twitterLink" TEXT,
ADD COLUMN     "type" "CardType",
ADD COLUMN     "websiteLink" TEXT;

-- AlterTable
ALTER TABLE "Power" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "proofParams" JSONB,
ADD COLUMN     "proofType" "ProofType";

-- AlterTable
ALTER TABLE "PowerSigNullifier" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "QRCode" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Quest" DROP COLUMN "tags",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isAlwaysVisible" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isOfficial" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "CardTag";

-- CreateTable
CREATE TABLE "_PowerPrerequisiteCards" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PowerCollectionCards" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PowerPrerequisiteCards_AB_unique" ON "_PowerPrerequisiteCards"("A", "B");

-- CreateIndex
CREATE INDEX "_PowerPrerequisiteCards_B_index" ON "_PowerPrerequisiteCards"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PowerCollectionCards_AB_unique" ON "_PowerCollectionCards"("A", "B");

-- CreateIndex
CREATE INDEX "_PowerCollectionCards_B_index" ON "_PowerCollectionCards"("B");

-- AddForeignKey
ALTER TABLE "_PowerPrerequisiteCards" ADD CONSTRAINT "_PowerPrerequisiteCards_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PowerPrerequisiteCards" ADD CONSTRAINT "_PowerPrerequisiteCards_B_fkey" FOREIGN KEY ("B") REFERENCES "Power"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PowerCollectionCards" ADD CONSTRAINT "_PowerCollectionCards_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PowerCollectionCards" ADD CONSTRAINT "_PowerCollectionCards_B_fkey" FOREIGN KEY ("B") REFERENCES "Power"("id") ON DELETE CASCADE ON UPDATE CASCADE;
