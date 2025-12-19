import Section from "@/components/templates/Section";
import Image from "next/image";
import Hair from "@/public/png/service-hair.png";
import Beard from "@/public/png/service-beard.png";

export default function Services({}: {}) {
  const services = [
    {
      service: "cabelo",
      image: Hair,
      menu: [
        { name: "raspagem", price: 15 },
        { name: "aparo", price: 20 },
        { name: "corte", price: 25 },
        { name: "hidratação", price: 30 },
        { name: "coloração", price: 40 },
      ],
    },
    {
      service: "barba",
      image: Beard,
      menu: [
        { name: "raspagem", price: 15 },
        { name: "aparo", price: 20 },
        { name: "corte", price: 25 },
        { name: "hidratação", price: 30 },
        { name: "coloração", price: 40 },
      ],
    },
  ];
  return (
    // container de serviços
    <Section className=" justify-center items-center size-dvw bg-[url(/png/bg-services.png)] bg-left bg-origin-border bg-cover bg-no-repeat">
      {/* filtro blur */}
      <div className="flex flex-col gap-4 items-center justify-center size-full text-sm backdrop-blur-xs backdrop-brightness-90">
        {/* titulo */}
        <h1 className="text-lg font-bold text-black border-b-2 border-primary px-5">Nossos Serviços</h1>
        {/* container do menu */}
        <span className="w-full flex gap-2 justify-evenly">
          {services.map(({ service, image, menu }) => (
            //pagina de cada serviço
            <div
              key={"menu" + service}
              className="flex flex-col items-center pb-3 w-[45dvw] rounded-3xl outline-4 outline-primary bg-background"
            >
              <Image
                src={image}
                alt={"homem cortando " + service}
                className="w-full rounded-t-3xl rounded-b-xl object-cover object-center"
              />
              <table className="capitalize w-full ">
                {/* <thead>{service}</thead> */}
                <tbody className="w-full px-2">
                  <tr>
                    <th
                      className="font-(family-name:--font-arbutus) text-lg text-primary"
                      colSpan={3}
                    >
                      {service}
                    </th>
                  </tr>
                  {menu.map(({ name, price }) => (
                    <tr
                      className=" w-full grid grid-cols-[min-content_auto_2.5rem] items-center gap-1 px-2"
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
      </div>
    </Section>
  );
}
