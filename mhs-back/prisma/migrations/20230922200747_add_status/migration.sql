/*
  Warnings:

  - You are about to alter the column `dateTime` on the `reservs` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `status` to the `reservs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservs` ADD COLUMN `status` VARCHAR(191) NOT NULL,
    MODIFY `dateTime` DATETIME NOT NULL;
