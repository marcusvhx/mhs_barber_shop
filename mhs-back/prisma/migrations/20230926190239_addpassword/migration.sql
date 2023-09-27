/*
  Warnings:

  - You are about to alter the column `dateTime` on the `reservs` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[phoneNumber]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservs` MODIFY `dateTime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_phoneNumber_key` ON `users`(`phoneNumber`);
