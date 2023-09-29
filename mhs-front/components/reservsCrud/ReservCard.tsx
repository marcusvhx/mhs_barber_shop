import moment from "moment";
import { ReservProps, SelectedReservProps } from "./ReservsCrud";
import { Dispatch, SetStateAction } from "react";

export default function ReservCard({
  reserv,
  setSelectedReserv,

  setWrapperToggle,
}: {
  reserv: ReservProps;
  setSelectedReserv: Dispatch<SetStateAction<SelectedReservProps>>;

  setWrapperToggle: Dispatch<SetStateAction<boolean>>;
}) {
  function setData() {
    setSelectedReserv(() => reserv);
    setWrapperToggle((old) => !old)
  }
  return (
    <div
      onClick={setData}
      className="reservCard min-w-[185px] w-fit h-fit rounded bg-gradient-to-tl from-neutral-300 from-5% via-neutral-100 to-neutral-200 to-95% p-2 hover:bg-black hover:bg-opacity-20 cursor-pointer hover:bg-none transition-all relative border-2 border-gray-500"
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
    </div>
  );
}
