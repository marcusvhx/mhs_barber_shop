import "./styles.css";
import moment from "moment";
import axios from "axios";

import {
  ReservProps,
  SelectedReservProps,
  ReservPropsWithCostumer,
  SetBool,
} from "@/interfaces";

import { CheckCircle, Cancel, Error } from "@mui/icons-material";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CommonComponents } from "./CommonComponents";

function Stamp({ status }: { status: ReservProps["status"] }) {
  return (
    <div className="absolute bottom-0 right-0 ">
      {status === "concluido" && <CheckCircle sx={{ color: "green" }} />}
      {status === "perdido" && <Cancel sx={{ color: "red" }} />}
      {status === "atrasado" && <Error sx={{ color: "rgb(245, 158, 11)" }} />}
    </div>
  );
}

/**
 ** reserv = dados do card
 ** setSelectedReserv = variavel com os dados da reserva selecionanda
 ** setWrapperToggle = pro mobile, state da side bar com todos os dados
 */
function ReservCard({
  reserv,
  setSelectedReserv,

  setWrapperToggle,
}: {
  reserv: SelectedReservProps;
  setSelectedReserv: Dispatch<SetStateAction<any>>;

  setWrapperToggle: SetBool;
}) {
  function setData() {
    setSelectedReserv(() => reserv);
    setWrapperToggle((old) => !old);
  }
  return (
    <div
      onClick={setData}
      className={`
        ${reserv.status === "perdido" ? " opacity-40" : ""}
        ${reserv.status === "concluido" ? "opacity-40" : ""}
  
        border-2 border-gray-500 hover:bg-black hover:bg-opacity-20 hover:bg-none reservCard min-w-[190px] w-full h-fit rounded bg-gradient-to-tl from-neutral-300 from-5% via-neutral-100 to-neutral-200 to-95% p-2 cursor-pointer transition-all relative capitalize`}
    >
      <p className="font-bold uppercase absolute top-1 right-1">
        id: {reserv.id}
      </p>
      <p>serviço: {reserv.service}</p>
      {moment().format("DD MM") === moment(reserv.dateTime).format("DD MM") ? (
        <p>data: Hoje às {moment(reserv.dateTime).format("HH:mm")}</p>
      ) : (
        <p>
          data: {moment(reserv.dateTime).format("DD/MM")} às{" "}
          {moment(reserv.dateTime).format("HH:mm")}
        </p>
      )}
      <Stamp status={reserv.status} />
    </div>
  );
}

function SideBarCardSection({
  lines,
  title,
}: {
  title: string;
  lines: { value: string; name: string }[];
}) {
  return (
    <div className="side_card_section">
      <h1 className="side_card_section_title">{title}</h1>
      {lines.map((line) => (
        <>
          <p key={`card_name_line_${line.name}`} className="sub w-fit">{line.name}:</p>
          <p key={`card_value_line_${line.name}`} >{line.value}</p>
        </>
      ))}
    </div>
  );
}

function SideBarCard({
  selectedReserv,
  children,
}: {
  selectedReserv: ReservPropsWithCostumer | SelectedReservProps;
  children?: React.ReactNode;
}) {
  const dateValue =
    moment().format("DD MM") === moment(selectedReserv.dateTime).format("DD MM")
      ? `Hoje às ${moment(selectedReserv.dateTime).format("HH:mm")}`
      : `${moment(selectedReserv.dateTime).format("DD/MM")} às ${moment(
          selectedReserv.dateTime
        ).format("HH:mm")}`;

  const cardData = [
    { name: "serviço", value: selectedReserv.service },
    { name: "data", value: dateValue },
    { name: "status", value: selectedReserv.status },
  ];
  return (
    <div className="w-fit h-fit text-lg capitalize bg-gray-200 rounded-md p-2 relative">
      {/* id da reserva */}
      <div className="subContainer absolute -top-6 right-2">
        <p className="sub">id:</p>
        {selectedReserv.id}
      </div>

      {children}

      <SideBarCardSection key={"linha"+selectedReserv.id} title="dados da reserva" lines={cardData} />
    </div>
  );
}

function SideBar({
  userId,
  children,

  sidebarWrapperToggle,
  setSidebarWrapperToggle,
}: {
  userId: string;
  children: React.ReactNode;

  sidebarWrapperToggle: boolean;
  setSidebarWrapperToggle: SetBool;
}) {
  const [userName, setUserName] = useState("");

  function handlerWrapper(e: any) {
    e.target.className.includes("close_aside") &&
      setSidebarWrapperToggle((old) => !old);
  }
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/getuser/${userId}`)
      .then((res) => {
        setUserName(() => res.data.name);
      });
  }, []);

  return (
    <div
      className={`${
        sidebarWrapperToggle
          ? "wrapper:z-10"
          : "wrapper:-z-10 wrapper:bg-opacity-0"
      } close_aside w-full h-full wrapper:bg-black wrapper:bg-opacity-40 wrapper:flex wrapper:justify-end wrapper:fixed wrapper:top-0 wrapper:left-0 first-letter:wrapper:transition-all`}
      onClick={handlerWrapper}
    >
      <div className="relative h-full ">
        <div className=" absolute z-10 top-2 right-2 hidden wrapper:block">
          <CommonComponents.X className="close_aside" />
        </div>

        <div
          className={`
        ${sidebarWrapperToggle ? "wrapper:right-0" : "wrapper:-right-40"}
        sideBar transition-all wrapper:absolute`}
        >
          <h1 className="text-2xl font-bold capitalize place-self-center">
            ola, {userName}
          </h1>
          {children}
        </div>
      </div>
    </div>
  );
}

export const PageComponents = {
  ReservCard,
  SideBar,
  SideBarCard,
  SideBarCardSection,
};
