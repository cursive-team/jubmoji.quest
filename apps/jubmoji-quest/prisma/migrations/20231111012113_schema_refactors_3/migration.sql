/*
  Warnings:

  - Made the column `type` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "type" SET NOT NULL;
