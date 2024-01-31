import express from "express";
import userController from "../controller/user-controller.js";
import mahasiswaController from "../controller/mahasiswa-controller.js";
import matkulController from "../controller/matakuliah-controller.js";
import {authMiddleware} from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// User API
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// Mahasiswa API
userRouter.post('/api/mahasiswa', mahasiswaController.create);
userRouter.get('/api/mahasiswa/:mahasiswaId', mahasiswaController.get);
userRouter.put('/api/mahasiswa/:mahasiswaId', mahasiswaController.update);
userRouter.delete('/api/mahasiswa/:mahasiswaId', mahasiswaController.remove);
userRouter.get('/api/mahasiswa', mahasiswaController.search);

// Matkul API
userRouter.post('/api/mahasiswa/:mahasiswaId/matkul', matkulController.create);
userRouter.get('/api/mahasiswa/:mahasiswaId/matkul/:matkulId', matkulController.get);
userRouter.put('/api/mahasiswa/:mahasiswaId/matkul/:matkulId', matkulController.update);
userRouter.delete('/api/mahasiswa/:mahasiswaId/matkul/:matkulId', matkulController.remove);
userRouter.get('/api/mahasiswa/:mahasiswaId/matkul', matkulController.list);

export {
    userRouter
}
