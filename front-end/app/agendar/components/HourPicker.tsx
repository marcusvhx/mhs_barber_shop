import { Dispatch, SetStateAction } from "react";
import SelectInput from "./inputs/SelectInput";

const getHours = () => {
  const MIN_HOURS = 8;
  const MAX_HOURS = 20;
  const hours = [];
  for (let time = MIN_HOURS; time <= MAX_HOURS; time += 0.5) {
    const half = (time / 2).toString();
    const isHalfHour = half.at(3) == "5"; // 4.5 = 09:00 | 4.75 = 09:30 | 5.25 = 10:30
    const newHours = `${Math.floor(time)}:${isHalfHour ? "30" : "00"}`;
    hours.push(newHours);
  }
  return hours;
};

export default function HourPicker({setTime, saveDateTine}:{setTime: Dispatch<SetStateAction<Date>>; saveDateTine:()=> void}) {
  const hours = getHours();
  const getSelectedHours = (name: string, value: string) => {
    const [hour, minute] = value.split(":").map(Number);
    const selectedTime = new Date();
    selectedTime.setHours(hour, minute, 0, 0);
    setTime(selectedTime);
    saveDateTine();
  }
  return (
    <div data-is-enable className="w-full h-0 data-[is-enable=true]:h-auto ">
      <SelectInput saveInputValue={getSelectedHours} inputName="hours" listClassName="max-h-50 overflow-y-scroll" options={hours}  placeholder="Veja horários disponíveis" />
    </div>
  );
}
