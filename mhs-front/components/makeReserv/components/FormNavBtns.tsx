import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ReservFormProps } from "../MakeReserv";

export default function FormNavBtns({
  userId,
  reservData,
}: {
  reservData: ReservFormProps;
  userId: string;
}) {
  const router = useRouter();
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

  function makeReserv() {
    const reservDataKeys = Object.keys(reservData);
    if (reservDataKeys.every((i) => reservData[i].length > 0)) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/createreserv/${userId}`,
          reservData
        )
        .then(() => router.push(`/${userId}/reservas`))
        .catch((err) => console.log(err));
    }
    
  }
  return (
    <div className=" capitalize flex flex-wrap items-center gap-2 text-2xl text-white">
      <a
        onClick={() => scrollForm("back")}
        href={formAreas[formSection]}
        className={`${
          formSection === 0 ? "hidden" : "grid"
        } h-12 w-28 rounded bg-sky-400  place-items-center`}
      >
        voltar
      </a>
      <a
        className={`${
          formSection === maxSection ? "hidden" : "grid"
        } h-12 w-28 rounded bg-sky-400  place-items-center`}
        onClick={() => scrollForm("next")}
        href={formAreas[formSection]}
      >
        avançar
      </a>
      <button
        className={`${
          formSection === maxSection ? "" : "hidden"
        } py-2 px-3 rounded bg-emerald-500`}
        onClick={makeReserv}
        // href={"/"}
      >
        finalizar
      </button>
    </div>
  );
}
