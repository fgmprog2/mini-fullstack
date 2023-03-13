import express from "express";
import { getUser, tambahUser, masuk, keluar } from "../controllers/controllerUser.js";
import { verifikasiToken } from "../middlewares/verifikasiToken.js";
import { refreshToken } from "../controllers/refreshToken.js";

const router = express.Router();

router.get("/daftar-user", verifikasiToken, getUser);
router.post("/daftar", tambahUser);
router.post("/masuk", masuk);
router.get("/token", refreshToken);
router.delete("/keluar", keluar);

export default router;