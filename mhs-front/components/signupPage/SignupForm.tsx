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

interface VerifiesFormProps {
  condition: boolean;
  msg: string;
}

export default function SignupForm({}: {}) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    password: "",
    passwordAgain: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  function getData(e: InpEvent) {
    setFormData((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  }

  function verifiesForm() {
    const inputs = Object.keys(formData);
    const steps: VerifiesFormProps[] = [
      {
        condition: inputs.every((i) => formData[i].length > 0),
        msg: "preencha todos os campos",
      },
      {
        condition: formData.password === formData.passwordAgain,
        msg: "senhas incompativeis",
      },
      {
        condition: formData.phoneNumber.length === 13,
        msg: "formato de telefone invalido",
      },
    ];
    const indexOfInvalidInp = steps.findIndex((i) => i.condition === false);
    return steps[indexOfInvalidInp];
  }

  function signUp() {
    const invalidInp = verifiesForm();
    setErrorMessage("");

    if (invalidInp) {
      setErrorMessage(invalidInp.msg);
    } else {
      return axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/createuser`, formData)
        .then((res) => router.push(`${res.data.userId}/reservar`))
        .catch((error) => {
          console.log(error);

          setErrorMessage(error?.response?.data);
        });
    }
  }
  // ===========================================

  return (
    <div className="w-full h-full grid gap-5 capitalize place-content-center place-items-center ">
      {/* =========== input do nome =========== */}
      <div className="grid grid-cols-2 grid-rows-3 place-items-center gap-x-3 tablet-sm:flex tablet-sm:flex-col tablet-sm:items-center mobile:flex mobile:flex-col mobile:items-center">
        <div>
          <p className="InpTitleLabel">nome</p>
          <CommonComponents.TextInp
            getData={getData}
            name="name"
            placeholder="Nome ou Apelido"
            value={formData.name}
          />
        </div>

        {/* =========== input do telefone =========== */}
        <div>
          <p className="InpTitleLabel">telefone</p>

          <CommonComponents.PhoneNUmberInp
            getData={getData}
            name="phoneNumber"
            placeholder="81 91234-5678"
            value={formData.phoneNumber}
          />
        </div>

        {/* =========== input da senha =========== */}
        <div>
          <p className="InpTitleLabel">senha</p>
          <CommonComponents.PaswordInp
            getData={getData}
            name="password"
            placeholder="Senha"
            value={formData.password}
          />
        </div>

        {/* =========== input de confirmar senha =========== */}
        <div>
          <p className="InpTitleLabel">confirmar senha</p>
          <CommonComponents.PaswordInp
            getData={getData}
            name="passwordAgain"
            placeholder="Confirmar Senha"
            value={formData.passwordAgain}
          />
        </div>

        {/* =========== input do nome =========== */}
        <div className="w-full flex flex-col gap-2">
          <p className="text-red-500 text-md">{errorMessage}</p>
          <button
            onClick={signUp}
            className="bg-emerald-400 hover:bg-emerald-500 w-full py-2 text-white font-bold rounded capitalize transition"
          >
            cadastrar
          </button>
          <Link
            href={"entrar"}
            className="hover:text-amber-500 transition w-fit ml-2 "
          >
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}
