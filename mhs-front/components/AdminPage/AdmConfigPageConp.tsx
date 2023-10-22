"use client";

import { useEffect, useState } from "react";
import { InputComponents } from "../common/InputComponents";
import { InpEvent } from "@/interfaces";
import axios from "axios";
import { CommonLinkIcons } from "../common/CommonButons";

export default function AdmConfigPageConp({ userId }: { userId: string }) {
  const [formData, setFormData] = useState({
    newName: "",
    newPhoneNumber: "",
    currentPassword: "",
    newPassword: "",
    newPasswordAgain: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  function getData(e: InpEvent) {
    setFormData((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  }

  function saveData() {}

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/getuser/${userId}`)
      .then((res) => console.log(res.data));
  }, []);

  return (
    <div className="w-full h-full grid place-items-center place-content-center">
      <CommonLinkIcons.BackArrowLink
        link={`/${userId}/admin`}
        coordXY="top-1 left-1"
        position="fixed"
      />

      <div className=" gap-x-3">
        <div>
          <p className="InpTitleLabel">nome</p>
          <InputComponents.TextInp
            getData={getData}
            name="name"
            placeholder="Nome ou Apelido"
            value={formData.newName}
          />
        </div>

        {/* =========== input do telefone =========== */}
        <div>
          <p className="InpTitleLabel">telefone</p>

          <InputComponents.PhoneNUmberInp
            getData={getData}
            name="phoneNumber"
            value={formData.newPhoneNumber}
          />
        </div>

        {/* =========== input da senha atual =========== */}
        <div className="hidden">
          <div>
            <p className="InpTitleLabel">senha atual</p>
            <InputComponents.PaswordInp
              getData={getData}
              name="password"
              value={formData.newPassword}
            />
          </div>

          {/* =========== input da nova senha =========== */}
          <div>
            <p className="InpTitleLabel">nova senha</p>
            <InputComponents.PaswordInp
              getData={getData}
              name="password"
              value={formData.newPassword}
            />
          </div>

          {/* =========== input de confirmar a nova senha =========== */}
          <div>
            <p className="InpTitleLabel">confirmar a nova senha</p>
            <InputComponents.PaswordInp
              getData={getData}
              name="passwordAgain"
              value={formData.newPasswordAgain}
            />
          </div>
        </div>

        {/* =========== btn de ação =========== */}
        <div className="w-full flex flex-col gap-2">
          <p className="text-red-500 text-md">{errorMessage}</p>
          <button
            onClick={saveData}
            className="bg-emerald-400 hover:bg-emerald-500 w-full py-2 text-white font-bold rounded capitalize transition"
          >
            editar dados
          </button>
        </div>
      </div>
    </div>
  );
}
