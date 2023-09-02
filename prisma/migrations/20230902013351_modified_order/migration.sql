/*
  Warnings:

  - You are about to drop the `ordered-books` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ordered-books" DROP CONSTRAINT "ordered-books_orderId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "orderedBooks" JSONB[];

-- DropTable
DROP TABLE "ordered-books";
