"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ReservProps } from "../reservsCrud/ReservsCrud";

export interface ReservPropsWithCostumer extends ReservProps {
  ownerName: string;
  ownerPhone: string;
}
export default function AdminPageComp({ userId }: { userId: string }) {
  const [reservs, setReservs] = useState<ReservPropsWithCostumer[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/getallreservs/${userId}`)
      .then((res) => setReservs(res.data));
  }, []);

  return (
    <div>
      {reservs.map((i) => (
        <div
        key={`card${i.id}`}
        className=" w-56 h-fit p-2 rounded bg-indigo-400 ">
          <p>{i.ownerName}</p>
          <p>{i.ownerPhone}</p>
          <p>{i.service}</p>
          <p>{i.dateTime}</p>
        </div>
      ))}
    </div>
  );
}
