"use client";
import "../styles.css";

import moment from "moment";
import FormNavBtns from "./components/FormNavBtns";

import { Dispatch, SetStateAction, useState } from "react";
import { InpEvent } from "./components/common/CommonComponents";
import ServicesInp from "../inputs/ServicesInp";
import ReservDateInp from "../inputs/ReservDateInp";
import { Home } from "@mui/icons-material";
import Link from "next/link";

export interface ReservFormProps {
  dateTime: string;
  service: "cabelo" | "barba" | "ambos";
}
export type SetReserv = Dispatch<SetStateAction<ReservFormProps>>;
function MakeReserv({ userId }: { userId: string }) {
  const [reservData, setReservData] = useState<ReservFormProps>({
    dateTime: moment().hour(0).minute(0).format(),
    service: "cabelo",
  });
  return (
    <div className="reservPage w-screen h-screen flex flex-col items-center justify-center gap-10">
      <div className="flex items-center gap-2 scroll-smooth overflow-hidden h-[380px] w-screen">
        {/* =========== inputs do serviço =========== */}
        <Link
          href={`reservas`}
          className="fixed top-5 right-5 rounded-full bg-gray-200 cursor-pointer hover:bg-neutral-300 p-1 transition-all z-10"
        >
          <Home sx={{ fontSize: "30px" }} />
        </Link>

        <ServicesInp setReservData={setReservData} reservData={reservData} />

        <ReservDateInp setReservData={setReservData} reservData={reservData} />
      </div>
      <FormNavBtns userId={userId} reservData={reservData} />
    </div>
  );
}
export default MakeReserv;
