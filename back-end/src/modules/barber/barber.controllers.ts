import { Router } from "express";
import BarberService from "./barber.services";

const barberRoutes = Router();
const barberService = new BarberService();

barberRoutes.post("/create", barberService.create);

barberRoutes.get("/get-all", barberService.getAll);
barberRoutes.get("/unavailable-days/:barberId", barberService.getUnavailableDays);

barberRoutes.put("/unavailable-days", barberService.setUnavailableDays);

export default barberRoutes;
