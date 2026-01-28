import { Request, Response } from "express";
import { GoogelOAuth } from "./google.oauth";
import { decode } from "jsonwebtoken";
import AuthRepository from "./auth.repository";

export default class AuthServices {

  async signInWithGoogle(req: Request, res: Response) {
    const code = req.query.code as string;

    if (!code || Array.isArray(code))
      throw new Error("Invalid or missing code parameter");

    try {
      const googleTokens = await new GoogelOAuth().getGoogleTokens(code);
      const { email } = decode(googleTokens.id_token!) as { email: string };
      const result = await new AuthRepository().postNewAccount({
          email,
          access_token: googleTokens.access_token!,
          refresh_token: googleTokens.refresh_token!,
          expires_at: new Date(googleTokens.expiry_date!),
        });

        res.status(200).json({ message: result });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to sign in with Google\n" + err });
    }
  }

}
