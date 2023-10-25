import { InputComponents } from "@/components/common/InputComponents";
import EditDataBtn from "./EditDataBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import { InpEvent } from "@/interfaces";

export default function EditPersonalData({ userId }: { userId: string }) {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    oldPhoneNumber: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  function getData(e: InpEvent) {
    setFormData((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  }

  function saveData() {
    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/edituser/${userId}`, formData)
      .then(() => {
        alert("Dados alterados.");

        setErrorMessage("");
      })
      .catch((err) => {
        setErrorMessage("");
        setErrorMessage(err.response.data);
      });
  }

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/getuser/${userId}`)
      .then((res) => {
        const userDataKeys = Object.keys(res.data);

        userDataKeys.map((key) => {
          //
          setFormData((old) => ({
            ...old,
            [key]: res.data[key],
          }));
        });

        setFormData((old) => ({
          ...old,
          oldPhoneNumber: old.phoneNumber,
        }));
        //
      })
      .catch((err) => {
        alert(
          "Ocorreu um erro interno, recarregue a pagina. Se o erro perssitir tente novamente mais tarde"
        );
        console.log(err);
      });
    //
  }, []);

  return (
    <div className="h-full w-full grid place-items-center place-content-center relative">
      <h1 className="uppercase w-fit whitespace-nowrap font-bold text-xl absolute top-10 left-1/2 -translate-x-1/2">
        dados pessoais
      </h1>
      <div className="grid gap-y-5">
        <div>
          <p className="InpTitleLabel">nome</p>
          <InputComponents.TextInp
            getData={getData}
            name="name"
            placeholder="Nome ou Apelido"
            value={formData.name}
          />
        </div>

        {/* =========== input do telefone =========== */}
        <div>
          <p className="InpTitleLabel">telefone</p>

          <InputComponents.PhoneNUmberInp
            getData={getData}
            name="phoneNumber"
            value={formData.phoneNumber}
          />
        </div>

        <div
          className={`${
            formData.oldPhoneNumber !== formData.phoneNumber ? "h-20" : "h-0"
          } overflow-hidden transition-all `}
        >
          <p className="InpTitleLabel">senha</p>

          <InputComponents.PaswordInp
            getData={getData}
            name="password"
            value={formData.password}
          />
        </div>

        {/* =========== btn de ação =========== */}
        <EditDataBtn errorMessage={errorMessage} saveDataFunc={saveData} />
      </div>
    </div>
  );
}
