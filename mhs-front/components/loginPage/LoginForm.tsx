"use client";
import "../styles.css";
import {
  CommonComponents,
  InpEvent,
} from "@/components/makeReserv/components/common/CommonComponents";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm({}: {}) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  function getData(e: InpEvent) {
    setFormData((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  }

  function verifiesForm() {
    const inputs = Object.keys(formData);
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
      setErrorMsg(verifiesForm().msg);
    } else {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/login`, formData)
        .then((res) => router.push(`${res.data.userId}/reservar`))
        .catch((err) => setErrorMsg(err?.response?.data));
    }
  }

  return (
    <div className="w-full h-full grid place-content-center gap-3 capitalize">
      {/* =========== input do nome =========== */}
      <div>
        <p className="InpTitleLabel">telefone</p>
        <CommonComponents.PhoneNUmberInp
          getData={getData}
          name="phoneNumber"
          placeholder="Seu Numero"
          value={formData.phoneNumber}
        />
      </div>

      {/* =========== input do telefone =========== */}
      <div>
        <p className="InpTitleLabel">telefone</p>
        <CommonComponents.PaswordInp
          getData={getData}
          name="password"
          placeholder="(81) 91234-5678"
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
      <Link
        href={"cadastrar"}
        className="hover:text-amber-500 transition w-fit"
      >
        fazer cadastro
      </Link>
    </div>
  );
}
