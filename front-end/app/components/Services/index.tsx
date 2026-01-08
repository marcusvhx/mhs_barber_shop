import Section from "@/components/layout/Section";
import Image from "next/image";
import {services} from "./menu";
import Title from "@/components/ui/Title";
export default function Services({}: {}) {
  return (
    // container de serviços
    <Section id="services" className="place-items-center gap-4 text-sm py-4 sm:text-md bg-[url(/png/services/bg-services.png)] bg-left bg-origin-border bg-cover bg-no-repeat relative">
      {/* blur */}
      {/* <div className="absolute top-0 left-0 w-full h-full backdrop-blur-lg z-0"></div> */}
        {/* titulo */}
        <Title >Nossos Serviços</Title>
        {/* container do menu */}
        <span className="w-full flex sm:gap-5 justify-around sm:justify-center">
          {services.map(({ service, image, menu }) => (
            //pagina de cada serviço
            <div
              key={"menu" + service}
              className="flex flex-col gap-2 items-center pb-3 w-[43dvw] sm:w-50 md:w-70 rounded-3xl outline-4 outline-primary bg-background"
            >
              <Image
                src={image}
                alt={"homem cortando " + service}
                className="w-full rounded-t-3xl rounded-b-xl object-cover object-center"
              />
              <table className="capitalize w-full text-xs">
                <tbody className="w-full px-2">
                  <tr>
                    <th
                      className="font-(family-name:--font-arbutus) text-lg md:font-light md:text-xl text-primary"
                      colSpan={3}
                    >
                      {service}
                    </th>
                  </tr>
                  {menu.map(({ name, price }) => (
                    <tr
                      className=" w-full text-center grid grid-cols-[min-content_auto_2.5rem] items-center gap-1 px-2 text-xs md:text-base"
                      key={service + name}
                    >
                      <td className="">{name}</td>
                      <td>
                        <div className=" h-0.5 border-b-2 border-primary border-dotted" />
                      </td>
                      <td className="w-10">R${price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </span>
    </Section>
  );
}
