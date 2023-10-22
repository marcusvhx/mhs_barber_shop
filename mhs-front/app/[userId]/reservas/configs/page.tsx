import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default async function UserConfigPage({ params }: { params: Params }) {
  const userId = await params.userId;

  return <>{userId}</>;
}
