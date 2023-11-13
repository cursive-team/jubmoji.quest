-- CreateTable
CREATE TABLE "LeaderboardPseudonym" (
    "id" SERIAL NOT NULL,
    "pseudonym" TEXT NOT NULL,
    "pubKeyNullifierRandomnessHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questId" INTEGER NOT NULL,

    CONSTRAINT "LeaderboardPseudonym_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "questId_idx" ON "LeaderboardPseudonym"("questId");

-- AddForeignKey
ALTER TABLE "LeaderboardPseudonym" ADD CONSTRAINT "LeaderboardPseudonym_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
