import { Router } from "express";
import { createChat } from "./chat.controller.js";
import { addMember } from "./chat.controller.js";
import { removeMember } from "./chat.controller.js";
import { leaveChat } from "./chat.controller.js";

const router=Router()

router.post("/", createChat);
router.post("/:chatId/members", addMember);
router.delete("/:chatId/members", removeMember);
router.post("/:chatId/leave", leaveChat);

export default router;