-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "content" DROP NOT NULL;

-- CreateTable
CREATE TABLE "PostLocations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "imageURL" TEXT,

    CONSTRAINT "PostLocations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostLocations" ADD CONSTRAINT "PostLocations_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
