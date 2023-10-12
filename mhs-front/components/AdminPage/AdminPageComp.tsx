"use client";
import { useState } from "react";
import AdmSideBar from "./AdminSideBar";
import { CommonComponents } from "../common/CommonComponents";
import { ReservPropsWithCostumer } from "@/interfaces";
import AdmCrudContent from "./AdminReservsCrud";

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
        <AdmCrudContent
          reservs={reservs}
          setSelectedReserv={setSelectedReserv}
          setWrapperToggle={setSideBarWrapperToggle}
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
