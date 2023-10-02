import { prismaClient } from "../db/prismaClient";
import { Request, Response } from "express";
export class Edit {
  async editReserv(req: Request, res: Response) {
    const { id } = await req.params;
    const { dateTime, service } = await req.body;
    const NumberId = Number(id);

    prismaClient.reservs
      .update({
        where: { id: NumberId },
        data: { dateTime, service },
      })
      .then((resp) => {
        res.status(200).json(resp);
      })
      .catch((err) => console.log(err));
  }
}
