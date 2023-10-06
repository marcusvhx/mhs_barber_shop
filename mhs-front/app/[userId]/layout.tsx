import "../globals.css";
import type { Metadata } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "MHS Barber Shop",
  icons: "/icos/mhs_favIcon.ico",
};

export default async function UsersLayout({
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

    // @ts-ignore
    const tokenVerify = decodedToken.userId === userId;
    const jwtVerify = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET);

    if (!jwtVerify || !tokenVerify) redirect("/entrar");
  } catch {
    redirect("/entrar");
  }
  return (
    <html lang="pt-br">
      <body className={""}>{children}</body>
    </html>
  );
}
