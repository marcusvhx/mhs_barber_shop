import { ReservTime, SetBool, SetReservFormProps } from "@/interfaces";
import moment from "moment";

export default function HoursList({
  availableHours,
  setReservData,
  setFilterToggle,
}: {
  setFilterToggle: SetBool;
  availableHours: ReservTime[];
  setReservData: SetReservFormProps;
}) {
  function setTimeOfReserv(reservTime: ReservTime) {    
    if (reservTime.available) {
      setReservData((old) => ({ ...old, dateTime: reservTime.number }));
      setFilterToggle(() => false);
    }    
  }

  return (
    <div className="w-full grid text-center p-1 bg-neutral-100">
      {availableHours.length > 0 ? (
        availableHours.map((i) => (
          <div
            onClick={() => setTimeOfReserv(i)}
            key={i.number}
            className={`${
              i.available ? "cursor-pointer open_list" : "hidden"
            } hover:bg-neutral-200`}
          >
            {moment(i.number).format("HH : mm")}
          </div>
        ))
      ) : (
        <p className="text-lg text-zinc-500">não há vagas disponíveis</p>
      )}
    </div>
  );
}
