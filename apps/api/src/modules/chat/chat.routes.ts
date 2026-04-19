import { Router } from "express";
import { createChat, getChats } from "./chat.controller.js";
import { addMember } from "./chat.controller.js";
import { removeMember } from "./chat.controller.js";
import { leaveChat } from "./chat.controller.js";

const router=Router()

router.get("/", getChats);
router.post("/", createChat);
router.post("/:chatId/members", addMember);
router.delete("/:chatId/members", removeMember);
router.post("/:chatId/leave", leaveChat);

export default router;