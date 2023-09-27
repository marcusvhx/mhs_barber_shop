import MakeReserv from "@/components/makeReserv/MakeReserv";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default function MakeReservPage({params}:{params:Params}) {
  
  return <MakeReserv userId={params.userId} />;
}
