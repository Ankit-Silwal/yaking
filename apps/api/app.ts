import express from "express";
import cors from "cors"
import { setUpRoutes } from "./routes.js";
import passport from "passport";
import {redis} from "./src/configs/redis.js"
const app=express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(passport.initialize())
redis;
setUpRoutes(app);


export default app;