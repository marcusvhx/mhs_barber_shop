"use client";
import { useState } from "react";
import axios from "axios";

import AdmSideBar from "./AdminSideBar";
import AdmCrudContent from "./AdminReservsCrud";

import { ReservPropsWithCostumer } from "@/interfaces";

import { CommonComponents } from "../common/CommonComponents";
import { CommonBtnIcons } from "../common/CommonButons";

export default function AdminPageComp({ userId }: { userId: string }) {
  const [reservs, setReservs] = useState<ReservPropsWithCostumer[]>([]);
  const [sideBarWrapperToggle, setSideBarWrapperToggle] = useState(false);
  const [reloadReservsListToggle, setReloadReservsListToggle] = useState(false);
  
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

  function reloadReservsList() {
    setReloadReservsListToggle((old) => !old);
  }

  return (
    <div className="crudBody">
      <div className="fixed top-2 right-2 bg-zinc-200 z-[2] hidden wrapper:block rounded">
        <CommonBtnIcons.MoreOptsBtn
          func={() => setSideBarWrapperToggle((old) => !old)}
          type="lines"
        />
      </div>

      <CommonComponents.LoadPage
        apiUrl={`getallreservs/${userId}`}
        loadMsg="buscando reservas..."
        setSomething={setReservs}
        reload={reloadReservsListToggle}
      >
        <AdmCrudContent
          reservs={reservs}
          setSelectedReserv={setSelectedReserv}
          setWrapperToggle={setSideBarWrapperToggle}
          reloadCards={reloadReservsList}
        />
      </CommonComponents.LoadPage>

      <AdmSideBar
        selectedReserv={selectedReserv}
        setSelectedReserv={setSelectedReserv}
        setReservs={setReservs}
        sidebarWrapperToggle={sideBarWrapperToggle}
        setSidebarWrapperToggle={setSideBarWrapperToggle}
        userId={userId}
      />

      {/* ========================== */}
    </div>
  );
}
