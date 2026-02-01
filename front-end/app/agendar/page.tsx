import Section from "@/components/layout/Section";
import Image from "next/image";
import bg from "@/public/png/booking/bg_bookings.png";
import TextInput from "./components/TextInput";

export default function BookingPage() {
  return (
    <Section className="h-full">
      <Image
        src={bg}
        alt={"fundo da pagina"}
        className="size-full object-center object-cover fixed top-0 left-0 -z-1 blur-md brightness-70"
      />
      <h1>Informações para o seu agendamento</h1>

      <div className="w-full h-fit flex flex-col items-center justify-center gap-4">
        <TextInput placeholder="de qual serviço você precisa? "/>
        <TextInput placeholder="escolha o seu barbeiro"/>
      </div>
    </Section>
  );
}
