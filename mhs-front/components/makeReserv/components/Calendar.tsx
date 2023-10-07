"use client";
import "@/components/styles.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { SetReserv } from "../MakeReserv";
import axios from "axios";

export interface CalendarDaysProps {
  date: string;
  available: boolean;
  selected: boolean;
}

export interface CalendarDataProps {
  current: CalendarDaysProps[];
  next: CalendarDaysProps[];
}

const monthsNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function Calendar({
  setReservData,
  calendarToggleHandler,
}: {
  setReservData: SetReserv;
  calendarToggleHandler: () => void;
}) {
  //
  const [nextMonth, setNextMonth] = useState(false);
  const witchMonth = nextMonth ? "next" : "current";
  const [calendarDays, setCalendarDays] = useState<CalendarDataProps>({
    current: [],
    next: [],
  });

  const monthsNamesIndex = moment(calendarDays[witchMonth][10]?.date).month();

 

  function setReservDate(dateSelected: CalendarDaysProps) {
    if (dateSelected.available) {
      const calendarHolder = calendarDays;
      const newSelectedDateIndex = calendarHolder[witchMonth].findIndex(
        (i) => i.date === dateSelected.date
      );

      calendarHolder[witchMonth].forEach((i) => (i.selected = false));
      calendarHolder[witchMonth][newSelectedDateIndex].selected = true;

      // salva os dados
      setReservData((old) => ({ ...old, dateTime: dateSelected.date }));

      // fecha o calendario qndo muda a data
      calendarToggleHandler();
      // mostra que a data foi alterada
      setCalendarDays(() => calendarHolder);
      // forceReload();
    }
  }

  function calendarHandler() {
    setNextMonth((old) => !old);
  }

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/getcalendardata`)
      .then((res) => {
        setCalendarDays(res.data);
      });
  }, []);

  return (
    <div>
      <h1 className="flex justify-center items-center font-bold text-xl">
        {monthsNames[monthsNamesIndex]}
      </h1>
      <div className="grid grid-cols-6 w-[210px] border-2 border-neutral-500 relative">
        <div className="calendarHeader">s</div>
        <div className="calendarHeader">t</div>
        <div className="calendarHeader">q</div>
        <div className="calendarHeader">q</div>
        <div className="calendarHeader">s</div>
        <div className="calendarHeader">s</div>

        {calendarDays[witchMonth].map((i) => (
          <div
            onClick={() => setReservDate(i)}
            key={moment(i.date).format()}
            className={`
          ${
            i.available
              ? "hover:bg-amber-300 hover:bg-opacity-60 cursor-pointer"
              : "opacity-40 cursor-not-allowed"
          } 
          ${
            moment().format().includes(i.date.split("T")[0]) && !i.selected
              ? "bg-gray-300"
              : ""
          }
          ${i.selected && i.available ? "bg-amber-300" : ""}
          
          w-full bforder-l bordefr-b border-neutral-500 grid place-items-center uppercase h-[35px] transition`}
          >
            {moment(i.date).date()}
          </div>
        ))}
        <button
          onClick={calendarHandler}
          className={`${
            monthsNamesIndex === moment().month() ? "hidden" : ""
          } w-5 h-5 border-black border-l-4 border-t-4 -rotate-45 absolute -left-6 top-1/2 -translate-y-1/2`}
        ></button>
        <button
          className={`${
            monthsNamesIndex === moment().month() + 1 ? "hidden" : ""
          } w-5 h-5 border-black border-r-4 border-t-4 rotate-45 absolute -right-6 top-1/2 -translate-y-1/2`}
          onClick={calendarHandler}
        ></button>
      </div>
    </div>
  );
}