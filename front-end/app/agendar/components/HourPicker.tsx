import SelectInput from "./inputs/SelectInput";
import { IAppointmentData } from "../types";
import { useFormContext } from "react-hook-form";

const getHours = () => {
  const MIN_HOURS = 8;
  const MAX_HOURS = 20;
  const hours = [];

  for (let time = MIN_HOURS; time <= MAX_HOURS; time += 0.5) {
    const half = (time / 2).toString();
    const isHalfHour = half.at(3) == "5"; // 4.5 = 09:00 | 4.75 = 09:30 | 5.25 = 10:30

    const newHours =
      (time < 10 ? "0" : "") + //adiciona o 0 na frente de horas menores que 10
      Math.floor(time) + // pega a parte inteira do número, 10:30 ainda são 10 horas
      ":" +
      (isHalfHour ? "30" : "00"); // minutos

    hours.push(newHours);
  }
  return hours;
};

export default function HourPicker({}: {}) {
  const hours = getHours();
  const { register } = useFormContext<IAppointmentData>();
  const hasDate = !!register("date");
  return (
    <SelectInput
      name="time"
      disabled={!hasDate}
      listClassName="max-h-50 overflow-y-scroll"
      options={hours}
      placeholder={
        hasDate ? "Veja horários disponíveis" : "Selecione uma data primeiro"
      }
    />
  );
}
