-- CreateTable
CREATE TABLE "Club" (
    "clubName" TEXT NOT NULL,
    "serializedTwitterToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("clubName")
);

-- CreateTable
CREATE TABLE "ClubPost" (
    "id" SERIAL NOT NULL,
    "cardIndex" INTEGER,
    "clubName" TEXT NOT NULL,
    "postText" TEXT NOT NULL,
    "tweetId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "manifestation" BOOLEAN NOT NULL DEFAULT false,
    "proof" JSONB NOT NULL,

    CONSTRAINT "ClubPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClubCards" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClubCards_AB_unique" ON "_ClubCards"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubCards_B_index" ON "_ClubCards"("B");

-- AddForeignKey
ALTER TABLE "ClubPost" ADD CONSTRAINT "ClubPost_clubName_fkey" FOREIGN KEY ("clubName") REFERENCES "Club"("clubName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubPost" ADD CONSTRAINT "ClubPost_cardIndex_fkey" FOREIGN KEY ("cardIndex") REFERENCES "Card"("index") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubCards" ADD CONSTRAINT "_ClubCards_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubCards" ADD CONSTRAINT "_ClubCards_B_fkey" FOREIGN KEY ("B") REFERENCES "Club"("clubName") ON DELETE CASCADE ON UPDATE CASCADE;
