"use client";
import "../styles.css";
import {
  InpEvent,
  InputComponents,
} from "@/components/makeReserv/components/common/CommonComponents";
import axios from "axios";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm({}: {}) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    keepIn: true,
  });
  const [errorMsg, setErrorMsg] = useState("");

  function getData(e: InpEvent) {
    setFormData((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  }

  function verifiesForm() {
    const inputs = Object.keys(formData).filter((i) => i !== "keepIn");
    const steps = [
      {
        condition: inputs.every((i) => formData[i].length > 0),
        msg: "preencha todos os campos",
      },
      {
        condition: formData.phoneNumber.length === 13,
        msg: "formato de telefone invalido",
      },
    ];
    const indexOfInvalidInp = steps.findIndex((i) => i.condition === false);
    return steps[indexOfInvalidInp];
  }

  function login() {
    setErrorMsg("");

    if (verifiesForm()) {
      setErrorMsg(() => verifiesForm().msg);
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/login`, formData)
        .then((res) => {
          formData.keepIn && setCookie("auth", res.data.token);
          router.push(`${res.data.userId}/reservar`);
        })
        .catch((err) => setErrorMsg(err?.response?.data));
    }
  }

  return (
    <div className="w-full h-full grid place-content-center gap-3 capitalize">
      {/* =========== input do nome =========== */}
      <div>
        <p className="InpTitleLabel">telefone</p>
        <InputComponents.PhoneNUmberInp
          getData={getData}
          name="phoneNumber"
          value={formData.phoneNumber}
        />
      </div>

      {/* =========== input da Senha=========== */}
      <div>
        <p className="InpTitleLabel">Senha</p>
        <InputComponents.PaswordInp
          getData={getData}
          name="password"
          value={formData.password}
        />
      </div>
      <p className="text-red-500 text-md">{errorMsg}</p>
      <button
        onClick={login}
        className="bg-emerald-400 hover:bg-emerald-500 py-2 text-white font-bold rounded capitalize transition"
      >
        entrar
      </button>
      <div className="flex items-center gap-2">
        <input
          checked={formData.keepIn}
          onChange={(e) =>
            setFormData((old) => ({
              ...old,
              keepIn: e.target.checked,
            }))
          }
          type="checkbox"
          id="keep_in"
        />
        <label htmlFor="keep_in">lembre-se de mim</label>
      </div>
      <Link
        href={"cadastrar"}
        className="hover:text-amber-500 transition w-fit"
      >
        fazer cadastro
      </Link>
    </div>
  );
}
