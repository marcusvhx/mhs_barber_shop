import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

export class GoogelOAuth {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI,
    );

    this.redirectToLoginWithGoogle =
      this.redirectToLoginWithGoogle.bind(this);
  }

  public redirectToLoginWithGoogle(req: Request, res: Response) {
    // gerar a URL do login com google
    const url = this.oauth2Client.generateAuthUrl({
      access_type: "offline", // para pegar refresh token
      prompt:"consent",
      scope: [
        // escopos que quero acessar
        "openid", // info básico do usuário
        "email",
        "profile",
        "https://www.googleapis.com/auth/calendar",
      ],
    });

    res.redirect(url); // redireciona o usuário para a pagina de seleção da conta
  }

  public async getGoogleTokens(code: string) {
    if (!code) throw new Error("no code provided");
    try {
      const { tokens } = await this.oauth2Client.getToken(code); // lista de tokens

      if (!tokens) throw new Error("no tokens received");

      return tokens; // redirecionamento para pagina de agendamento
    } catch (err) {
      throw new Error("error retrieving access token\n" + err);
    }
  }
}
