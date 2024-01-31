import {prismaClient} from "../application/database.js";
import {validate} from "../validation/validation.js";
import {getMahasiswaValidation} from "../validation/mahasiswa-validation.js";
import {ResponseError} from "../error/response-error.js";
import {
    createMatkulValidation,
    getMatkulValidation,
    updateMatkulValidation
} from "../validation/matakuliah-validation.js";

const checkMahasiswaMustExists = async (user, mahasiswaId) => {
    mahasiswaId = validate(getMahasiswaValidation, mahasiswaId);

    const totalMahasiswaInDatabase = await prismaClient.mahasiswa.count({
        where: {
            username: user.username,
            id: mahasiswaId
        }
    });

    if (totalMahasiswaInDatabase !== 1) {
        throw new ResponseError(404, "mahasiswa is not found");
    }

    return mahasiswaId;
}

const create = async (user, mahasiswaId, request) => {
    mahasiswaId = await checkMahasiswaMustExists(user, mahasiswaId);

    const mataKuliah = validate(createMatkulValidation, request);
    mataKuliah.mahasiswa = {
        connect: {
            id: mahasiswaId
        }
    };

    return prismaClient.mataKuliah.create({
        data: mataKuliah,
        select: {
            id: true,
            kode: true,
            nama: true,
            sks: true,
            semester: true,
            dosen: true,
            ruangan: true
        }
    })
}

const get = async (user, mahasiswaId, matkulId) => {
    mahasiswaId = await checkMahasiswaMustExists(user, mahasiswaId);
    matkulId = validate(getMatkulValidation, matkulId);

    const matkul = await prismaClient.mataKuliah.findFirst({
        where: {
            mahasiswaId: mahasiswaId,
            id: matkulId
        },
        select: {
            id: true,
            kode: true,
            nama: true,
            sks: true,
            semester: true,
            dosen: true,
            ruangan: true
        }
    });

    if (!matkul) {
        throw new ResponseError(404, "matkul is not found");
    }

    return matkul;
}

const update = async (user, mahasiswaId, request) => {
    mahasiswaId = await checkMahasiswaMustExists(user, mahasiswaId);
    const mataKuliah = validate(updateMatkulValidation, request);

    const totalMatkulInDatabase = await prismaClient.mataKuliah.count({
        where: {
            mahasiswaId: mahasiswaId,
            id: mataKuliah.id
        }
    });

    if (totalMatkulInDatabase !== 1) {
        throw new ResponseError(404, "matkul is not found");
    }

    return prismaClient.mataKuliah.update({
        where: {
            id: mataKuliah.id
        },
        data: {
            kode: mataKuliah.kode,
            nama: mataKuliah.nama,
            sks: mataKuliah.sks,
            semester: mataKuliah.semester,
            dosen: mataKuliah.dosen,
            ruangan: mataKuliah.ruangan,
        },
        select: {
            id: true,
            kode: true,
            nama: true,
            sks: true,
            semester: true,
            dosen: true,
            ruangan: true
        }
    })
}

const remove = async (user, mahasiswaId, matkulId) => {
    mahasiswaId = await checkMahasiswaMustExists(user, mahasiswaId);
    matkulId = validate(getMatkulValidation, matkulId);

    const totalMatkulInDatabase = await prismaClient.mataKuliah.count({
        where: {
            mahasiswaId: mahasiswaId,
            id: matkulId
        }
    });

    if (totalMatkulInDatabase !== 1) {
        throw new ResponseError(404, "matkul is not found");
    }

    return prismaClient.mataKuliah.delete({
        where: {
            id: matkulId
        }
    });
}

const list = async (user, mahasiswaId) => {
    mahasiswaId = await checkMahasiswaMustExists(user, mahasiswaId);

    return prismaClient.mataKuliah.findMany({
        where: {
            mahasiswaId: mahasiswaId,
        },
        select: {
            id: true,
            kode: true,
            nama: true,
            sks: true,
            semester: true,
            dosen: true,
            ruangan: true
        }
    })
}

export default {
    create,
    get,
    update,
    remove,
    list
}
