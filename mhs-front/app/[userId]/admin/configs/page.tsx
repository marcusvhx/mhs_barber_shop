import AdmConfigPageConp from "@/components/AdminPage/admConfigPage/AdmConfigPageConp";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default async function AdminConfigPage({ params }: { params: Params }) {
  const userId = await params.userId;

  return <AdmConfigPageConp userId={userId} />;
}
