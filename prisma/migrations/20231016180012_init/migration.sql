/*
  Warnings:

  - Made the column `end_time` on table `Service` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start_time` on table `Service` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `Service` required. This step will fail if there are existing NULL values in that column.
  - Made the column `active_authority` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "start_time" DATETIME NOT NULL,
    "end_time" DATETIME NOT NULL,
    CONSTRAINT "Service_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Service" ("end_time", "id", "key", "start_time", "time", "user_id") SELECT "end_time", "id", "key", "start_time", "time", "user_id" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "active_authority" TEXT NOT NULL
);
INSERT INTO "new_User" ("active_authority", "id", "user_id") SELECT "active_authority", "id", "user_id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
