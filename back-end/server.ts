import express, { Request, Response, Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import InitDB from "./src/shared/db/init";
import { authRoutes } from "./src/modules/auth/auth.controller";
dotenv.config();

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(authRoutes);
app.use(cors());

new InitDB().init();

/*app.get("/booking", async (req: Request, res: Response) => {
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
      attendees: ["marcusvyinicius@gmail.com"],
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
      .then((data) => res.json({ message: "evento criado" }))
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar evento" });
  }
});*/

app.listen(PORT, () => console.log(" running at port " + PORT));
