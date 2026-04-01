import Link from "next/link";

export default function AppointmentTextButton({}: {}) {
  return (
    <Link href={"agendar"} className="bg-primary hover:bg-secondary cursor-pointer transition-colors rounded-full px-4 py-1 text-center text-background md:text-lg">
      Fazer reserva
    </Link>
  );
}
