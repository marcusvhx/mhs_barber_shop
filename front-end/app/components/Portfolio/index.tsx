import Section from "@/components/layout/Section";
import Image from "next/image";
import { portfolio } from "./bestWorks";
import Title from "@/components/ui/Title";

export default function Portfolio({}: {}) {
  return (
    <Section id="portfolio" className="gap-8 sm:flex sm:flex-col sm:h-fit py-8">
      <Title>Nossos melhores trabalhos</Title>
      <div className="w-full flex gap-4 flex-wrap justify-center">
        {portfolio.map((workImage, idx) => (
          <Image
            key={"workImage" + idx}
            src={workImage}
            alt="corte de cabelo"
            className="w-2/7 sm:w-[min(18%,10rem)] border-3 border-primary rounded-lg"
          />
        ))}
      </div>
    </Section>
  );
}
