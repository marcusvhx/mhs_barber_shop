import Section from "@/components/layout/Section";
import Title from "@/components/ui/Title";
import Image from "next/image";
import appointmentIcon from "@/public/svg/appointment-icon.svg";
import { employees } from "./employees";

export default function Employees({}: {}) {
  return (
    <Section id="employees" className="md:h-fit md:py-16 py-8 md:gap-8">
      <Title>Nossa equipe</Title>
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-8 items-center justify-center mt-12 sm:mt-0">
        {employees.map(({ image, name, role }, idx) => (
            <div key={name + idx} className="flex items-center justify-between w-full sm:w-fit sm:gap-4">
              <Image
                className="w-2/5 sm:w-32 h-32 "
                alt="foto de um funcionário"
                src={image}
              />

              <div className=" text-center capitalize">
                <h2 className="text-lg font-bold ">{name}</h2>
                <h3 className="text-md text-primary">{role}</h3>
              </div>

              <div className="flex justify-center text-background gap-2 rounded-lg p-2 bg-primary">
                <Image src={appointmentIcon} alt="ícone de agendamento" />
              </div>
            </div>
        ))}
      </div>
    </Section>
  );
}
