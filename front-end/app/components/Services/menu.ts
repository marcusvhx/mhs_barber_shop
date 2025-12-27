import Hair from "@/public/png/services/service-hair.png";
import Beard from "@/public/png/services/service-beard.png";

const services = [
    {
      service: "cabelo",
      image: Hair,
      menu: [
        { name: "raspagem", price: 15 },
        { name: "aparo", price: 20 },
        { name: "corte", price: 25 },
        { name: "lavagem", price: 30 },
        { name: "hidratação", price: 30 },
        { name: "coloração", price: 40 },
      ],
    },
    {
      service: "barba",
      image: Beard,
      menu: [
        { name: "raspagem", price: 15 },
        { name: "aparo", price: 20 },
        { name: "corte", price: 25 },
        { name: "hidratação", price: 30 },
        { name: "barboterapia", price: 40 },
        { name: "coloração", price: 40 },
      ],
    },
  ];

  export {services};