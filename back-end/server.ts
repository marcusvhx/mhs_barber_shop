import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URIS
);

let authTokens;

app.get("/login", (_, res: Response) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar"],
    prompt: "consent",
  });

  res.redirect(url);
});

app.get("/oauth/callback", async (req: Request, res: Response) => {
  const code = req.query.code;

  if (!code) res.status(400).send("no code provided");

  try {
    //@ts-ignore
    const {tokens} = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    authTokens = tokens;
    res.redirect('/booking')
  } catch (err) {
    res.status(500).send("error retrieving access token");
  }
});

app.get("/booking", async (req: Request, res: Response) => {

try {
    oauth2Client.setCredentials(authTokens);

    const calendar = google.calendar({
      version: 'v3',
      auth: oauth2Client
    });

    const event = {
      summary: 'Reunião de Teste',
      description: 'Evento criado via API',
      start: {
        dateTime: '2026-01-20T14:00:00-03:00'
      },
      end: {
        dateTime: '2026-01-20T15:00:00-03:00'
      },
      attendees: [
        { email: 'marcusviniciusfdff@gmail.com' }
        // { email: 'marcusvyinicius@gmail.com' },
      ]
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      sendUpdates: 'all',
      requestBody: event
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar evento');
  }
    
})


app.listen(PORT, () => console.log(" running at port " + PORT));
