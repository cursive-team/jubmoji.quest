/*
  Warnings:

  - You are about to drop the column `manifestation` on the `ClubPost` table. All the data in the column will be lost.
  - Added the required column `typeOfTweet` to the `ClubPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClubPost" DROP COLUMN "manifestation",
ADD COLUMN     "typeOfTweet" TEXT NOT NULL;
