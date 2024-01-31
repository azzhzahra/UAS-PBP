-- CreateTable
CREATE TABLE `tbl_matakuliah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode` VARCHAR(100) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `sks` INTEGER NOT NULL,
    `semester` INTEGER NOT NULL,
    `dosen` VARCHAR(100) NOT NULL,
    `ruangan` VARCHAR(100) NOT NULL,
    `mahasiswa_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_matakuliah` ADD CONSTRAINT `tbl_matakuliah_mahasiswa_id_fkey` FOREIGN KEY (`mahasiswa_id`) REFERENCES `mst_mahasiswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
