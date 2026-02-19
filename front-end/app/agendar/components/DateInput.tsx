"use client";
import TextInput from "./TextInput";
import CalendarIcon from "@/public/svg/calendar-icon.svg";
import Image from "next/image";
import Calendar from "./Calendar";
import { MouseEvent, useRef, useState } from "react";

export default function DateInput({ placeholder }: { placeholder: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const dateInput = useRef<HTMLDivElement | null>(null);
  const textField = useRef<HTMLInputElement | null>(null);

  const modalToggle = (e: MouseEvent<HTMLDivElement>) => {
    //@ts-ignore
    const classname = e.target.className;
    if (typeof classname === "string" && classname.includes("toggle"))
      setIsModalOpen((old) => !old);
  };
  
  return (
    <>
      <div
        ref={dateInput}
        onClick={modalToggle}
        className="relative w-full h-fit"
      >
        <div className="toggle absolute top-0 left-0 size-full z-2" />
        <TextInput ref={textField} placeholder={placeholder} />
        <Image
          src={CalendarIcon}
          alt=""
          className="size-6 absolute top-1/2 -translate-y-1/2 right-2.5 z-1"
        />
      </div>
      <Calendar toggleModal={modalToggle} isModalOpen={isModalOpen} />
    </>
  );
}
