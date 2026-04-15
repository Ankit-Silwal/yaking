import { Router } from "express";
import { upload } from "../../configs/multer.js";
import { uploadFile } from "./upload.controller.js";
import { getMessages, getUnreadCounts } from "./message.controller.js";

const router = Router();

router.post("/upload", upload.single("file"), uploadFile);

router.get("/:chatId/messages", getMessages);
router.get("/unread-counts", getUnreadCounts);

export default router;