/*
  Warnings:

  - The `fantasyId` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "height" TEXT,
ADD COLUMN     "jerseyNumber" TEXT,
ADD COLUMN     "weight" TEXT,
ALTER COLUMN "team" DROP NOT NULL,
ALTER COLUMN "position" DROP NOT NULL,
DROP COLUMN "fantasyId",
ADD COLUMN     "fantasyId" INTEGER;
