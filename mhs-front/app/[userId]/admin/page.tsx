import AdminPageComp from "@/components/AdminPage/AdminPageComp";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default function AdminPage({ params }: { params: Params }) {
  const userId = params.userId;
  return <AdminPageComp userId={userId}  />;
}
