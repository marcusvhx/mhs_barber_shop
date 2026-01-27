import { Router } from "express";
import AuthServices from "./auth.services";
import { GoogelOAuth } from "./google.oauth";

const authRoutes = Router()
const googleOAuth = new GoogelOAuth();
const authServices = new AuthServices();

authRoutes.get("/login",googleOAuth.redirectToLoginWithGoogle);

authRoutes.get("/oauth/callback", authServices.signInWithGoogle);


export { authRoutes };