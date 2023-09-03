/*
  Warnings:

  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Player";

-- CreateTable
CREATE TABLE "players" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "height" TEXT,
    "weight" TEXT,
    "team" TEXT,
    "jerseyNumber" INTEGER,
    "position" TEXT,
    "fantasyId" INTEGER,
    "sleeperId" TEXT NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "average_draft_positions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "playerId" TEXT NOT NULL,
    "halfPpr" INTEGER,
    "ppr" INTEGER,
    "standard" INTEGER,

    CONSTRAINT "average_draft_positions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "players_sleeperId_key" ON "players"("sleeperId");

-- CreateIndex
CREATE UNIQUE INDEX "average_draft_positions_playerId_key" ON "average_draft_positions"("playerId");

-- AddForeignKey
ALTER TABLE "average_draft_positions" ADD CONSTRAINT "average_draft_positions_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
