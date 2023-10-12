import { useEffect } from "react";
import axios from "axios";
import {} from "../common/CommonComponents";
import {
  ReservPropsWithCostumer,
  SetBool,
  SetSelectedReserv,
  SetSelectedReservWithCostimer,
} from "@/interfaces";
import { PageComponents } from "../common/PageComponents";

export default function AdmSideBar({
  userId,
  selectedReserv,
  setSelectedReserv,

  sidebarWrapperToggle,
  setSidebarWrapperToggle,

  setReservs,
}: {
  userId: string;

  sidebarWrapperToggle: boolean;
  setSidebarWrapperToggle: SetBool;

  selectedReserv: ReservPropsWithCostumer;
  setSelectedReserv: SetSelectedReserv;

  setReservs: SetSelectedReservWithCostimer;
}) {
  function cancelReserv() {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/deletereserv/${userId}/${selectedReserv.id}`
      )
      .then(() => {
        setReservs((old) => {
          const newSelected = old.filter((i) => i.id !== selectedReserv.id);
          setSelectedReserv((old) =>
            newSelected.length > 0 ? newSelected[0] : { ...old, id: "" }
          );

          return newSelected;
        });
      })
      .catch((err) => console.log(err));
  }

  function concludeReserv() {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/editreserv/${selectedReserv.id}`,
        {
          reservData: { ...selectedReserv, status: "concluido" },
        }
      )
      .then(() => {
        setReservs((old) => {
          const newSelected = old.filter((i) => i.id !== selectedReserv.id);
          setSelectedReserv((old) =>
            newSelected.length > 0 ? newSelected[0] : { ...old, id: "" }
          );

          return newSelected;
        });
      })
      .catch((err) => {
        alert(
          "ocorreu um erro interno, tente novamente mais tarde ou entre em contato conosco"
        );
        console.log(err);
      });
  }

  const clientData = [
    { name: "nome", value: selectedReserv.ownerName },
    { name: "telefone", value: selectedReserv.ownerPhone },
  ];

  return (
    <PageComponents.SideBar
      userId={userId}
      setSidebarWrapperToggle={setSidebarWrapperToggle}
      sidebarWrapperToggle={sidebarWrapperToggle}
    >
      {selectedReserv.id && (
        <PageComponents.SideBarCard selectedReserv={selectedReserv}>
          <PageComponents.SideBarCardSection
            title="dados do cliente"
            lines={clientData}
          />
          <hr className="border-black" />
        </PageComponents.SideBarCard>
      )}
      {selectedReserv.id && (
        <div className="">
          <button
            onClick={concludeReserv}
            className=" sidebarBtn bg-sky-500 hover:bg-sky-600"
          >
            concluir reserva
          </button>

          <button
            onClick={cancelReserv}
            className=" sidebarBtn bg-red-500 hover:bg-red-600"
          >
            cancelar reserva
          </button>
        </div>
      )}
    </PageComponents.SideBar>
  );
}
