import { Request, Response } from "express";
import { GoogelOAuth } from "./google.oauth";
import { decode } from "jsonwebtoken";
import AuthRepository from "./auth.repository";

export default class AuthServices {
  async signInWithGoogle(req: Request, res: Response) {
    const code = req.query.code as string;

    try {
      if (!code || Array.isArray(code))
        throw new Error("Invalid or missing code parameter");

      const googleTokens = await new GoogelOAuth().getGoogleTokens(code);
      const { email } = decode(googleTokens.id_token!) as { email: string };
      const newAccount = await new AuthRepository().createNewAccount({
        email,
        access_token: googleTokens.access_token!,
        refresh_token: googleTokens.refresh_token!,
        expires_at: new Date(googleTokens.expiry_date!),
      });

      res.json({ message: "Conta criada com sucesso", data: newAccount });
    } catch (err) {
      console.error("error in signInWithGoogle (AuthServices):\n" + err);
      res.status(500).json({ error: "Erro ao tentar fazer login com Google" });
    }
  }
}
