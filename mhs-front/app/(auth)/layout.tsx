import "../globals.css";
import type { Metadata } from "next";

import { cookies } from "next/headers";

import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "MHS Barber Shop",
  icons: "icos/mhs_favicon.ico",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  function getId() {
    const token = cookies().get("auth")?.value;
    if (token) {
      const jwtVerify = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET);

      //@ts-ignore
      //@ts-nocheck
      if (jwtVerify) return jwtVerify.id;
    }
    return undefined;
  }

  const id = getId();

  if (id) {
    redirect(`/${id}/reservar`);
  }

  return (
    <html lang="pt-br">
      <body className={``}>{children}</body>
    </html>
  );
}
