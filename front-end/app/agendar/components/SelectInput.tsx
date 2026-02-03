"use client";

import { MouseEvent, useRef, useState } from "react";

export default function SelectInput({
  placeholder,
  options,
  icon,
}: {
  options: string[];
  placeholder: string;
  icon?: string;
}) {
  const inpValueRef = useRef<HTMLInputElement>(null);
  const [inputStatus, setInputStatus] = useState<"close" | "open" | "loading">(
    "close",
  );
  const inputStatushandler = () => {
    setInputStatus((old) => (old == "close" ? "open" : "close"));
  };

  const getValue = (e: MouseEvent<HTMLLIElement>) => {
    inpValueRef.current!.value = e.currentTarget.innerText;
    setInputStatus("close");
  };

  const inputOptionHeight = `h-[${38 * (options.length+2)}px]`;
  return (
    <div
      onMouseLeave={() => setInputStatus("close")}
      data-status={inputStatus}
      className={`w-full max-w-80 relative`}
      >
      {/* camada para interação com todo o input */}
      <div
      onClick={inputStatushandler}
        className="size-full absolute z-2 top-0 left-0 rounded-full"
      />
      <input
        ref={inpValueRef}
        type="text"
        disabled
        className={`
          w-full py-2 px-4
          bg-foreground
          text-background
          rounded-full
          outline-0
          `}
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
        className={`
            flex flex-col items-center
            w-full  ${inputOptionHeight} data-[status=close]:h-0  overflow-hidden
            p-2 data-[status=close]:p-0
            absolute top-[calc(100%)] left-0
            transition-all
            bg-foreground 
            rounded-lg
            z-3`}
      >
        {options.map((option, idx) => (
          <li
            key={option + idx}
            onClick={getValue}
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
