"use client";

import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Section from "@/components/layout/Section";
import Image from "next/image";
import TextInput from "./components/inputs/TextInput";
import SelectInput from "./components/inputs/SelectInput";
import DateInput from "./components/inputs/DateInput";
import InputsContainer from "./components/InputContainer";
import { IAppointmentData } from "./types";
import InputsArrow from "./components/InputsArrows";
import Circle from "./components/formRoad/Circle";
import Line from "./components/formRoad/Line";
import HourPicker from "./components/HourPicker";
import ConfirmModal from "./components/confirmModal";
import bg from "@/public/png/booking/bg.png";

const services = ["corte - cabelo", "corte - barba", "corte - cabelo e barba"];
const barbers = ["barbeiro", "cabelereiro", "quimico"];

export default function BookingPage() {
  const [formStage, setFormStage] = useState(0);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const methods = useForm<IAppointmentData>();

  const handleFormStage = async (direction: "r" | "l") => {
    if (direction == "r") {
      setFormStage((old) => (old < 2 ? old + 1 : 0));
    } else {
      setFormStage((old) => (old > 0 ? old - 1 : 2));
    }
  };

  const submitData: SubmitHandler<IAppointmentData> = (data) => {
    console.log(data);
  };

  const cancelBooking = () => {
    return methods.resetField;
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

      <div className="flex items-center">
        <Circle isCurrent={formStage >= 0} />

        <Line isCurrent={formStage >= 1} />
        <Circle isCurrent={formStage >= 1} className="-ml-px" />

        <Line isCurrent={formStage == 2} />
        <Circle isCurrent={formStage == 2} className="-ml-px" />
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsConfirmModalOpen(true);
            methods.handleSubmit(submitData);
          }}
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
              name="service"
              options={services}
              placeholder={"De qual serviço você precisa?"}
            />

            {/* barbeiros */}
            <SelectInput
              name="barber"
              options={barbers}
              placeholder={"Escolha o seu barbeiro"}
            />
            <InputsArrow
              disabled={
                !methods.register("service") || !methods.register("barber")
              }
              handleFormStage={handleFormStage}
              direction="r"
            />
          </InputsContainer>

          {/* input de data e hora */}
          <InputsContainer className="" formStage={formStage}>
            {/* data e hora */}
            <DateInput placeholder={"Veja horários disponiveis"} />
            {/* input das horas */}
            <HourPicker />

            <div className="flex justify-center gap-2">
              <InputsArrow handleFormStage={handleFormStage} direction="l" />
              <InputsArrow
                disabled={!methods.register("date")}
                handleFormStage={handleFormStage}
                direction="r"
              />
            </div>
          </InputsContainer>

          {/* input de texto */}
          <InputsContainer className="" formStage={formStage}>
            {/* nome */}
            <TextInput name="clientName" placeholder={"Qual o seu nome?"} />

            {/* telefone */}
            <TextInput
              type="tel"
              name="clientPhoneNumber"
              placeholder={"Nos dê um telefone para contato"}
            />

            <InputsArrow handleFormStage={handleFormStage} direction="l" />
            {/* confirmar */}
            <button
              type="submit"
              className={`
              py-2 px-8
              bg-primary hover:bg-secondary
              rounded-full
              text-background
              cursor-pointer transition-colors
              `}
            >
              Confirmar reserva
            </button>
          </InputsContainer>
        </form>
      </FormProvider>

      {/* cancelar */}
      <Link
        href="/"
        onClick={cancelBooking}
        className="text-white underline cursor-pointer"
      >
        Cancelar reserva
      </Link>
      <ConfirmModal isModalOpen={isConfirmModalOpen} />
    </Section>
  );
}
