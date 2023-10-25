import ReservsCrud from "@/components/UserPage/ReservsCrud";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default async function ReservsPage({ params }: { params: Params }) {
  const userId = await params.userId;

  return <ReservsCrud userId={userId} />;
}
