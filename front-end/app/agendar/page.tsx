import Section from "@/components/layout/Section";
import Image from "next/image";
import bg from "@/public/png/booking/bg_bookings.png";
import TextInput from "./components/TextInput";
import SelectInput from "./components/SelectInput";
import { inputsData } from "./components/inputsData";

export default function BookingPage() {
  return (
    <Section className="h-full gap-8 sm:flex">
      <Image
        src={bg}
        alt={"fundo da pagina"}
        className="size-full object-center object-cover fixed top-0 left-0 -z-1 blur-md brightness-70"
      />
      <h1 className="px-2 text-center text-xl sm:text-2xl">
        Informações para o seu agendamento
      </h1>

      <div className="w-full h-fit flex flex-col items-center justify-center gap-4">
        {inputsData.map(({ placeholder, options }, idx) =>
          options ? (
            <SelectInput options={options} placeholder={placeholder} key={placeholder + idx} />
          ) : (
            <TextInput key={placeholder + idx} placeholder={placeholder} />
          ),
        )}
      </div>

      <div className="text-center flex flex-col gap-4">
        <button className="py-2 px-8 bg-primary rounded-full text-background cursor-pointer hover:bg-secondary transition-colors">
          Confirmar reserva
        </button>
        <button className="text-white underline cursor-pointer">
          Cancelar reserva
        </button>
      </div>
    </Section>
  );
}
