/*
  Warnings:

  - You are about to drop the column `sigNullifierRandomness` on the `Power` table. All the data in the column will be lost.
  - Made the column `endTime` on table `Power` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startTime` on table `Power` required. This step will fail if there are existing NULL values in that column.
  - Made the column `proofParams` on table `Power` required. This step will fail if there are existing NULL values in that column.
  - Made the column `proofType` on table `Power` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startTime` on table `Quest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endTime` on table `Quest` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "type" SET DEFAULT 'PERSONAL';

-- AlterTable
ALTER TABLE "Power" DROP COLUMN "sigNullifierRandomness",
ALTER COLUMN "endTime" SET NOT NULL,
ALTER COLUMN "startTime" SET NOT NULL,
ALTER COLUMN "proofParams" SET NOT NULL,
ALTER COLUMN "proofType" SET NOT NULL;

-- AlterTable
ALTER TABLE "Quest" ALTER COLUMN "startTime" SET NOT NULL,
ALTER COLUMN "endTime" SET NOT NULL;
