/*
  Warnings:

  - A unique constraint covering the columns `[playerId,date]` on the table `average_draft_positions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "average_draft_positions_playerId_key";

-- CreateTable
CREATE TABLE "leagues" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "sleeperId" TEXT NOT NULL,
    "previousLeagueSleeperId" TEXT,
    "status" TEXT NOT NULL,
    "teams" INTEGER NOT NULL,
    "maxKeepers" INTEGER NOT NULL,
    "seasonType" TEXT NOT NULL,
    "season" TEXT NOT NULL,

    CONSTRAINT "leagues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "league_scoring_settings" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fumble" DOUBLE PRECISION NOT NULL,
    "fumbleLost" DOUBLE PRECISION NOT NULL,
    "interceptionThrown" DOUBLE PRECISION NOT NULL,
    "reception" DOUBLE PRECISION NOT NULL,
    "leagueId" TEXT NOT NULL,

    CONSTRAINT "league_scoring_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dropped_passes" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "playerId" TEXT NOT NULL,
    "week" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "droppedPasses" INTEGER NOT NULL,

    CONSTRAINT "dropped_passes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "leagues_sleeperId_key" ON "leagues"("sleeperId");

-- CreateIndex
CREATE UNIQUE INDEX "league_scoring_settings_leagueId_key" ON "league_scoring_settings"("leagueId");

-- CreateIndex
CREATE UNIQUE INDEX "dropped_passes_playerId_week_year_key" ON "dropped_passes"("playerId", "week", "year");

-- CreateIndex
CREATE UNIQUE INDEX "average_draft_positions_playerId_date_key" ON "average_draft_positions"("playerId", "date");

-- AddForeignKey
ALTER TABLE "league_scoring_settings" ADD CONSTRAINT "league_scoring_settings_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "leagues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dropped_passes" ADD CONSTRAINT "dropped_passes_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
