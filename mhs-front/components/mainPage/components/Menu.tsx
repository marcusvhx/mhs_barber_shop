"use client";

import { useState } from "react";

export default function BSMenu() {
  const servicos = [
    {
      id: 0,
      title: "cabelo",
      items: [
        { name: "infantil", price: "R$ 20" },
        { name: "corte", price: "R$ 25" },
        { name: "escova", price: "R$ 30" },
        { name: "hidratação", price: "R$ 30" },
        { name: "coloração", price: "R$ 40" },
      ],
    },
    {
      id: 1,
      title: "barba",
      items: [
        { name: "aparo", price: "R$ 20" },
        { name: "corte", price: "R$ 25" },
        { name: "hidratação", price: "R$ 30" },
        { name: "coloração", price: "R$ 40" },
      ],
    },
  ];

  // scrolla o menu
  const [scroll, setScroll] = useState(1);
  function scrollMenu() {
    setScroll((old) => (old === 1 ? 0 : 1));

    const el = document.getElementById(`menuCard${scroll}`);
    el?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }
  return (
    <>
      <div className="BScardsContainer">
        {servicos.map((i) => (
          <div key={i.title} id={`menuCard${i.id}`} className="menuCard">
            <h1 className="w-4/5 text-yellow-400 mt-3 border-b-yellow-400 border-b-2 text-center text-3xl pb-2">
              {i.title}
            </h1>

            <table className="BScardItems">
              <tbody className="BStbody">
                {i.items.map((t) => (
                  <tr className="BSitem" key={t.name}>
                    <td className="h-min">{t.name}</td>

                    <td className="itemDiv">•</td>

                    <td>{t.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* ====== setas pro scroll do mobile ====== */}
      {/* esquerdo */}
      <div
        onClick={scrollMenu}
        className={`${
          scroll === servicos.length - 1 ? "moblet:hidden" : "moblet:block"
        } BSbtnArrowLeft hidden`}
      ></div>

      {/* direito */}
      <div
        onClick={scrollMenu}
        className={`${
          scroll === 0 ? "moblet:hidden" : "moblet:block"
        } BSbtnArrowRigth hidden`}
      ></div>
    </>
  );
}
