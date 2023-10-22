import "./styles.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { SetBool } from "@/interfaces";

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

  reload,
}: {
  children: React.ReactNode;
  setSomething: Dispatch<SetStateAction<any>>;

  loadMsg: string;
  apiUrl: string;

  reload: boolean;
}) {
  const [spinToggle, setSpinToggle] = useState(true);

  async function loadData() {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${apiUrl}`
    );

    setSomething(() => data);
    setSpinToggle(() => false);
  }

  useEffect(() => {
    setSpinToggle(() => true);
    
    loadData();
  }, [reload]);

  return spinToggle ? (
    <div className="h-full w-full grid place-items-center place-content-center gap-3">
      <svg className="animate-spin h-16 w-16 border-r-black border-slate-200 border-8 rounded-full" />
      <p className="text-xl text-neutral-500 capitalize">{loadMsg}</p>
    </div>
  ) : (
    children
  );
}

export const CommonComponents = {
  Wrapper,
  LoadPage,
};
