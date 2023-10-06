/*
  Warnings:

  - You are about to alter the column `dateTime` on the `reservs` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `phoneNumber` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(16)` to `VarChar(13)`.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `reservs` DROP FOREIGN KEY `reservs_userId_fkey`;

-- AlterTable
ALTER TABLE `reservs` MODIFY `dateTime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` VARCHAR(191) NOT NULL,
    MODIFY `phoneNumber` VARCHAR(13) NOT NULL;

-- RenameIndex
ALTER TABLE `reservs` RENAME INDEX `reservs_userId_fkey` TO `reservs_userId_idx`;
