import dotenv from "dotenv";
import { initializeApp } from "./app";
dotenv.config();

const PORT = 3000;

(async () => {
  const app = await initializeApp();
  app.listen(PORT, () => console.log("running at port " + PORT));
})();
