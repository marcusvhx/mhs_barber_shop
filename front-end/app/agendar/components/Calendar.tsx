"use client";

import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import "react-day-picker/style.css";

import { MouseEvent, useState } from "react";

const ClassesNames = getDefaultClassNames();

const getAvailableMonths = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const daysInMonth = new Date(y, m, 0).getDate();

  date.getDate() <= daysInMonth - 10
    ? date.setMonth(m + 2)
    : date.setMonth(m + 1);

  return date;
};
const next60days = new Date();
next60days.setDate(next60days.getDate() + 60);

export default function Calendar({
  isModalOpen,
  toggleModal,
}: {
  isModalOpen: boolean;
  toggleModal: (e: MouseEvent<HTMLDivElement>) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  return (
    <div
      onClick={toggleModal}
      data-is-open={isModalOpen}
      className="toggle hidden data-[is-open=true]:grid place-items-center fixed top-0 left-0 h-dvh w-dvw bg-black/20 z-3"
    >
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        locale={ptBR}
        footer={
          selectedDate
            ? `${selectedDate?.toLocaleDateString()}`
            : "selecione uma data"
        }
        startMonth={new Date()}
        endMonth={getAvailableMonths()}
        disabled={{
          before: new Date(),
          after: next60days,
        }}
        navLayout="around"
        classNames={{
          root: `${ClassesNames.root} bg-foreground text-background`,
          footer: `${ClassesNames.root} flex justify-center py-2`,
          chevron:`fill-background`,
          day:`${ClassesNames.day} pl-0.5`,
          today:`text-secondary font-bold bg-primary/20 rounded-full`,
          selected:`border-primary border-3 rounded-full flex justify-center items-center text-center font-bold `
        }}
      />
    </div>
  );
}
