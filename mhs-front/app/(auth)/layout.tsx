import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cookies } from "next/headers";

import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MHS Barber Shop",
  icons: "/icos/mhs_favicon.ico",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("auth")?.value;

  if (token) {
    const jwtVerify = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET);

    if (jwtVerify) {
      redirect(`${jwtVerify?.id}/reservar`);
    }
  }
  return (
    <html lang="pt-br">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
