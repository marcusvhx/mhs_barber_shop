import Section from "@/components/templates/Section";
import Image from "next/image";
import logo from "@/public/svg/logo.svg";

function Corner({ size }: { size: string }) {
  return (
    <div className="flex relative size-16 border-t-4 border-l-4 border-primary top-0 left-0"></div>
  );
}

export default function Home({}: {}) {
  const corners = ["tl", "tr", "bl", "br"];
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
          <button className="bg-primary rounded-full px-4 py-1 text-center text-background">
            Fazer reserva
          </button>
        </div>
      </div>
    </Section>
  );
}
