/*
  Warnings:

  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `event` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Student" ("course", "createdAt", "email", "id", "name", "studentId", "year") SELECT "course", "createdAt", "email", "id", "name", "studentId", "year" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
CREATE UNIQUE INDEX "Student_studentId_key" ON "Student"("studentId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
