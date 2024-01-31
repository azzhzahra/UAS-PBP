/*
  Warnings:

  - You are about to drop the column `user_username` on the `mst_mahasiswa` table. All the data in the column will be lost.
  - Added the required column `username` to the `mst_mahasiswa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `mst_mahasiswa` DROP FOREIGN KEY `mst_mahasiswa_user_username_fkey`;

-- AlterTable
ALTER TABLE `mst_mahasiswa` DROP COLUMN `user_username`,
    ADD COLUMN `username` VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE `mst_mahasiswa` ADD CONSTRAINT `mst_mahasiswa_username_fkey` FOREIGN KEY (`username`) REFERENCES `mst_user`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
