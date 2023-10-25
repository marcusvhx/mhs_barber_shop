import { InputComponents } from "@/components/common/InputComponents";
import EditDataBtn from "./EditDataBtn";
import { useState } from "react";
import axios from "axios";
import { InpEvent } from "@/interfaces";

export default function EditPasswordComp({ userId }: { userId: string }) {
  const [formData, setFormData] = useState({
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

  function changePassword() {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/editpassword/${userId}`,
        formData
      )
      .then(() => {
        setErrorMessage("");

        alert("Senha alterada.");

        const formDataKeys = Object.keys(formData);

        formDataKeys.map((key) =>
          setFormData((old) => ({
            ...old,
            [key]: "",
          }))
        );
      })
      .catch((err) => {
        setErrorMessage("");
        setErrorMessage(err.response.data);
      });
  }

  return (
    <div
      
      className="h-full w-full grid place-items-center place-content-center relative"
    >
      <h1 className="uppercase font-bold text-xl absolute top-10 left-1/2 -translate-x-1/2">
        senha
      </h1>
      <div className="grid gap-y-5">
        <div>
          <p className="InpTitleLabel">senha atual</p>
          <InputComponents.PaswordInp
            getData={getData}
            name="currentPassword"
            value={formData.currentPassword}
          />
        </div>

        {/* =========== input do telefone =========== */}
        <div>
          <p className="InpTitleLabel">nova senha</p>

          <InputComponents.PaswordInp
            getData={getData}
            name="newPassword"
            value={formData.newPassword}
            placeholder="Nova Senha"
          />
        </div>

        <div>
          <p className="InpTitleLabel">nova senha novamente</p>

          <InputComponents.PaswordInp
            getData={getData}
            name="newPasswordAgain"
            value={formData.newPasswordAgain}
            placeholder="Nova Senha Novamente"
          />
        </div>

        {/* =========== btn de ação =========== */}
        <div
          className={`${
            formData.newPassword === formData.newPasswordAgain &&
            formData.newPassword
              ? ""
              : "hidden"
          }`}
        >
          <EditDataBtn
            errorMessage={errorMessage}
            saveDataFunc={changePassword}
          />
        </div>
      </div>
    </div>
  );
}
