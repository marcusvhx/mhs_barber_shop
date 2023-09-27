-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `phoneNumber` VARCHAR(16) NOT NULL,

    UNIQUE INDEX `Users_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservs` (
    `id` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `service` VARCHAR(191) NOT NULL,
    `dateTime` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reservs` ADD CONSTRAINT `Reservs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
