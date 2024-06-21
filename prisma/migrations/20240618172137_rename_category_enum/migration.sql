/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BlogToCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('Pesquisa', 'Projeto', 'Trabalho', 'Anuncio', 'Teste');

-- DropForeignKey
ALTER TABLE "_BlogToCategory" DROP CONSTRAINT "_BlogToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlogToCategory" DROP CONSTRAINT "_BlogToCategory_B_fkey";

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "categories" "PostCategory"[];

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "_BlogToCategory";
