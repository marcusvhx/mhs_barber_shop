import { useState } from "react";

import axios from "axios";

import { CommonComponents } from "../common/CommonComponents";
import {
  SelectedReservProps,
  ReservFormProps,
  SetBool,
  SetReservsList,
} from "@/interfaces";

import Calendar from "../makeReserv/components/Calendar";
import InpHours from "../inputs/inpHours";
import ServicesInp from "../inputs/ServicesInp";

export default function EditPopUp({
  toggle,
  setToggle,
  selectedReserv,
  setReservs,
  reloadReservsList,
}: {
  toggle: boolean;
  setToggle: SetBool;
  selectedReserv: SelectedReservProps;
  setReservs: SetReservsList;
  reloadReservsList: () => void;
}) {
  const [reservData, setReservData] = useState<ReservFormProps>({
    dateTime: selectedReserv.dateTime,
    service: selectedReserv.service,
  });

  const [formSection, setFormSection] = useState(0);
  const formAreas = ["#service", "#dateTime"];
  const maxSection = formAreas.length - 1;

  function scrollForm(direction: "back" | "next") {
    if (formSection > 0) {
      direction === "back" && setFormSection((old) => old - 1);
    }
    if (formSection < maxSection) {
      direction === "next" && setFormSection((old) => old + 1);
    }
  }

  function editReserv() {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/editreserv/${selectedReserv.id}`,
        { ...reservData }
      )
      .then((res) => {
        setReservs((old) => {
          const reservIndex = old.findIndex((i) => i.id === selectedReserv.id);
          const oldList = old;
          oldList[reservIndex] = res.data;
          return oldList;
        });
      })
      .catch(() =>
        alert("ocorreu um erro interno, tente novamente mais tarde")
      );
      
    reloadReservsList();
  }
  return (
    <CommonComponents.Wrapper toggle={toggle} setToggle={setToggle}>
      <div className="w-10/12 min-w-[320px] h-fit p-2 rounded flex flex-col items-center gap-5 bg-white">
        <div className="w-full flex items-center overflow-hidden gap-2 scroll-smooth">
          <div className="min-w-full grid place-items-center" id="service">
            <ServicesInp
              edit
              setReservData={setReservData}
              reservData={reservData}
            />
          </div>

          <div className="min-w-full grid place-items-center" id="dateTime">
            <Calendar
              setReservData={setReservData}
              calendarToggleHandler={() => {}}
            />

            <InpHours reservData={reservData} setReservData={setReservData} />
          </div>
        </div>
        <div className="flex gap-2">
          <a
            onClick={() => scrollForm("back")}
            href={formAreas[formSection]}
            className={`${
              formSection === 0 ? "hidden" : "grid"
            } w-28 py-2 rounded bg-sky-500 text-white text-xl text-center capitalize hover:font-bold hover:bg--600 transition-all`}
          >
            voltar
          </a>
          <a
            className={`${
              formSection === maxSection ? "hidden" : "grid"
            } w-28 py-2 rounded bg-sky-500 text-white text-xl text-center capitalize hover:font-bold hover:bg-sky-600 transition-all`}
            onClick={() => scrollForm("next")}
            href={formAreas[formSection]}
          >
            avançar
          </a>
          <button
            onClick={editReserv}
            className={`${
              formSection === maxSection ? "" : "hidden"
            } close close_aside w-28 py-2 rounded bg-emerald-500 text-white text-xl text-center capitalize hover:font-bold hover:bg-emerald-600 transition-all`}
          >
            editar
          </button>
        </div>
      </div>
    </CommonComponents.Wrapper>
  );
}
