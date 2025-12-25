import Section from "@/components/layout/Section";
import Image from "next/image";
import logo from "@/public/svg/logo.svg";
import AppointmentButton from "@/components/ui/AppointmentButton";


export default function Home({}: {}) {
  return (
    // container da home
    <Section className="w-dvw h-[80dvw] relative">
      {/* filtro brando nos cantos */}
      <div className="absolute size-full bg-linear-to-b from-foreground/30 to-transparent backdrop-blur-lg -z-1" />

      {/* bordas gradientes */}
      <div className="size-full [background:radial-gradient(circle,transparent_75%,var(--color-primary))] z-1">
        {/* constainer da logo  */}
        <div className="flex flex-col gap-4 items-center justify-center relative size-[calc(100%-5px)] bg-background top-1/2 left-1/2 -translate-1/2">
          {/* filtro branco no centro */}
          <div className="absolute size-full bg-linear-to-b from-foreground/30 to-transparent -z-1" />

          <Image alt="logo" src={logo} className="size-4/6 -mt-4" />
          <AppointmentButton/>
        </div>
      </div>
    </Section>
  );
}
