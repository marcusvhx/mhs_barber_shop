"use client";
import "./styles.css";
import axios from "axios";
import ReservCard from "./ReservCard";
import SIdeBar from "./SIdeBar";
import { useEffect, useState } from "react";

export interface ReservProps {
  id: string;
  userId: string;
  service: "cabelo" | "barba" | "ambos";
  dateTime: string;
  status: "pendente" | "concluida" | "perdida" | "atrasado";
}
export interface SelectedReservProps {
  id: string;
  service: string;
  dateTime: string;
  status: string;
}

export default function ReservsCrud({ userId }: { userId: string }) {
  const [reservs, setReservs] = useState<ReservProps[]>([]);
  const [wrapperToggle, setWrapperToggle] = useState(false);

  const [selectedReserv, setSelectedReserv] = useState<SelectedReservProps>({
    dateTime: "",
    id: "",
    service: "",
    status: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/getreservs/${userId}`)
      .then((res) => setReservs(() => res.data));
  }, []);

  return (
    <div className="crudBody">
      <div className="cardsArea w-full h-full grid gap-4 place-items-center content-start p-2">
        {reservs.map((i) => (
          <ReservCard
            reserv={i}
            setWrapperToggle={setWrapperToggle}
            setSelectedReserv={setSelectedReserv}
          />
        ))}
      </div>
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
