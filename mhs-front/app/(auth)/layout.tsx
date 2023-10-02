import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MHS Barber Shop",
  icons: "/icos/mhs_favIcon.ico",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={``}>{children}</body>
    </html>
  );
}
