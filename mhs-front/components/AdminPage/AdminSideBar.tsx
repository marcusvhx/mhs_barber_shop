import axios from "axios";
import {
  ReservPropsWithCostumer,
  SetBool,
  SetSelectedReserv,
  SetSelectedReservWithCostimer,
} from "@/interfaces";
import { PageComponents } from "../common/PageComponents";
import { CommonLinkIcons } from "../common/CommonButons";

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
        `${process.env.NEXT_PUBLIC_API_URL}/deletereserv/${selectedReserv.id}`
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
        `${process.env.NEXT_PUBLIC_API_URL}/changestatus/${selectedReserv.id}`,
        { status: selectedReserv.status, dateTime: selectedReserv.dateTime }
      )
      .then((res) => {
        setReservs((oldReservList) => {
          const newSelected = oldReservList;

          newSelected.find(
            (i) => i.id === res.data.id && (i.status = res.data.status)
          );
          newSelected.sort((a) => (a.status === "concluido" ? 1 : -1));

          newSelected.every((reserv) =>
            reserv.status === "concluido"
              ? setSelectedReserv(() => ({ ...reserv, id: "" }))
              : setSelectedReserv(() => newSelected[0])
          );

          return newSelected;
        });
      })
      .catch((err) => {
        alert(
          "ocorreu um erro interno, tente novamente mais tarde ou entre em contato"
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
      <CommonLinkIcons.SettingsLink
        link="configs"
        position="absolute"
        coordXY="top-2 left-1"
      />
      {selectedReserv.id && (
        <PageComponents.SideBarCard selectedReserv={selectedReserv}>
          <PageComponents.SideBarCardSection
            title="dados do cliente"
            lines={clientData}
          />
          <hr className="border-black my-2" />
        </PageComponents.SideBarCard>
      )}

      {selectedReserv.id && (
        <div className="w-full flex flex-col items-center gap-2">
          <button
            onClick={concludeReserv}
            className={`${
              selectedReserv.status === "concluido"
                ? "bg-amber-500 hover:bg-amber-500"
                : "bg-sky-500 hover:bg-sky-600"
            } sidebarBtn `}
          >
            {selectedReserv.status === "concluido"
              ? "reativar reserva"
              : "concluir reserva"}
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
