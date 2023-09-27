import Image from "next/image";

import { ReservProps } from "../MakeReserv";
import { ChangeEvent } from "react";

import hair from "@/public/imgs/cabelo.png";
import beard from "@/public/imgs/barba.png";
import both from "@/public/imgs/ambos.png";

export default function ServicesInp({
  getReservData,
  reservData,
}: {
  reservData: ReservProps;
  getReservData: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const servicesList = [
    { name: "cabelo", img: hair, size: "" },
    { name: "barba", img: beard, size: "h-[80px] w-full self-end" },
    { name: "ambos", img: both, size: "h-[115px] w-[85px]" },
  ];
  return (
    <div className="formContainer" id="service">
    <h1 className="capitalize text-center font-bold text-2xl ">serviços</h1>
      <div className="flex flex-wrap gap-2 px-2 justify-center">
        {servicesList.map((i) => (
          <div key={`service_${i.name}`} className="flex">
            <input
              onChange={getReservData}
              value={i.name}
              className="hidden"
              type="radio"
              name="service"
              id={i.name}
            />

            <label
              htmlFor={i.name}
              className={`${
                reservData.service === i.name ? "bg-neutral-100" : "opacity-60"
              } w-32 h-40 rounded border-2 border-neutral-500 transition cursor-pointer capitalize grid items-center`}
            >
              <div className="p-2 h-[131px] grid place-items-center">
                <Image src={i.img} alt="i.name" className={i.size} />
              </div>
              <p className="self-end justify-self-center">{i.name}</p>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
