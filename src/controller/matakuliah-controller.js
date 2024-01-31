import matkulService from "../service/matakuliah-service.js";

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const mahasiswaId = req.params.mahasiswaId;

        const result = await matkulService.create(user, mahasiswaId, request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user;
        const mahasiswaId = req.params.mahasiswaId;
        const matkulId = req.params.matkulId;

        const result = await matkulService.get(user, mahasiswaId, matkulId);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const mahasiswaId = req.params.mahasiswaId;
        const matkulId = req.params.matkulId;
        const request = req.body;
        request.id = matkulId;

        const result = await matkulService.update(user, mahasiswaId, request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const mahasiswaId = req.params.mahasiswaId;
        const matkulId = req.params.matkulId;

        const result = await matkulService.remove(user, mahasiswaId, matkulId);

        res.status(200).json({
            data: "OK"
        });
    } catch (e) {
        next(e);
    }
}

const list = async (req, res, next) => {
    try {
        const user = req.user;
        const mahasiswaId = req.params.mahasiswaId;

        const result = await matkulService.list(user, mahasiswaId);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    get,
    update,
    remove,
    list
}
