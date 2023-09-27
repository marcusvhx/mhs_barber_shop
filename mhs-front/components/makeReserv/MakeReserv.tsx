"use client";
import "../styles.css";

import moment from "moment";
import FormNavBtns from "./components/FormNavBtns";

import { Dispatch, SetStateAction, useState } from "react";
import { InpEvent } from "./components/common/CommonComponents";
import ServicesInp from "./components/inputs/ServicesInp";
import ReservDateInp from "./components/inputs/ReservDateInp";

export interface reservFormProps {
  dateTime: string;
  service: "cabelo" | "barba" | "ambos";
  status: "pending" | "done" | "lost" | "late";
}
export type setReserv = Dispatch<SetStateAction<reservFormProps>>;

function MakeReserv({ userId }: { userId: string }) {
  const [reservData, setReservData] = useState<reservFormProps>({
    dateTime: moment().hour(0).minute(0).format(),
    service: "cabelo",
    status: "pending",
  });

  function getReservData(e: InpEvent) {
    setReservData((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="reservPage w-screen h-screen flex flex-col items-center justify-center gap-10">
      <div className="flex items-center gap-2 scroll-smooth overflow-hidden h-[380px] w-screen">
        
        {/* =========== inputs do serviço =========== */}
        <ServicesInp getReservData={getReservData} reservData={reservData} />

        <ReservDateInp setReservData={setReservData} reservData={reservData} />
      </div>
      <FormNavBtns userId={userId} reservData={reservData} />
    </div>
  );
}
export default MakeReserv;
