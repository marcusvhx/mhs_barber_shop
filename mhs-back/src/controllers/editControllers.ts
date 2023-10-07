import { prismaClient } from "../db/prismaClient";
import { Request, Response } from "express";
import { setReservStatus } from "./getControllers";
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
        const editedReserv = {
          ...resp,
          status: setReservStatus(resp.dateTime),
        };
        res.status(200).json(editedReserv);
      })
      .catch((err) => console.log(err));
  }
}
