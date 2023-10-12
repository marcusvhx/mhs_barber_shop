import moment from "moment";
import { useState } from "react";
import InpHours from "./inpHours";
import { CommonComponents } from "../common/CommonComponents";
import Calendar from "../makeReserv/components/Calendar";
import { ReservFormProps, SetReservFormProps } from "@/interfaces";


export default function ReservDateInp({
  reservData,
  setReservData,
}: {
  reservData: ReservFormProps;
  setReservData: SetReservFormProps;
}) {
  const [calendarToggle, setCalendarToggle] = useState(false);

  function calendarToggleHandler() {
    setCalendarToggle((old) => !old);
  }



  return (
    <>
      <div className="formContainer relative" id="dateTime">
        {/* =========== input da data=========== */}
        <div>
          <h1 className="InpTitleLabel">Data</h1>
          {/* =========== display da data =========== */}
          <div
            onClick={calendarToggleHandler}
            className={`formInp text-2xl grid place-items-center cursor-pointer`}
          >
            {moment(reservData.dateTime).format("DD/MM")}
          </div>
        </div>

        {/* =========== input do horario =========== */}
        <InpHours
          reservData={reservData}
          setReservData={setReservData}
        />
      </div>

      <CommonComponents.Wrapper
        toggle={calendarToggle}
        setToggle={setCalendarToggle}
      >
        {/* =========== calendario =========== */}
        <div className="px-8 py-2 rounded bg-white">
          <Calendar
            calendarToggleHandler={calendarToggleHandler}
            setReservData={setReservData}
          />
        </div>
      </CommonComponents.Wrapper>
    </>
  );
}
