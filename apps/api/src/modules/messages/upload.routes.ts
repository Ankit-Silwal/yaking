import { Router } from "express";
import { upload } from "../../configs/multer.js";
import { uploadFile } from "./upload.controller.js";

const router = Router();

router.post("/upload",upload.single("file"),uploadFile);

export default router;