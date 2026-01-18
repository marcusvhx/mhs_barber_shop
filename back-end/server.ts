import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
// import { google } from "googleapis";
import { Credentials, OAuth2Client } from "google-auth-library";
import { ReqVerifier } from "./src/ReqVerifier";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const oauth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URIS,
);

app.get("/login", (_, res: Response) => {
  const url = oauth2Client.generateAuthUrl({
    // gerar a URL do login com google
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar"], // escopo de acesso ao calendário
    prompt: "consent",
  });

  res.redirect(url); // redirecionar o usuário para a pagina de selecionar a conta
});

app.get("/oauth/callback", async (req: Request, res: Response) => {
  const code = req.query.code; // código pra pega os tokens

  if (!code) res.status(400).send("no code provided"); // se não tiver código, retorna erro

  try {
    //@ts-ignore
    const { tokens } = await oauth2Client.getToken(code); // lista de tokens

    if (!tokens) res.status(500).send("no tokens received");

    oauth2Client.setCredentials(tokens);

    res.json(tokens); // redirecionamento para pagina de agendamento
  } catch (err) {
    res.status(500).send("error retrieving access token");
  }
});

app.get("/booking", async (req: Request, res: Response) => {
  const {
    startISODateTime, // data em ISO-UTC;
    durationInMinutes, // duração em minutos (int)
  }: { startISODateTime: string; durationInMinutes: number } = await req.body;
  // const startDateTime = new Date(startISODateTime);
  const endDateTime = new Date(startISODateTime);
  endDateTime.setMinutes(endDateTime.getMinutes() + durationInMinutes);

  try {
    const event = {
      summary: "MHS Barber Shop",
      description: "Reserva na MHS Barber Shop",
      start: {
        dateTime: startISODateTime,
      },
      end: {
        dateTime: endDateTime.toISOString(),
      },
      attendees: [],
    };
    const calendarURL =
      "https://www.googleapis.com" +
      "/calendar" +
      "/v3" +
      "/calendars" +
      "/primary" +
      "/events" +
      "?sendUpdates=all";

    fetch(calendarURL, {
      method: "POST",
      body: JSON.stringify(event),
      headers: {
        authorization: `Bearer ${oauth2Client.credentials.access_token}`,
        "Content-Type": "application/json",
      },
    })
      .then((data) => res.json({message:"evento criado"}))
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar evento" });
  }
});

app.listen(PORT, () => console.log(" running at port " + PORT));
