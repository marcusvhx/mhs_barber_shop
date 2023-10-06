import "../../globals.css";

import { Metadata } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "MHS Barber Shop",
  icons: "/icos/mhs_favIcon.ico",
};

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const token = cookies().get("auth")?.value;
  const userId = await params.userId;

  try {
    const decodedToken = jwt.decode(token);

    const conditions = [
      // @ts-ignore
      decodedToken.userId === userId,
      jwt.verify(token, process.env.NEXT_PUBLIC_SECRET),
      // @ts-ignore
      decodedToken.role === "admin",
    ];

    if (conditions.some((i) => !i)) redirect("/entrar");
  } catch {
    redirect("/entrar");
  }

  return (
    <html lang="pt-br">
      <body className={""}>{children}</body>
    </html>
  );
}
