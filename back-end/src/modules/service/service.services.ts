import { IService } from "./service.types";

export default class ServiceServices {
  services: IService[];

  constructor() {
    this.services = [
      {
        id: 0,
        type: "cabelo",
        name: "Corte na máquina",
        price: 20,
        sessions: 1,
      },
      {
        id: 1,
        type: "cabelo",
        name: "Corte na navalha",
        price: 25,
        sessions: 1,
      },
      {
        id: 2,
        type: "cabelo",
        name: "Corte na tesoura",
        price: 30,
        sessions: 1,
      },
      {
        id: 3,
        type: "barba",
        name: "Corte na máquina",
        price: 20,
        sessions: 1,
      },
      {
        id: 4,
        type: "barba",
        name: "Corte na navalha",
        price: 25,
        sessions: 1,
      },
      {
        id: 5,
        type: "barba",
        name: "Corte na tesoura",
        price: 30,
        sessions: 1,
      },
      {
        id: 6,
        type: "infantil",
        name: "Corte na máquina",
        price: 15,
        sessions: 1,
      },
      {
        id: 8,
        type: "infantil",
        name: "Corte na tesoura",
        price: 20,
        sessions: 1,
      },
    ];
  }

  getAllServices() {
    return this.services;
  }

}
