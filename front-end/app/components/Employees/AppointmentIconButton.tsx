import appointmentIcon from "@/public/svg/appointment-icon.svg";
import { UUID } from "crypto";
import Image from "next/image";
import Link from "next/link";

export default function AppointmentIconButton({barberId}: {barberId?: UUID}) {
  return (
    <Link href={`agendar?${barberId}`} className={`
    flex justify-center gap-2
    text-background
    rounded-lg
    p-2
    bg-primary hover:bg-secondary transition-colors
    cursor-pointe`}>
      <Image src={appointmentIcon} alt="ícone de agendamento" />
    </Link>
  );
}
