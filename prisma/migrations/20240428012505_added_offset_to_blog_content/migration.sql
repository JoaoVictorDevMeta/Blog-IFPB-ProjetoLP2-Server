/*
  Warnings:

  - Added the required column `offset` to the `Blog_Content` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Blog_Content" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "blogId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "offset" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "imageRef" TEXT,
    "content" TEXT NOT NULL,
    CONSTRAINT "Blog_Content_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Blog_Content" ("blogId", "content", "id", "imageRef", "imageUrl", "title") SELECT "blogId", "content", "id", "imageRef", "imageUrl", "title" FROM "Blog_Content";
DROP TABLE "Blog_Content";
ALTER TABLE "new_Blog_Content" RENAME TO "Blog_Content";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
