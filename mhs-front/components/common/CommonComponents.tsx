import "./styles.css";
import { Close } from "@mui/icons-material";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { SetBool } from "@/interfaces";

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
/**
 ** loadMsg = mensagem que aparece na tela de carregamento
 ** apiUrl = ramo da api com os dados desejados
 ** setSomething = variavel que vai receber os dados da api
 */
function LoadPage({
  children,
  setSomething,
  loadMsg,
  apiUrl,
}: {
  children: React.ReactNode;
  setSomething: Dispatch<SetStateAction<any>>;
  loadMsg: string;
  apiUrl: string;
}) {
  const [spinToggle, setSpinToggle] = useState(true);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/${apiUrl}`)
      .then((res) => {
        setSomething(() => res.data);
        setSpinToggle(() => false);
      })
      .catch(() => alert("ocorreu um erro interno,tente novamente mais tarde"));
  }, []);

  return spinToggle ? (
    <div className="h-full w-full grid place-items-center place-content-center gap-3">
      <svg className="animate-spin h-16 w-16 border-r-black border-slate-200 border-8 rounded-full" />
      <p className="text-xl text-neutral-500 capitalize">{loadMsg}</p>
    </div>
  ) : (
    children
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

export const CommonComponents = {
  Wrapper,
  X,
  MoreOptsBtn,
  LoadPage,
};
