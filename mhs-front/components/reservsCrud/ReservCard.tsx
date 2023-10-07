import moment from "moment";
import { ReservProps, SelectedReservProps } from "./ReservsCrud";
import { Dispatch, SetStateAction } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import CancelIcon from "@mui/icons-material/Cancel";
import { CheckCircle } from "@mui/icons-material";
import { SetBool } from "../common/CommonComponents";

export function Stamp({ status }: { status: ReservProps["status"] }) {
  return (
    <div className="absolute bottom-0 right-0 ">
      {status === "concluido" && <CheckCircle sx={{ color: "green" }} />}
      {status === "perdido" && <CancelIcon sx={{ color: "red" }} />}
      {status === "atrasado" && (
        <ErrorIcon sx={{ color: "rgb(245, 158, 11)" }} />
      )}
    </div>
  );
}

/**
 ** reserv = dados do card
 ** setSelectedReserv = variavel com os dados da reserva selecionanda
 ** setWrapperToggle = pro mobile, state da side bar com todos os dados
 */
export default function ReservCard({
  reserv,
  setSelectedReserv,

  setWrapperToggle,
}: {
  reserv: SelectedReservProps;
  setSelectedReserv: Dispatch<SetStateAction<any>>;

  setWrapperToggle: SetBool;
}) {
  function setData() {
    setSelectedReserv(() => reserv);
    setWrapperToggle((old) => !old);
  }
  return (
    <div
      onClick={setData}
      className={`
      ${reserv.status === "perdido" ? " opacity-40" : ""}
      ${reserv.status === "concluido" ? "opacity-40" : ""}

      border-2 border-gray-500 hover:bg-black hover:bg-opacity-20 hover:bg-none reservCard min-w-[190px] w-full h-fit rounded bg-gradient-to-tl from-neutral-300 from-5% via-neutral-100 to-neutral-200 to-95% p-2 cursor-pointer transition-all relative capitalize`}
    >
      <p className="font-bold uppercase absolute top-1 right-1">
        id: {reserv.id}
      </p>
      <p>serviço: {reserv.service}</p>
      {moment().format("DD MM") === moment(reserv.dateTime).format("DD MM") ? (
        <p>data: Hoje às {moment(reserv.dateTime).format("HH:mm")}</p>
      ) : (
        <p>
          data: {moment(reserv.dateTime).format("DD/MM")} às{" "}
          {moment(reserv.dateTime).format("HH:mm")}
        </p>
      )}
      <Stamp status={reserv.status} />
    </div>
  );
}
