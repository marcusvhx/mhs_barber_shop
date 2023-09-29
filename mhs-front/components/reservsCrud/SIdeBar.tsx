import "./styles.css";
import moment from "moment";
import { ReservProps, SelectedReservProps } from "./ReservsCrud";
import { Dispatch, SetStateAction } from "react";
import { Close } from "@mui/icons-material";
import axios from "axios";
import Link from "next/link";
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
  function handlerWrapper(e: any) {
    e.target.className.includes("close") && setWrapperToggle((old) => !old);
  }

  function cancelReserv() {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/deletereserv/${userId}/${selectedReserv.id}`
      )
      .then(() => {
        setReservs((old) => {
          const newSelected = old.filter((i) => i.id !== selectedReserv.id);
          newSelected.length > 0 && setSelectedReserv(() => newSelected[0]);

          return newSelected;
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div
      className={`${
        wrapperToggle ? "wrapper:z-10" : "wrapper:-z-10"
      } wrapper transition-all relative close`}
      onClick={handlerWrapper}
    >
      <div className="absolute top-2 right-2 hidden wrapper:block">
        <div className="relative w-full h-full">
          <div className="close absolute w-full h-full hover:bg-black hover:bg-opacity-10 rounded-full transition cursor-pointer"></div>
          <Close sx={{ fontSize: "35px" }} />
        </div>
      </div>

      <div className="sideBar">
        <h1 className="text-2xl font-bold capitalize place-self-center">
          olá, nome
        </h1>

        <div className="w-fit h-fit text-xl capitalize bg-gray-200 rounded-md p-2">
          {/*  */}
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
              <p>Hoje às {moment(selectedReserv.dateTime).format("HH:mm")}</p>
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

        <div className="grid w-full h-fit place-itemc-center gap-2">
          <Link
            href={`/${userId}/reservar`}
            className="sidebarBtn bg-emerald-500 hover:bg-emerald-600 text-center"
          >
            fazer nova reserva
          </Link>
          <button className="sidebarBtn bg-sky-500 hover:bg-sky-600">
            editar reserva
          </button>
          <button
            onClick={cancelReserv}
            className="sidebarBtn bg-red-500 hover:bg-red-600"
          >
            cancelar reserva
          </button>
        </div>
      </div>
    </div>
  );
}
