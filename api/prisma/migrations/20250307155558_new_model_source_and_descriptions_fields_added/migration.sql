/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Type` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Type` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idSource` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Type` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_name_key";

-- DropIndex
DROP INDEX "Type_name_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "idSource" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Type" DROP COLUMN "name",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Source" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Source_code_key" ON "Source"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Category_code_key" ON "Category"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Type_code_key" ON "Type"("code");

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_idSource_fkey" FOREIGN KEY ("idSource") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
