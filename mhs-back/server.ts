import express from "express";
import { router } from "./src/db/router";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors()  );
app.use(router);

app.listen(3020, () => console.log("=============== foi ==============="));
