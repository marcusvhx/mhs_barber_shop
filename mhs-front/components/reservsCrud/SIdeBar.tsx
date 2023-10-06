import "./styles.css";
import { ReservProps, SelectedReservProps } from "./ReservsCrud";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import EditPopUp from "./EditPopUp";
import { CommonComponents } from "../makeReserv/components/common/CommonComponents";
import moment from "moment";

export interface UserData {
  id: string;
  name: string;
  phoneNumber: string;
}

export default function SideBar({
  userId,
  selectedReserv,
  setSelectedReserv,

  wrapperToggle,
  setWrapperToggle,

  setReservs,
}: {
  userId: string;

  wrapperToggle: boolean;
  setWrapperToggle: Dispatch<SetStateAction<boolean>>;

  selectedReserv: SelectedReservProps;
  setSelectedReserv: Dispatch<SetStateAction<SelectedReservProps>>;

  setReservs: Dispatch<SetStateAction<ReservProps[]>>;
}) {
  const [userName, setUserName] = useState("");
  const [editToggle, setEditToggle] = useState(false);

  function handlerWrapper(e: any) {
    e.target.className.includes("close_aside") &&
      setWrapperToggle((old) => !old);
  }

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

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/getuser/${userId}`)
      .then((res) => {
        setUserName(res.data.name);
      });
      
  }, []);

  return (
    <div
      className={`${
        wrapperToggle ? "wrapper:z-10" : "wrapper:-z-10 wrapper:bg-opacity-0"
      } close_aside w-full h-full wrapper:bg-black wrapper:bg-opacity-40 wrapper:flex wrapper:justify-end wrapper:fixed wrapper:top-0 wrapper:left-0 first-letter:wrapper:transition-all`}
      onClick={handlerWrapper}
    >
      <div className="relative h-full ">
        <div className=" absolute z-10 top-2 right-2 hidden wrapper:block">
         <CommonComponents.X className="close_aside" />
        </div>

        <div
          className={`
      ${wrapperToggle ? "wrapper:right-0" : "wrapper:-right-40"}
      sideBar transition-all wrapper:absolute`}
        >
          <h1 className="text-2xl font-bold capitalize place-self-center">
            ola, {userName}
          </h1>
          {selectedReserv.id && (
            <div className="w-fit h-fit text-xl capitalize bg-gray-200 rounded-md p-2">
              <div className="subContainer">
                <p className="sub">id da reserva:</p>
                {selectedReserv.id}
              </div>

              <div className="subContainer">
                <p className="sub">serviço:</p>
                {selectedReserv.service}
              </div>

              {moment().format("DD MM") ===
              moment(selectedReserv.dateTime).format("DD MM") ? (
                <div className="subContainer">
                  <p className="sub">data:</p>
                  <p>
                    Hoje às {moment(selectedReserv.dateTime).format("HH:mm")}
                  </p>
                </div>
              ) : (
                <div className="subContainer">
                  <p className="sub">data:</p>
                  {moment(selectedReserv.dateTime).format("DD/MM")} às{" "}
                  {moment(selectedReserv.dateTime).format("HH:mm")}
                </div>
              )}

              <div className="subContainer">
                <p className="sub">status:</p> {selectedReserv.status}
              </div>
            </div>
          )}

          <div className="grid w-full h-fit place-itemc-center gap-2">
            <Link
              href={`/${userId}/reservar`}
              className="close_aside sidebarBtn bg-emerald-500 hover:bg-emerald-600 text-center"
            >
              fazer nova reserva
            </Link>
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
          </div>
        </div>

        <EditPopUp
          toggle={editToggle}
          setToggle={setEditToggle}
          selectedReserv={selectedReserv}
          setReservs={setReservs}
        />
      </div>
    </div>
  );
}
