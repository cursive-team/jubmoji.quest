-- CreateTable
CREATE TABLE "PowerSigNullifier" (
    "id" SERIAL NOT NULL,
    "nullifier" TEXT NOT NULL,
    "powerId" INTEGER NOT NULL,

    CONSTRAINT "PowerSigNullifier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "powerId_idx" ON "PowerSigNullifier"("powerId");

-- CreateIndex
CREATE UNIQUE INDEX "PowerSigNullifier_nullifier_powerId_key" ON "PowerSigNullifier"("nullifier", "powerId");

-- AddForeignKey
ALTER TABLE "PowerSigNullifier" ADD CONSTRAINT "PowerSigNullifier_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "Power"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
