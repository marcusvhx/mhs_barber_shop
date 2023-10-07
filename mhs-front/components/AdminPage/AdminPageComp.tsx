"use client";
import { useState } from "react";
import { SelectedReservProps } from "../reservsCrud/ReservsCrud";
import AdmSideBar from "./AdminSideBar";
import { CommonComponents } from "../common/CommonComponents";
import ReservCard from "../reservsCrud/ReservCard";

export interface ReservPropsWithCostumer extends SelectedReservProps {
  ownerName: string;
  ownerPhone: string;
}
export default function AdminPageComp({ userId }: { userId: string }) {
  const [reservs, setReservs] = useState<ReservPropsWithCostumer[]>([]);
  const [sideBarWrapperToggle, setSideBarWrapperToggle] = useState(false);
  const [selectedReserv, setSelectedReserv] = useState<ReservPropsWithCostumer>(
    {
      id: "",
      dateTime: "",
      service: "cabelo",
      status: "pendente",
      ownerName: "",
      ownerPhone: "",
    }
  );

  return (
    <div className="crudBody">
      <div className="fixed top-1 right-1 bg-zinc-200 z-[2] hidden wrapper:block rounded">
        <CommonComponents.MoreOptsBtn
          func={() => setSideBarWrapperToggle((old) => !old)}
          type="lines"
        />
      </div>
      <CommonComponents.LoadPage
        apiUrl={`getallreservs/${userId}`}
        loadMsg="buscando reservas..."
        setSomething={setReservs}
      >
        <div className="cardsArea w-full h-full grid gap-4 place-items-center content-start p-2 overflow-y-auto">
          {reservs.map((i) => (
            <ReservCard
              key={"reservCard" + i.id}
              reserv={i}
              setSelectedReserv={setSelectedReserv}
              setWrapperToggle={setSideBarWrapperToggle}
            />
          ))}
        </div>
      </CommonComponents.LoadPage>
      <AdmSideBar
        selectedReserv={selectedReserv}
        setReservs={setReservs}
        setSelectedReserv={setSelectedReserv}
        setWrapperToggle={setSideBarWrapperToggle}
        userId={userId}
        wrapperToggle={sideBarWrapperToggle}
      />

      {/* ========================== */}
    </div>
  );
}
