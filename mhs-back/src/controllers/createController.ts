import { prismaClient } from "../db/prismaClient";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class Create {
  //
  async reserv(req: Request, res: Response) {
    const { service, dateTime, status } = await req.body;
    const { userId } = await req.params;

    const timeVerifier = await prismaClient.reservs.findMany({
      where: { dateTime },
    });
    if (timeVerifier.length === 0) {
      prismaClient.reservs
        .create({
          data: { dateTime, service, userId, status },
        })
        .then(async (resp) => {
          res.send(resp);
        })
        .catch((err) => {
          console.log(err);
          res.send("erro");
        });
    } else {
      res.status(400).send("esta vaga ja está ocupada");
    }
  }

  async user(req: Request, res: Response) {
    const { name, phoneNumber, password } = await req.body;

    const usersWithSameNumber = await prismaClient.users.findFirst({
      where: { phoneNumber },
    });

    if (usersWithSameNumber)
      return res.status(409).send("numero de telefone já registrado");

    const cryptPass = await bcrypt.hash(password, 8);
    prismaClient.users
      .create({
        data: { name, phoneNumber, password: cryptPass, role: "user" },
      })
      .then(async (resp) => {
        const token = jwt.sign({ id: resp.id }, process.env.SECRET, {
          expiresIn: "60d",
        });
        res.send({ userId: resp.id, token: token });
      })
      .catch((err) => console.log(err));
  }
}
