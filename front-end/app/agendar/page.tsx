"use client";
import Section from "@/components/layout/Section";
import Image from "next/image";
import bg from "@/public/png/booking/bg_bookings.png";
import TextInput from "./components/inputs/TextInput";
import SelectInput from "./components/inputs/SelectInput";
import { inputsData } from "./components/inputs/inputsData";
import DateInput from "./components/inputs/DateInput";
import InputsContainer from "./components/inputsContainer";
import { useEffect, useState } from "react";
import { Get } from "../api/get";

export default function BookingPage() {
  const [formStage, setFormStage] = useState(0);
  
  const inputsLen = Object.keys(inputsData).length;
  const getFromApi = new Get()
  
  const handleFormStage =async () => {
    // setFormStage((old) => (old < inputsLen - 1 ? ++old : 0));
    console.log(await getFromApi.berbers())
    };
  
  return (
    <Section className="h-full gap-8 sm:flex">
      {/* background */}
      <Image
        src={bg}
        alt={"fundo da pagina"}
        className="size-full object-center object-cover fixed top-0 left-0 -z-1 blur-md brightness-70"
      />

      <h1 className="px-2 text-center text-xl sm:text-2xl">
        Informações para o seu agendamento
      </h1>

      <div
        className={`
        w-80 h-fit
        flex 
        transition-all
        overflow-x-clip
        `}
      >
        {/* inputs de escolha */}
        <InputsContainer formStage={formStage}>
          {inputsData.selectInputs.map(({ options, placeholder }, idx) => (
            <SelectInput
              options={options}
              placeholder={placeholder}
              key={placeholder + idx}
            />
          ))}
        </InputsContainer>

        <InputsContainer formStage={formStage}>
          {inputsData.dateInputs.map(
            ({ placeholder, unavailableDays }, idx) => (
              <DateInput key={placeholder + idx} placeholder={placeholder} />
            ),
          )}
        </InputsContainer>

        <InputsContainer formStage={formStage}>
          {inputsData.textInputs.map(({ placeholder }, idx) => (
            <TextInput key={placeholder + idx} placeholder={placeholder} />
          ))}
        </InputsContainer>
      </div>

      {/* botões de confirmação*/}
      <div className="text-center flex flex-col gap-4">
        <button
          onClick={handleFormStage}
          className="py-2 px-8 bg-primary rounded-full text-background cursor-pointer hover:bg-secondary transition-colors"
        >
          Confirmar reserva
        </button>

        <button className="text-white underline cursor-pointer">
          Cancelar reserva
        </button>
      </div>
    </Section>
  );
}
