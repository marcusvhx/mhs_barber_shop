"use client";
import TextInput from "./TextInput";
import CalendarIcon from "@/public/svg/calendar-icon.svg";
import Image from "next/image";
import Calendar from "../Calendar";
import { MouseEvent, useEffect, useRef, useState } from "react";
import HourPicker from "../HourPicker";

export default function DateInput({
  placeholder,
  getInputValue,
}: {
  placeholder: string;
  getInputValue: (name: string, value: string) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<Date>(new Date());

  const dateInput = useRef<HTMLDivElement | null>(null);
  const dateTextField = useRef<HTMLInputElement | null>(null);

  const modalToggle = (e: MouseEvent<HTMLDivElement>) => {
    //@ts-ignore
    const classname = e.target.className;
    if (typeof classname === "string" && classname.includes("toggle"))
      setIsModalOpen((old) => !old);
  };

  const formatDateTime = (date: Date | undefined, time: Date) => {
    if (!date) return "";
    const dateTime = new Date(date);
    dateTime.setHours(time.getHours(), time.getMinutes());
    getInputValue("date", dateTime.toISOString());
  };

  useEffect(() => {
    dateTextField.current!.value = date ? date.toLocaleDateString() : "";

    setIsModalOpen(false);
  }, [date]);

  return (
    <>
      <div
        ref={dateInput}
        onClick={modalToggle}
        className="relative w-full h-fit cursor-pointer"
      >
        <div className="toggle absolute top-0 left-0 size-full z-2" />
        <TextInput name="date" ref={dateTextField} placeholder={placeholder} />
        <Image
          src={CalendarIcon}
          alt=""
          className="size-6 absolute top-1/2 -translate-y-1/2 right-2.5 z-1"
        />
      </div>
      <Calendar
        selectedDate={date}
        setSelectedDate={setDate}
        unavailableDays={[]}
        toggleModal={modalToggle}
        isModalOpen={isModalOpen}
      />
      <HourPicker
        saveDateTine={() => formatDateTime(date, time)}
        setTime={setTime}
      />
    </>
  );
}
