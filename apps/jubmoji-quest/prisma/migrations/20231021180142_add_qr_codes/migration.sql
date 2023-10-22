-- CreateTable
CREATE TABLE "QRCode" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "serializedProof" TEXT NOT NULL,
    "powerId" INTEGER NOT NULL,

    CONSTRAINT "QRCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QRCode_uuid_key" ON "QRCode"("uuid");

-- AddForeignKey
ALTER TABLE "QRCode" ADD CONSTRAINT "QRCode_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "Power"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
