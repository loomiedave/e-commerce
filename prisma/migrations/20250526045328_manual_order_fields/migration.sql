/*
  Warnings:

  - You are about to drop the column `pricePaid` on the `Order` table. All the data in the column will be lost.
  - Added the required column `measurements` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "pricePaid",
ADD COLUMN     "measurements" TEXT NOT NULL,
ADD COLUMN     "message" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL;
