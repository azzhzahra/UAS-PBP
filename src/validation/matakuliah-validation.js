import Joi from "joi";

const createMatkulValidation = Joi.object({
    kode: Joi.string().max(255).optional(),
    nama: Joi.string().max(100).optional(),
    sks: Joi.number().min(1).required(),
    semester: Joi.number().min(1).required(),
    dosen: Joi.string().max(100).optional(),
    ruangan: Joi.string().max(100).optional()
});

const updateMatkulValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
    kode: Joi.string().max(255).optional(),
    nama: Joi.string().max(100).optional(),
    sks: Joi.number().min(1).required(),
    semester: Joi.number().min(1).required(),
    dosen: Joi.string().max(100).optional(),
    ruangan: Joi.string().max(100).optional()
});

const getMatkulValidation = Joi.number().min(1).positive().required();

export {
    createMatkulValidation,
    getMatkulValidation,
    updateMatkulValidation
}
