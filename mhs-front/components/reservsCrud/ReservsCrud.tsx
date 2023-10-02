"use client";
import "./styles.css";
import axios from "axios";
import ReservCard from "./ReservCard";
import SIdeBar from "./SIdeBar";
import { useEffect, useState } from "react";
import { CommonComponents } from "../makeReserv/components/common/CommonComponents";
import moment from "moment";

export interface ReservProps {
  id: string;
  userId: string;
  service: "cabelo" | "barba" | "ambos";
  dateTime: string;
  status: "pendente" | "concluido" | "perdido" | "atrasado";
}
export interface SelectedReservProps {
  id: string;
  service: ReservProps["service"];
  dateTime: string;
  status: ReservProps["status"];
}

export default function ReservsCrud({ userId }: { userId: string }) {
  const [reservs, setReservs] = useState<ReservProps[]>([]);
  const [wrapperToggle, setWrapperToggle] = useState(false);

  const [selectedReserv, setSelectedReserv] = useState<SelectedReservProps>({
    id: "",
    dateTime: moment().format(),
    service: "cabelo",
    status: "pendente",
  });

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/getreservs/${userId}`)
      .then((res) => setReservs(() => res.data));
  }, []);

  return (
    <div className="crudBody">
      <div className="fixed top-1 right-1 bg-zinc-200 z-[2] hidden wrapper:block rounded">
        <CommonComponents.MoreOptsBtn
          func={() => setWrapperToggle((old) => !old)}
          type="lines"
        />
      </div>
      {reservs.length > 0 ? (
        <div className="cardsArea w-full h-full grid gap-4 place-items-center content-start p-2">
          {reservs.map((i) => (
            <ReservCard
              key={`reservCard_${i.id}`}
              reserv={i}
              setWrapperToggle={setWrapperToggle}
              setSelectedReserv={setSelectedReserv}
            />
          ))}
        </div>
      ) : (
        <EmptyListMsg />
      )}
      <SIdeBar
        userId={userId}
        setReservs={setReservs}
        wrapperToggle={wrapperToggle}
        setWrapperToggle={setWrapperToggle}
        setSelectedReserv={setSelectedReserv}
        selectedReserv={selectedReserv}
      />

      {/* ========================== */}
    </div>
  );
}

function EmptyListMsg() {
  return (
    <div className="w-full h-full grid place-items-center capitalize text-neutral-500 text-2xl text-center">
      voce ainda não possue reservas...
    </div>
  );
}
