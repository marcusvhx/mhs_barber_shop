import { reservFormProps } from "@/components/makeReserv/MakeReserv";
import axios from "axios";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

interface reservProps {
  id: string;
  userId: string;
  service: "cabelo" | "barba" | "ambos";
  dateTime: string;
  status: "pending" | "done" | "lost" | "late";
}

export default async function ReservsPage({ params }: { params: Params }) {
  const userId = await params.userId;
  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/getreservs/${userId}`
  );
  const reservs: reservProps[] = data.data;

  return (
    <div>
      {reservs.map((i) => (
        <div className="p-2 ">{i.service}</div>
      ))}
    </div>
  );
}
