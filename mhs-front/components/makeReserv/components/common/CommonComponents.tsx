import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Close } from "@mui/icons-material";
import InputMask from "react-input-mask";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export type SetBool = Dispatch<SetStateAction<boolean>>;
export type InpEvent = ChangeEvent<HTMLInputElement>;

function X({ func, className }: { func?: () => void; className?: string }) {
  return (
    <div className="relative w-full h-full">
      <div
        onClick={func && func}
        className={`${
          className && className
        } absolute w-full h-full hover:bg-black hover:bg-opacity-10 rounded-full transition cursor-pointer`}
      ></div>
      <Close sx={{ fontSize: "35px" }} />
    </div>
  );
}

function Wrapper({
  toggle,
  setToggle,
  children,
}: {
  toggle: boolean;
  setToggle: SetBool;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={(e: any) => {
        if (e.target.className.includes("close")) setToggle((old) => !old);
      }}
      className={`close
  ${toggle ? "grid" : "hidden"}
  w-full h-full place-items-center fixed top-0 left-0 overflow-hidden transition-all bg-black bg-opacity-60`}
    >
      {children}
    </div>
  );
}

function TextInp({
  name,
  value,
  getData,
  placeholder,
}: {
  name: string;
  value: string;
  getData: (e: InpEvent) => void;
  placeholder: string;
}) {
  return (
    <input
      value={value}
      onChange={getData}
      className={`formInp`}
      type="text"
      name={name}
      placeholder={placeholder}
    />
  );
}

function PaswordInp({
  name,
  value,
  getData,
}: {
  name: string;
  value: string;
  getData: (e: InpEvent) => void;
}) {
  const [showPassword, setshowPassword] = useState(false);

  function handleVisibility() {
    setshowPassword((old) => !old);
  }
  return (
    <div className="grid grid-cols-7 place-items-center rounded border-b-2 w-[260px] border-neutral-500 bg-neutral-100">
      <input
        value={value}
        onChange={getData}
        className={`bg-transparent outline-none h-10 pl-2 w-full col-span-6`}
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={showPassword ? "Senha" : "*****"}
      />
      <div className="relative grid place-items-center w-full h-full">
        <div className="kase cursor-pointer" onClick={handleVisibility}></div>
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </div>
    </div>
  );
}

function NumberInp({
  name,
  value,
  getData,
  placeholder,
}: {
  name: string;
  value: string;
  getData: (e: InpEvent) => void;
  placeholder: string;
}) {
  return (
    <input
      value={value}
      onChange={getData}
      className={`formInp`}
      type="text"
      inputMode="numeric"
      name={name}
      placeholder={placeholder}
    />
  );
}

function PhoneNUmberInp({
  name,
  value,
  getData,
}: {
  name: string;
  value: string;
  getData: (e: InpEvent) => void;
}) {
  return (
    <InputMask
      mask={`99 99999-9999`}
      value={value}
      onChange={getData}
      className={`formInp`}
      type="text"
      inputMode="numeric"
      name={name}
      placeholder="81 91234-5678"
      maskChar={null}
    />
  );
}

function MoreOptsBtn({
  children,
  standing,
  className,
  type,
  func,
}: {
  children?: React.ReactNode;
  standing?: boolean;
  type: "lines" | "dots";
  className?: string;
  func: (e?) => void;
}) {
  // três pontinhos, é uma tag pai
  return (
    <div onClick={func} className={`${className || ""} relative`}>
      <div
        tabIndex={0}
        className={`${standing ? "flex-col" : ""} ${
          type === "dots" ? "w-10 gap-1 " : "w-10  p-1 flex-col gap-1"
        } flex justify-center items-center cursor-pointer h-8`}
      >
        <div className="absolute w-full h-full hover:bg-black hover:bg-opacity-10 rounded transition"></div>
        <div
          className={`h-1 ${
            type === "dots" ? "w-1" : "w-full"
          } bg-black  rounded-full`}
        ></div>
        <div
          className={`h-1 ${
            type === "dots" ? "w-1" : "w-full"
          } bg-black rounded-full`}
        ></div>
        <div
          className={`h-1 ${
            type === "dots" ? "w-1" : "w-full"
          } bg-black rounded-full`}
        ></div>
      </div>
      {children}
    </div>
  );
}

export const InputComponents = {
  TextInp,
  NumberInp,
  PhoneNUmberInp,
  PaswordInp,
};
export const CommonComponents = {
  Wrapper,
  MoreOptsBtn,
  X,
};
