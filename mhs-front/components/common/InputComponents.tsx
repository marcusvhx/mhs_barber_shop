import "./styles.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputMask from "react-input-mask";
import { useState } from "react";
import { InpEvent } from "@/interfaces";

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

export const InputComponents = {
  TextInp,
  NumberInp,
  PhoneNUmberInp,
  PaswordInp,
};
