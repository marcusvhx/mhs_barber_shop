import { ReservProps, SelectedReservProps, SetBool } from "@/interfaces";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import EditPopUp from "./EditPopUp";
import { PageComponents } from "../common/PageComponents";
import { CommonLinkIcons } from "../common/CommonButons";

export default function UserSideBar({
  userId,
  selectedReserv,
  setSelectedReserv,

  sidebarWrapperToggle,
  setSidebarWrapperToggle,

  setReservs,
  reloadReservsList
}: {
  userId: string;

  sidebarWrapperToggle: boolean;
  setSidebarWrapperToggle: SetBool;

  selectedReserv: SelectedReservProps;
  setSelectedReserv: Dispatch<SetStateAction<SelectedReservProps>>;

  setReservs: Dispatch<SetStateAction<ReservProps[]>>;
  reloadReservsList:()=>void
}) {
  const [editToggle, setEditToggle] = useState(false);

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

  useEffect(() => {}, []);

  return (
    <PageComponents.SideBar
      userId={userId}
      setSidebarWrapperToggle={setSidebarWrapperToggle}
      sidebarWrapperToggle={sidebarWrapperToggle}
    >
      <CommonLinkIcons.SettingsLink
        link="configs"
        position="absolute"
        coordXY="top-2 left-2"
      />


      {selectedReserv.id && (
        <PageComponents.SideBarCard selectedReserv={selectedReserv} />
      )}

      <div className="grid w-full h-fit place-itemc-center gap-2">
        <Link
          href={`/${userId}/reservar`}
          className="close_aside sidebarBtn bg-emerald-500 hover:bg-emerald-600 text-center"
        >
          fazer nova reserva
        </Link>
        {selectedReserv.id && (
          <>
            <button
              onClick={() => setEditToggle((old) => !old)}
              className=" sidebarBtn bg-sky-500 hover:bg-sky-600"
            >
              editar reserva
            </button>
            <button
              onClick={cancelReserv}
              className="close_aside sidebarBtn bg-red-500 hover:bg-red-600"
            >
              cancelar reserva
            </button>
          </>
        )}
      </div>

      <EditPopUp
        toggle={editToggle}
        setToggle={setEditToggle}
        selectedReserv={selectedReserv}
        setReservs={setReservs}
        reloadReservsList={reloadReservsList}
      />
    </PageComponents.SideBar>
  );
}
