"use client";

import { useEffect, useState } from "react";

export default function WarnModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [counter, setCounter] = useState(3);

  const markAsKnown = () => {
    setIsModalOpen(false);
    document.cookie = "wasWarned=true";
  };

  useEffect(() => {
    if (counter <= 0) return;

    const reverseCounter = setInterval(() => {
      setCounter((old) => old - 1);
    }, 1000);
    return () => clearInterval(reverseCounter);
  }, [counter]);

  return (
    <div
      data-is-open={isModalOpen}
      className="toggle hidden data-[is-open=true]:grid place-items-center fixed top-0 left-0 z-10 h-dvh w-dvw bg-black/60"
    >
      <div
        className={`
        bg-background
        rounded-xl
        p-4
        w-full max-w-[90dvw] sm:max-w-sm h-fit
        flex flex-col items-center justify-center gap-4
        text-center
        `}
      >
        <p>
          Este é um site demonstrativo, as imagens de pessoas{" "}
          <b className="font-extrabold">não </b>
          são dos reais funcionários.
        </p>
        <p>
          O sistema de agendamento é funcional, mas{" "}
          <b className="font-extrabold">não </b>
          possui ligação com o sistema da empresa
        </p>
        <button
          onClick={markAsKnown}
          data-disabled={counter > 0}
          className={`data-[disabled=true]:bg-primary/60 data-[disabled=true]:cursor-not-allowed bg-primary  cursor-pointer rounded-full text-background p-2 px-3`}
        >
          Fechar {counter > 0 && `(${counter})`}
        </button>
      </div>
    </div>
  );
}
