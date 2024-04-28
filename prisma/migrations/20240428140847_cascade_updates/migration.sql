-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Notification" ("createdAt", "id", "message", "read", "userId") SELECT "createdAt", "id", "message", "read", "userId" FROM "Notification";
DROP TABLE "Notification";
ALTER TABLE "new_Notification" RENAME TO "Notification";
CREATE TABLE "new_like" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "blogId" INTEGER NOT NULL,
    CONSTRAINT "like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "like_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_like" ("blogId", "id", "userId") SELECT "blogId", "id", "userId" FROM "like";
DROP TABLE "like";
ALTER TABLE "new_like" RENAME TO "like";
CREATE TABLE "new_Blog_Content" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "blogId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "offset" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "imageRef" TEXT,
    "content" TEXT NOT NULL,
    CONSTRAINT "Blog_Content_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Blog_Content" ("blogId", "content", "id", "imageRef", "imageUrl", "offset", "title") SELECT "blogId", "content", "id", "imageRef", "imageUrl", "offset", "title" FROM "Blog_Content";
DROP TABLE "Blog_Content";
ALTER TABLE "new_Blog_Content" RENAME TO "Blog_Content";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
