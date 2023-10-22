import { prismaClient } from "../db/prismaClient";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export class Edit {
  async turnDone(req: Request, res: Response) {
    const { id } = await req.params;
    const NumberId = Number(id);

    prismaClient.reservs
      .update({
        where: { id: NumberId },
        data: { status: "concluido" },
      })
      .then((resp) => {
        res.status(200).json(resp);
      })
      .catch((err) => console.log(err));
  }

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

  async editUser(req: Request, res: Response) {
    const { id } = await req.params;
    const { newName, currentPassword, newPhoneNumber, newPassword } =
      await req.body;

    const user = await prismaClient.users.findFirst({ where: { id } });

    const passwordVerifier = await bcrypt.compare(
      currentPassword,
      user.password
    );
    const phoneNumberVerifier = await prismaClient.users.findFirst({
      where: { phoneNumber: newPhoneNumber },
    });

    const verifiers = [];
    console.log(phoneNumberVerifier);

    //   prismaClient.users
    //     .update({
    //       where: { id },
    //       data: {
    //         name: newName,
    //         password: newPassword,
    //         phoneNumber: newPhoneNumber,
    //       },
    //     })
    //     .then((resp) => {
    //       res.status(200).json(resp);
    //     })
    //     .catch((err) => console.log(err));
  }
}
