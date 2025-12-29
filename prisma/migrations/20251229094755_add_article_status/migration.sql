-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "status" "ArticleStatus" NOT NULL DEFAULT 'DRAFT';
