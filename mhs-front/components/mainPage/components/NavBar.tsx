"use client";

import { useState } from "react";

export default function NavBar() {
  // mostra os links do header
  const [navToggle, setNavToggle] = useState(false);

  const handlerNavToggle = () => {
    setNavToggle((old) => !old);
  };
  return (
    <div className="flex items-center">
      <div
        onClick={handlerNavToggle}
        className={`${
          navToggle ? "mobile:h-full mobile:pt-8 tablet-sm:h-full tablet-sm:pt-8" : "mobile:h-0 tablet-sm:h-0"
        } navBarLinkContainer overflow-hidden top-0 right-0 flex items-center mobile:gap-0 gap-10 text-xl mobile:text-2xl text-center transition-all`}
      >
        <a className="BSlink mobile:w-full mobile:py-5 " href="#BSmenu">
          menu
        </a>
        <a
          className="BSlink mobile:w-full mobile:py-5 mobile:text-2xl text-center "
          href="#BShours"
        >
          horarios
        </a>
        <a
          className="BSlink mobile:w-full mobile:py-5 mobile:text-2xl text-center "
          href="#BSaddress"
        >
          endereço
        </a>
        <a
          className="BSlink mobile:w-full mobile:py-5 mobile:text-2xl text-center "
          href="#BSaddress"
        >
          contato
        </a>
      </div>

      <div
        onClick={handlerNavToggle}
        className="mobile:abolute w-10 h-8 top-1 right-2 z-20 flex flex-col justify-around"
      >
        <div className={`${navToggle ? "rotate-45 translate-y-4" : ""} BSline`}></div>
        <div className={`${navToggle ? "hidden" : ""} BSline`}></div>
        <div className={`${navToggle ? "-rotate-45" : ""} BSline`}></div>
      </div>
    </div>
  );
}
