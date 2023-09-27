import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import InputMask from "react-input-mask";

export type SetBool = Dispatch<SetStateAction<boolean>>;
export type InpEvent = ChangeEvent<HTMLInputElement>;

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
  w-screen h-screen place-items-center fixed top-0 left-0 overflow-hidden transition-all bg-black bg-opacity-60`}
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
  placeholder,
}: {
  name: string;
  value: string;
  getData: (e: InpEvent) => void;
  placeholder: string;
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
        placeholder={placeholder}
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
  placeholder,
}: {
  name: string;
  value: string;
  getData: (e: InpEvent) => void;
  placeholder: string;
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
      placeholder={placeholder}
      maskChar={null}
    />
  );
}

export const CommonComponents = {
  Wrapper,
  TextInp,
  NumberInp,
  PhoneNUmberInp,
  PaswordInp,
};
