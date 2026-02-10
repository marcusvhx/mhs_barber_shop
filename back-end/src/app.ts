import cors from "cors";
import express, { Request, Response, Router } from "express";
import InitDB from "./shared/db/init";
import { authRoutes } from "./modules/auth/auth.controller";
import barberRoutes from "./modules/barber/barber.controllers";

export const initializeApp = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use("/auth", authRoutes);
  app.use("/barber", barberRoutes);

  await new InitDB().init();

  return app;
};
