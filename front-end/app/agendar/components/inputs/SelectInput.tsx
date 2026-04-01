"use client";

import { MouseEvent, useState } from "react";
import { twMerge } from "tailwind-merge";
import TextInput from "./TextInput";
import { IAppointmentData } from "../../types";
import { useFormContext } from "react-hook-form";

export default function SelectInput({
  placeholder,
  options,
  name,
  listClassName,
  disabled,
}: {
  placeholder: string;
  options: string[];
  name: keyof IAppointmentData;
  listClassName?: string;
  disabled?: boolean;
}) {
  const [inputStatus, setInputStatus] = useState<"close" | "open" | "loading">(
    "close",
  );
  const { setValue } = useFormContext<IAppointmentData>();

  const inputStatushandler = () => {
    setInputStatus((old) => (old == "close" ? "open" : "close"));
  };

  const setNewValue = (e: MouseEvent<HTMLLIElement>) => {
    setValue(name, e.currentTarget.innerText);
    setInputStatus("close");
  };

  const inputOptionHeight = `h-[${38 * (options.length + 2)}px]`;
  return (
    <div
      onMouseLeave={() => setInputStatus("close")}
      data-status={inputStatus}
      className={`w-80 h-fit relative cursor-pointer`}
    >
      {/* camada para interação com todo o input */}
      <div
        onClick={disabled ? undefined : inputStatushandler}
        className="size-full absolute z-2 top-0 left-0 rounded-full"
      />
      <TextInput
        name={name as keyof IAppointmentData}
        disabled
        placeholder={placeholder}
      />

      {/* seta do input (aberto/fechado)  */}
      <div
        data-status={inputStatus}
        className={`
          size-3 
          absolute right-4 top-3 data-[status=open]:top-3.5
          border-b-4 border-r-4 border-background
          rotate-45 data-[status=open]:-rotate-135 transition-all
          `}
      />

      {/* lista das opções */}
      <ul
        data-status={inputStatus}
        className={twMerge(
          `
          flex flex-col items-center
          w-full  ${inputOptionHeight} data-[status=close]:h-0 max-h-40 overflow-hidden overflow-y-auto
          p-2 data-[status=close]:p-0
          absolute top-full left-0
          transition-all
          bg-foreground 
          rounded-lg
          z-3`,
          listClassName,
        )}
      >
        {options.map((option, idx) => (
          <li
            key={option + idx}
            onClick={setNewValue}
            className={`
            w-full h-8 py-1 
            hover:bg-neutral-300 cursor-pointer transition-colors
            text-background text-center first-letter:uppercase
            border-b border-b-neutral-400
            `}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
