-- CreateTable
CREATE TABLE "TeamLeaderboardProofLog" (
    "id" SERIAL NOT NULL,
    "isVerificationLog" BOOLEAN NOT NULL,
    "includesTeamProof" BOOLEAN NOT NULL,
    "membershipProofCount" INTEGER NOT NULL,
    "verifiedMembershipProofCount" INTEGER,
    "proofTime" INTEGER NOT NULL,
    "questId" INTEGER NOT NULL,
    "teamPubKeyIndex" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamLeaderboardProofLog_pkey" PRIMARY KEY ("id")
);
