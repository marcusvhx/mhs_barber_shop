import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prismaClient } from "../db/prismaClient";
export class Auth {
  async login(req: Request, res: Response) {
    const { phoneNumber, password } = await req.body;

    // verifica se o usuario esta registrado
    const user = await prismaClient.users.findFirst({ where: { phoneNumber } });

    if (!user) return res.status(404).send("usuario não encontrado");

    // verifica se a senha esta correta
    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) return res.status(409).send("senha negada");

    // faz o token
    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "60d",
    });

    const logData = user.id;

    // envia os dados de login
    res.status(200).json({ userId: logData, token: token });
  }
}
