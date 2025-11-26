import { Router } from "express";
import * as storageController from "../controllers/storageController.js";

const router = Router();

router.get("/ping", storageController.pingStorage);

export default router;
