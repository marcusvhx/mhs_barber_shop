import { Request, Response } from "express";
import BarberRepository from "./barber.repository";
const barberRepo = new BarberRepository();

export default class BarberService {

    

  async getBarberById(req: Request, res: Response) {
    const id = req.query.id as string;
    console.log(id);
    try {
      if (!id) throw new Error("ID is missing");

      const barber = await barberRepo.getById(id);

      res.json(barber);
    } catch (err) {
      res.status(500).json({ error: "erro ao tentar encontra barbeiro" });
      console.error("error in getBarberById (BarberService):\n" + err);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, googleId, profession, unavailableDays } = req.body;
      const barber = await barberRepo.create(
        name,
        googleId,
        profession,
        unavailableDays,
      );
      res.status(201).json(barber);
    } catch (err) {
      res.status(500).json({ error: "Erro ao criar barbeiro" });
      console.error("error in create (BarberService):\n" + err);
    }
  }

  async getUnavailableDays(req: Request, res: Response) {
    const barberId = req.query.barberId as string;
    try {
      if (!barberId) throw new Error("ID is missing");
      const unavailableDays = await barberRepo.getUnavailableDays(barberId);
      res.json({ data: unavailableDays });
    } catch (err) {
      console.error("error in getUnavailableDays (BarberService):\n" + err);
      res
        .status(500)
        .json({ error: "erro ao tentar encontra dias indisponíveis" });
    }
  }

  async setUnavailableDays(req: Request, res: Response) {
    const barberId = req.query.barberId as string;
    const days: Date[] = req.body.days;

    try {
      if (!barberId) throw new Error("ID is missing");

      const updated = await barberRepo.setUnavailableDays(barberId, days);
      res
        .status(201)
        .json({ message: "Dias indisponíveis atualizados com sucesso", data: updated });
    } catch (err) {
      console.error("error in updateUnavailableDays (BarberService):\n" + err);
      res.status(500).json({ error: "Erro ao atualizar dias indisponíveis" });
    }
  }
}
