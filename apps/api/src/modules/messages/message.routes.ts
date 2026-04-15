import { Router } from "express";
import { upload } from "../../configs/multer.js";
import { uploadFile } from "./upload.controller.js";
import { messageService } from "./messages.controller.js";
const router = Router();

router.post("/upload",upload.single("file"),uploadFile);
router.get("/messages", messageService.getMessages);
export default router;