-- AlterEnum
ALTER TYPE "ProofType" ADD VALUE 'TEAM_LEADERBOARD';

-- CreateTable
CREATE TABLE "TeamLeaderboardNullifiers" (
    "id" SERIAL NOT NULL,
    "teamPubKeyIndex" INTEGER NOT NULL,
    "sigNullifier" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questId" INTEGER NOT NULL,

    CONSTRAINT "TeamLeaderboardNullifiers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeamLeaderboardNullifiers" ADD CONSTRAINT "TeamLeaderboardNullifiers_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
