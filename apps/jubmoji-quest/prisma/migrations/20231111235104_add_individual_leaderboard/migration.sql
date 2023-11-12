-- AlterEnum
ALTER TYPE "ProofType" ADD VALUE 'LEADERBOARD';

-- CreateTable
CREATE TABLE "LeaderboardNullifiers" (
    "id" SERIAL NOT NULL,
    "pubKeyNullifier" TEXT NOT NULL,
    "pubKeyNullifierRandomnessHash" TEXT NOT NULL,
    "sigNullifier" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questId" INTEGER NOT NULL,

    CONSTRAINT "LeaderboardNullifiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaderboardProofLog" (
    "id" SERIAL NOT NULL,
    "isVerificationLog" BOOLEAN NOT NULL,
    "proofCount" INTEGER NOT NULL,
    "verifiedProofCount" INTEGER,
    "proofTime" INTEGER NOT NULL,
    "questId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeaderboardProofLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LeaderboardNullifiers" ADD CONSTRAINT "LeaderboardNullifiers_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
