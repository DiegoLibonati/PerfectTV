-- CreateTable
CREATE TABLE "Base" (
    "id" SERIAL NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "idSource" INTEGER NOT NULL,

    CONSTRAINT "Base_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Base_baseUrl_key" ON "Base"("baseUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Base_idSource_key" ON "Base"("idSource");

-- AddForeignKey
ALTER TABLE "Base" ADD CONSTRAINT "Base_idSource_fkey" FOREIGN KEY ("idSource") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
