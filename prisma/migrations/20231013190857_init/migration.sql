-- CreateTable
CREATE TABLE "CardholderLog" (
    "id" SERIAL NOT NULL,
    "signature" TEXT NOT NULL,
    "messageHash" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CardholderLog_pkey" PRIMARY KEY ("id")
);
