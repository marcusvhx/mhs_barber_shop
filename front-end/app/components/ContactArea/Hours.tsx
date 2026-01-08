import Section from "@/components/layout/Section";
import Title from "@/components/ui/Title";

export default function Hours({}: {}) {
  return (
    <div className="flex flex-col items-center gap-4 bg-neutral-900 shadow-xl shadow-black rounded-lg p-4 w-fit mt-8 sm:mt-0 sm:self-end">
      <Title>Horários</Title>

      <div className="flex gap-2 items-center">
        <p>Segunda - Sexta</p>
        <div className="rounded-full bg-primary size-2" />
        <p>08:00 - 20:00</p>
      </div>
      
      <div className="flex gap-2 items-center self-end">
        <p>Sábado</p>
        <div className="rounded-full bg-primary size-2" />
        <p>09:00 - 22:00</p>
      </div>
    </div>
  );
}
