import Section from "@/components/layout/Section";
import Title from "@/components/ui/Title";
import Image from "next/image";
import appointmentIcon from "@/public/svg/appointment-icon.svg";
import { employees } from "./employees";

export default function Employees({}: {}) {
  return (
    <Section id="employees" className="pt-4">
      <Title>Nossa equipe</Title>
      <div className="flex flex-col gap-8 items-center mt-12">
        {employees.map(({ image, name, role }, idx) => (
          <div key={name + idx} className="w-full flex flex-col items-center">
            <div className="flex items-center justify-between w-full">
              <Image
                className="w-2/5 "
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
          </div>
        ))}
      </div>
    </Section>
  );
}
