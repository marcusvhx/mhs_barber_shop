"use client";
import TextInput from "./TextInput";
import CalendarIcon from "@/public/svg/calendar-icon.svg";
import Image from "next/image";
import Calendar from "../Calendar";
import { MouseEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IAppointmentData } from "../../types";

export default function DateInput({ placeholder }: { placeholder: string }) {
  const { register, setValue } = useFormContext<IAppointmentData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  const modalToggle = (e: MouseEvent<HTMLDivElement>) => {
    //@ts-ignore
    const classname = e.target.className;
    if (typeof classname === "string" && classname.includes("toggle"))
      setIsModalOpen((old) => !old);
  };
  const getDate = (date: Date | undefined) => {
    if (date) {
      setValue("date", date.toLocaleDateString());
      setDate(date);
    } else console.log("data não selecionada");
  };

  useEffect(() => {
    setIsModalOpen(false);
  }, [date]);

  return (
    <>
      <div
        onClick={modalToggle}
        className="relative w-full h-fit cursor-pointer"
      >
        {/* camada de interação */}
        <div className="toggle absolute top-0 left-0 size-full z-2" />

        {/* input de data */}
        <TextInput name="date" placeholder={placeholder} />

        {/* icon de calendário */}
        <Image
          src={CalendarIcon}
          alt=""
          className="size-6 absolute top-1/2 -translate-y-1/2 right-2.5 z-1"
        />
      </div>

      {/* modal do calendário */}
      <Calendar
        selectedDate={date}
        getDate={getDate}
        unavailableDays={[]}
        toggleModal={modalToggle}
        isModalOpen={isModalOpen}
      />
    </>
  );
}
