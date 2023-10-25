"use client";
import UserSideBar from "./UserSideBar";
import { Dispatch, SetStateAction, useState } from "react";
import { CommonComponents } from "../common/CommonComponents";
import moment from "moment";
import { PageComponents } from "../common/PageComponents";
import { ReservProps, SelectedReservProps, SetBool } from "@/interfaces";
import { CommonBtnIcons } from "../common/CommonButons";

export default function ReservsCrud({ userId }: { userId: string }) {
  const [reservs, setReservs] = useState<ReservProps[]>([]);
  const [sidebarWrapperToggle, setSidebarWrapperToggle] = useState(false);
  const [reloadReservsListToggle, setReloadReservsListToggle] = useState(false);
  
  const [selectedReserv, setSelectedReserv] = useState<SelectedReservProps>({
    id: "",
    dateTime: moment().format(),
    service: "cabelo",
    status: "pendente",
  });
  function reloadReservsList() {
    setReloadReservsListToggle((old) => !old);
  }

  return (
    <div className="crudBody">
      <div className="fixed top-2 right-2 bg-zinc-200 z-[2] hidden wrapper:block rounded">
        <CommonBtnIcons.MoreOptsBtn
          func={() => setSidebarWrapperToggle((old) => !old)}
          type="lines"
        />
      </div>
      <CommonComponents.LoadPage
        apiUrl={`getreservs/${userId}`}
        loadMsg="buscando reservas..."
        setSomething={setReservs}
        reload={reloadReservsListToggle}
      >
        <CrudContent
          reservs={reservs}
          setSelectedReserv={setSelectedReserv}
          setWrapperToggle={setSidebarWrapperToggle}
          reloadReservsList={reloadReservsList}
        />
      </CommonComponents.LoadPage>

      <UserSideBar
        userId={userId}
        setReservs={setReservs}
        sidebarWrapperToggle={sidebarWrapperToggle}
        setSidebarWrapperToggle={setSidebarWrapperToggle}
        setSelectedReserv={setSelectedReserv}
        selectedReserv={selectedReserv}
        reloadReservsList={reloadReservsList}
      />

      {/* ========================== */}
    </div>
  );
}

function CrudContent({
  reservs,
  setSelectedReserv,
  setWrapperToggle,
  reloadReservsList
}: {
  reservs: ReservProps[];
  setWrapperToggle: SetBool;
  setSelectedReserv: Dispatch<SetStateAction<SelectedReservProps>>;
  reloadReservsList: () => void;
}) {
  if (reservs.length > 0) {
    return (
      <div className="cardsArea w-full h-full grid gap-4 place-items-center content-start p-2 overflow-y-auto relative">
        <CommonBtnIcons.ReloadBtn
          func={reloadReservsList}
          coordXY="top-2 wrapper:top-10 right-1 z-10 bg-neutral-200 rounded-full"
          position="absolute"
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
    <div className="w-full h-full grid place-items-center capitalize text-neutral-500 text-2xl text-center relative">
      <CommonBtnIcons.ReloadBtn
          func={reloadReservsList}
          coordXY="top-2 wrapper:top-10 right-1 z-10 bg-neutral-200 rounded-full"
          position="absolute"
        />
      voce ainda não possue reservas...
    </div>
  );
}
