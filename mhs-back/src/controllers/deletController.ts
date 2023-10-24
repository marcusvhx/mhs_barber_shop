import { prismaClient } from "../db/prismaClient";
import { Request, Response } from "express";
export class Delete {
  async reserv(req: Request, res: Response) {
    const { id } = await req.params;

    const idNumber = Number(id);
    prismaClient.reservs
      .deleteMany({
        where: {
          id: idNumber,
        },
      })
      .then(async () => {
        res.send("deleted");
      })
      .catch((err) => {
        console.log(err);
        res.send("erro");
      });
  }

  async allReserv(req: Request, res: Response) {
    prismaClient.reservs
      .deleteMany()
      .then(async (resp) => {
        res.send(resp);
      })
      .catch((err) => {
        console.log(err);
        res.send("erro");
      });
  }

  async allUsers(req: Request, res: Response) {
    prismaClient.users
      .deleteMany()
      .then(async (resp) => {
        res.send(resp);
      })
      .catch((err) => {
        console.log(err);
        res.send("erro");
      });
  }
}
