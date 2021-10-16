-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "id_user" TEXT,
    CONSTRAINT "Post_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
