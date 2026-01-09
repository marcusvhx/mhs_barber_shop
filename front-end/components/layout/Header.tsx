"use client";
import Image from "next/image";
import logomarca from "@/public/svg/logomarca.svg";
import { useState } from "react";

const links = [
  {
    name: "serviços",
    href: "#services",
  },
  {
    name: "equipe",
    href: "#employees",
  },
  {
    name: "galeria",
    href: "#portfolio",
  },
  {
    name: "contato",
    href: "#contact",
  },
];

export default function Header({}: {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchable, setIsTouchable] = useState(false);

  const handleWrapper = (classname: string) => {
    if (classname.includes("handleSidebar")) {
      if (isVisible) {
        // se estiver aberto
        setIsVisible((old) => !old); // torna invisivel
        setTimeout(() => {
          setIsTouchable((old) => !old); // depois de 80ms torna "inexistente"
        }, 80);
      } else {
        // se estiver fechado
        setIsTouchable((old) => !old); // torna "existente"
        setTimeout(() => {
          setIsVisible((old) => !old); // depois de 100ms torna visivel
        }, 100);
      }
    }
  };
  return (
    <header
      //@ts-ignore
      onClick={(e) => handleWrapper(e.target.className)}
      className="w-full flex justify-between items-center bg-background sticky top-0 p-1 px-2 z-5 md:border-b-2 md:border-primary"
    >
      <Image src={logomarca} className="size-10" alt="logo" />
      {/* botão hamburuer -> abre a sidebar */}
      <div className="relative flex flex-col gap-1.5 sm:hidden">
        <div className="size-full absolute top-0 left-0 handleSidebar z-1 " />

        <div className="rounded-full w-8 h-1 bg-white" />
        <div className="rounded-full w-8 h-1 bg-white" />
        <div className="rounded-full w-8 h-1 bg-white" />
      </div>
      {/* wrapper da sidebar */}
      <div
        data-visible={isVisible}
        data-touchable={isTouchable}
        className="handleSidebar data-[touchable=false]:hidden fixed sm:hidden data-[visible=false]:opacity-0 opacity-100 transition-all flex justify-end z-2 w-dvw h-dvh top-0 left-0 bg-black/30"
      >
        <div
          data-visible={isVisible}
          //   data-touchable={isTouchable}
          className="h-full w-50 data-[visible=false]:w-0 transition-all overflow-hidden pt-4 bg-background flex flex-col"
        >
          {links.map(({ href, name }, idx) => (
            <a
              key={name + idx}
              href={href}
              data-is-last={idx == links.length - 1}
              className="handleSidebar text-lg w-full py-3 text-center first-letter:uppercase"
            >
              {name}
            </a>
          ))}
        </div>
      </div>

      {/* links desktop */}
      <div className="sm:flex hidden h-full w-fit items-center gap-8 md:gap-10">
        {links.map(({ href, name }, idx) => (
          <a className="capitalize hover:text-primary cursor-pointer " key={name + idx} href={href}>{name}</a>
        ))}
      </div>
    </header>
  );
}
