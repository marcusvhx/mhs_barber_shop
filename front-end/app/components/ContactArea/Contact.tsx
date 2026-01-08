import Title from "@/components/ui/Title";
import Image from "next/image";
import whatsapp from "@/public/svg/whatsapp.svg";
import instagram from "@/public/svg/instagram.svg";

export default function Contact({}: {}) {
  return (
    <div className="w-[80%] py-4 flex flex-col items-center gap-4 bg-neutral-900 shadow-xl shadow-black sm:self-start">
      <Title>Fale conosco</Title>

      <div className="flex flex-wrap justify-center gap-4">

      <div className="flex gap-4">
        <Image alt="" src={whatsapp} />
        <p>(81) 99999-9999</p>
      </div>

      <div className="flex gap-4">
        <Image alt="" src={instagram} />
        <p>@mhs_barbershop</p>
      </div>

      </div>
    </div>
  );
}
