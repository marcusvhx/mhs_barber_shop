"use client";
import { Dispatch, SetStateAction } from "react";
import { PageComponents } from "../common/PageComponents";
import { ReservPropsWithCostumer, SetBool, } from "@/interfaces";
import { CommonBtnIcons } from "../common/CommonButons";

export default function AdmCrudContent({
  reservs,
  setSelectedReserv,
  setWrapperToggle,
  reloadCards
}: {
  reservs: ReservPropsWithCostumer[];
  setWrapperToggle: SetBool;
  setSelectedReserv: Dispatch<SetStateAction<ReservPropsWithCostumer>>;
  reloadCards:()=>void
}) {
  if (reservs.length > 0) {
    return (
      <div className="cardsArea w-full h-full grid gap-4 place-items-center content-start p-1 overflow-y-auto relative">
        <CommonBtnIcons.ReloadBtn 
        func={reloadCards}
        position="absolute"
        coordXY="top-2 wrapper:top-10 right-1 z-10 bg-neutral-200 rounded-full"        
        />
        {reservs.map((i) => (
          <PageComponents.ReservCard
            key={`reservCard_${i.id}`}
            reserv={i}
            setWrapperToggle={setWrapperToggle}
            setSelectedReserv={setSelectedReserv}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="w-full h-full grid place-items-center capitalize text-neutral-500 text-2xl text-center relative p-1">
      <CommonBtnIcons.ReloadBtn 
        func={reloadCards}
        position="absolute"
        coordXY="wrapper:top-10 top-2 right-1 z-10"        
        />
      voce ainda não possue reservas...
    </div>
  );
}
