import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cookies } from "next/headers";

import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "MHS Barber Shop",
  icons: "/icos/mhs_favicon.ico",
};

function getId() {
  const token = cookies().get("auth")?.value;

  if (token) {
    const jwtVerify = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET);
    return jwtVerify.id;
  }
  return undefined;
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const id = getId();

  if (id) {
    console.log(id);
    redirect(`/${id}/reservar`);
  }

  return (
    <html lang="pt-br">
      <body className={``}>{children}</body>
    </html>
  );
}
