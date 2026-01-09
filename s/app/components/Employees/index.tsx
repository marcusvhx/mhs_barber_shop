import Section from "@/components/layout/Section";
import Title from "@/components/ui/Title";
import Image from "next/image";
import { employees } from "./employees";

export default function Employees({}: {}) {
  return (
    <Section className="">
      <Title>Nossa equipe</Title>
      <div className="flex flex-col gap-4 items-center mt-4">
        {employees.map(({ image, name, role },idx) => (
          <div key={name+idx} className="mt-3 w-full flex gap-4 items-center justify-center">
            <Image
              className="w-2/5 "
              alt="foto de um funcionário"
              src={image}
            />
            <div className="w-4/9 text-center capitalize">
              <h2 className="text-lg font-bold ">{name}</h2>
              <h3 className="text-md text-primary">{role}</h3>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
