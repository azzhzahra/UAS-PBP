-- CreateTable
CREATE TABLE `mst_mahasiswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nim` VARCHAR(100) NOT NULL,
    `email` VARCHAR(200) NULL,
    `ttl` VARCHAR(100) NOT NULL,
    `tahun_masuk` INTEGER NOT NULL,
    `jenis_kelamin` VARCHAR(100) NOT NULL,
    `user_username` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `mst_mahasiswa_user_username_key`(`user_username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mst_mahasiswa` ADD CONSTRAINT `mst_mahasiswa_user_username_fkey` FOREIGN KEY (`user_username`) REFERENCES `mst_user`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
