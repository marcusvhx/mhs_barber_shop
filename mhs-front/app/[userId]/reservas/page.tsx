import ReservsCrud from "@/components/reservsCrud/ReservsCrud";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default async function ReservsPage({ params }: { params: Params }) {
  const userId = await params.userId;

  return <ReservsCrud userId={userId} />;
}
