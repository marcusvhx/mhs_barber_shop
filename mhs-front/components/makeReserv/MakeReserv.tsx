"use client";
import "../styles.css";

import moment from "moment";
import FormNavBtns from "./components/FormNavBtns";

import { useState } from "react";
import ServicesInp from "../inputs/ServicesInp";
import ReservDateInp from "../inputs/ReservDateInp";
import { ReservFormProps } from "@/interfaces";
import {CommonLinkIcons } from "../common/CommonButons";

function MakeReserv({ userId }: { userId: string }) {
  const [reservData, setReservData] = useState<ReservFormProps>({
    dateTime: moment().hour(0).minute(0).format(),
    service: "cabelo",
  });
  return (
    <div className="reservPage w-screen h-screen flex flex-col items-center justify-center gap-10">
      <div className="flex items-center gap-2 scroll-smooth overflow-hidden h-[380px] w-screen">
        {/* =========== inputs do serviço =========== */}
        <CommonLinkIcons.HomeLink
          position="fixed"
          coordXY="top-3 right-3"
          link="reservas"
        />

        <ServicesInp setReservData={setReservData} reservData={reservData} />

        <ReservDateInp setReservData={setReservData} reservData={reservData} />
      </div>
      <FormNavBtns userId={userId} reservData={reservData} />
    </div>
  );
}
export default MakeReserv;
