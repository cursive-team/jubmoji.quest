/*
  Warnings:

  - A unique constraint covering the columns `[pubKeyNullifierRandomnessHash,questId]` on the table `LeaderboardPseudonym` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LeaderboardPseudonym_pubKeyNullifierRandomnessHash_questId_key" ON "LeaderboardPseudonym"("pubKeyNullifierRandomnessHash", "questId");
