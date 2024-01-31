import Joi from "joi";

const createMahasiswaValidation = Joi.object({
    nim: Joi.string().max(100).required(),
    email: Joi.string().max(200).email().optional(),
    ttl: Joi.string().max(100).required(),
    tahun_masuk: Joi.number().min(4).required(),
    jenis_kelamin: Joi.string().max(20).required()
});

const getMahasiswaValidation = Joi.number().positive().required();

const updateMahasiswaValidation = Joi.object({
    id: Joi.number().positive().required(),
    nim: Joi.string().max(100).required(),
    email: Joi.string().max(200).email().optional(),
    ttl: Joi.string().max(100).required(),
    tahun_masuk: Joi.number().min(4).required(),
    jenis_kelamin: Joi.string().max(20).required()
});

const searchMahasiswaValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.string().optional()
})

export {
    createMahasiswaValidation,
    getMahasiswaValidation,
    updateMahasiswaValidation,
    searchMahasiswaValidation
}
