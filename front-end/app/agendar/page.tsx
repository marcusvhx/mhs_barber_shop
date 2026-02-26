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
import { IAppointmentData } from "./types";

export default function BookingPage() {
  const [formStage, setFormStage] = useState(0);

  // const getFromApi = new Get();

  const services = [
    "corte - cabelo",
    "corte - barba",
    "corte - cabelo e barba",
  ];
  const barbers = ["barbeiro", "cabelereiro", "quimico"];

  const [appointmentData, setAppointmentData] = useState<IAppointmentData>({
    barber: "",
    date: "",
    clientName: "",
    clientPhoneNumber: "",
    service: "",
  });

  const handleFormStage = async () => {
    setFormStage((old) => (old < 2 ? old + 1 : 0));
  };

  const getInputValue = (name: string, value: string) => {
    if (!name || !value) throw new Error("invalid input");
    setAppointmentData((old) => ({
      ...old,
      [name as keyof IAppointmentData]: value,
    }));
  };
  useEffect(() => {
    console.log(appointmentData);
  }, [appointmentData]);
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
        <InputsContainer
          className="data-[form-stage=1]:-ml-80 data-[form-stage=2]:-ml-160"
          formStage={formStage}
        >
          {/* serviços */}
          <SelectInput
            inputName="service"
            saveInputValue={getInputValue}
            options={services}
            placeholder={"De qual serviço você precisa?"}
          />

          {/* barbeiros */}
          <SelectInput
            inputName="barber"
            saveInputValue={getInputValue}
            options={barbers}
            placeholder={"Escolha o seu barbeiro"}
          />
        </InputsContainer>

        {/* input de data e hora */}
        <InputsContainer className="" formStage={formStage}>
          {/* data e hora */}
          <DateInput
            getInputValue={getInputValue}
            placeholder={"Veja horários disponiveis"}
          />
        </InputsContainer>

        {/* input de texto */}
        <InputsContainer className="" formStage={formStage}>
          {/* nome */}
          <TextInput
            name="clientName"
            placeholder={"De qual serviço você precisa?"}
          />

          {/* telefone */}
          <TextInput
            name="clientPhoneNumber"
            placeholder={"Escolha o seu barbeiro"}
          />
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
