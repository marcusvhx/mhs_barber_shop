import Section from "@/components/layout/Section";
import Image from "next/image";
import logo from "@/public/svg/logo.svg";
import imgHome from "@/public/png/home/img-home-desktop.png";
import AppointmentButton from "@/components/ui/AppointmentButton";
export default function Home({}: {}) {
  return (
    // container da home
    <Section className="sm:flex sm:flex-row w-full sm:p-0 h-[80dvw] relative">
      {/* filtro brando nos cantos */}
      <div className="absolute top-0 left-0 size-full bg-linear-to-b from-foreground/30 to-transparent backdrop-blur-lg -z-1 sm:hidden" />

      {/* bordas gradientes */}
      <div className="sm:hidden grid place-items-center size-full [background:radial-gradient(circle,transparent_75%,var(--color-primary))] z-1">
        {/* constainer da logo  */}
        <div className="relative size-[calc(100%-5px)] bg-background">
          {/* filtro branco no centro */}
          <div className="grid gap-4 size-full bg-linear-to-b from-foreground/30 to-transparent">
            <div className="flex flex-col items-center gap-2 place-self-center">
              <Image alt="logo" src={logo} className="w-3/5 sm:w-4/5  " />
              <AppointmentButton />
            </div>
          </div>
        </div>
      </div>

      {/* desktop */}
      <div className="hidden size-full sm:grid place-items-center grid-cols-[40%_auto]">
        <Image
          alt="imagem de introdução"
          src={imgHome}
          className="hidden sm:flex w-full place-self-start" 
        />
        <div className="flex flex-col items-center gap-2 place-self-center">
          <Image alt="logo" src={logo} className="w-3/5 lg:w-4/5 " />
          <AppointmentButton />
        </div>
      </div>
    </Section>
  );
}
