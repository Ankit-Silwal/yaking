import type { Application } from "express";
import chatRouter from "./src/modules/chat/chat.routes.js";
import authRouter from "./src/modules/auth/auth.routes.js";
import { requireAuth } from "./src/middleware/auth.middleware.js";


export function setUpRoutes(app:Application){
  app.use("/auth",authRouter);
  app.use("/chat",requireAuth,chatRouter);
}