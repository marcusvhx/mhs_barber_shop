import "../globals.css";
import type { Metadata } from "next";

import { cookies } from "next/headers";

import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "MHS Barber Shop",
  icons: "icos/mhs_favicon.ico",
};

function getId() {
  const token = cookies().get("auth")?.value;

  if (token) {
    const jwtVerify = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET);
    return jwtVerify;
  }
  return undefined;
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const id = getId();

  // if (id) {
  //   redirect(`/${id}/reservar`);
  // }

  return (
    <html lang="pt-br">
        <p className="fixed top-0 left-0">{JSON.stringify(id)}</p>
        <body className={``}>{children}</body>
      </html>
  );
}
