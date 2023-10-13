/*
  Warnings:

  - Added the required column `verified` to the `CardholderLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CardholderLog" ADD COLUMN     "verified" BOOLEAN NOT NULL;
