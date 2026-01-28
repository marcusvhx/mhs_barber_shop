import cors from "cors";
import express, { Request, Response, Router } from "express";
import InitDB from "./shared/db/init";
import { authRoutes } from "./modules/auth/auth.controller";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);


new InitDB().init();

export { app };
