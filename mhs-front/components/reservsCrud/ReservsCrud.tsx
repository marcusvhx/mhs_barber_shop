"use client";
import UserSideBar from "./UserSideBar";
import { Dispatch, SetStateAction, useState } from "react";
import { CommonComponents } from "../common/CommonComponents";
import moment from "moment";
import { PageComponents } from "../common/PageComponents";
import { ReservProps, SelectedReservProps, SetBool } from "@/interfaces";

export default function ReservsCrud({ userId }: { userId: string }) {
  const [reservs, setReservs] = useState<ReservProps[]>([]);
  const [sidebarWrapperToggle, setSidebarWrapperToggle] = useState(false);

  const [selectedReserv, setSelectedReserv] = useState<SelectedReservProps>({
    id: "",
    dateTime: moment().format(),
    service: "cabelo",
    status: "pendente",
  });

  return (
    <div className="crudBody">
      <div className="fixed top-1 right-1 bg-zinc-200 z-[2] hidden wrapper:block rounded">
        <CommonComponents.MoreOptsBtn
          func={() => setSidebarWrapperToggle((old) => !old)}
          type="lines"
        />
      </div>
      <CommonComponents.LoadPage
        apiUrl={`getreservs/${userId}`}
        loadMsg="buscando reservas..."
        setSomething={setReservs}
      >
        <CrudContent
          reservs={reservs}
          setSelectedReserv={setSelectedReserv}
          setWrapperToggle={setSidebarWrapperToggle}
        />
      </CommonComponents.LoadPage>

      <UserSideBar
        userId={userId}
        setReservs={setReservs}
        sidebarWrapperToggle={sidebarWrapperToggle}
        setSidebarWrapperToggle={setSidebarWrapperToggle}
        setSelectedReserv={setSelectedReserv}
        selectedReserv={selectedReserv}
      />

      {/* ========================== */}
    </div>
  );
}

function CrudContent({
  reservs,
  setSelectedReserv,
  setWrapperToggle,
}: {
  reservs: ReservProps[];
  setWrapperToggle: SetBool;
  setSelectedReserv: Dispatch<SetStateAction<SelectedReservProps>>;
}) {
  if (reservs.length > 0) {
    return (
      <div className="cardsArea w-full h-full grid gap-4 place-items-center content-start p-2 overflow-y-auto">
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
    <div className="w-full h-full grid place-items-center capitalize text-neutral-500 text-2xl text-center">
      voce ainda não possue reservas...
    </div>
  );
}
