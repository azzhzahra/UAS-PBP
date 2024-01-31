import {validate} from "../validation/validation.js";
import {
    createMahasiswaValidation,
    getMahasiswaValidation, searchMahasiswaValidation,
    updateMahasiswaValidation
} from "../validation/mahasiswa-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";

const create = async (user, request) => {
    const mahasiswa = validate(createMahasiswaValidation, request);
    mahasiswa.username = user.username;

    return prismaClient.mahasiswa.create({
        data: mahasiswa,
        select: {
            id: true,
            nim: true,
            email: true,
            ttl: true,
            tahun_masuk: true,
            jenis_kelamin: true
        }
    });
}

const get = async (user, mahasiswaId) => {
    mahasiswaId = validate(getMahasiswaValidation, mahasiswaId);

    const mahasiswa = await prismaClient.mahasiswa.findFirst({
        where: {
            username: user.username,
            id: mahasiswaId
        },
        select: {
            id: true,
            nim: true,
            email: true,
            ttl: true,
            tahun_masuk: true,
            jenis_kelamin: true
        }
    });

    if (!mahasiswa) {
        throw new ResponseError(404, "mahasiswa is not found");
    }

    return mahasiswa;
}

const update = async (user, request) => {
    const mahasiswa = validate(updateMahasiswaValidation, request);

    const totalMahasiswaInDatabase = await prismaClient.mahasiswa.count({
        where: {
            username: user.username,
            id: mahasiswa.id
        }
    });

    if (totalMahasiswaInDatabase !== 1) {
        throw new ResponseError(404, "Mahasiswa is not found");
    }

    return prismaClient.mahasiswa.update({
        where: {
            id: mahasiswa.id
        },
        data: {
            nim: mahasiswa.nim,
            email: mahasiswa.email,
            ttl: mahasiswa.ttl,
            tahun_masuk: mahasiswa.tahun_masuk,
            jenis_kelamin: mahasiswa.jenis_kelamin,
        },
        select: {
            id: true,
            nim: true,
            email: true,
            ttl: true,
            tahun_masuk: true,
            jenis_kelamin: true
        }
    })
}

const remove = async (user, mahasiswaId) => {
    mahasiswaId = validate(getMahasiswaValidation, mahasiswaId);

    const totalInDatabase = await prismaClient.mahasiswa.count({
        where: {
            username: user.username,
            id: mahasiswaId
        }
    });

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "Mahasiswa is not found");
    }

    return prismaClient.mahasiswa.delete({
        where: {
            id: mahasiswaId
        }
    });
}

const search = async (user, request) => {
    request = validate(searchMahasiswaValidation, request);

    // 1 ((page - 1) * size) = 0
    // 2 ((page - 1) * size) = 10
    const skip = (request.page - 1) * request.size;

    const filters = [];

    filters.push({
        username: user.username
    })

    if (request.name) {
        filters.push({
            OR: [
                {
                    first_name: {
                        contains: request.name
                    }
                },
                {
                    last_name: {
                        contains: request.name
                    }
                }
            ]
        });
    }
    if (request.email) {
        filters.push({
            email: {
                contains: request.email
            }
        });
    }
    if (request.phone) {
        filters.push({
            phone: {
                contains: request.phone
            }
        });
    }

    const mahasiswa = await prismaClient.mahasiswa.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip
    });

    const totalItems = await prismaClient.mahasiswa.count({
        where: {
            AND: filters
        }
    });

    return {
        data: mahasiswa,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}
