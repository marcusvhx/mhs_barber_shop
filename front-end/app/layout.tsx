import type { Metadata } from "next";
import { Alexandria, Arbutus } from "next/font/google";
import "./globals.css";

const alexandria = Alexandria({
  weight: ["400", "700"],
  variable: "--font-alexandria",
  subsets: ["latin"],
});
const arbutus = Arbutus({
  weight: ["400"],
  variable: "--font-arbutus",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MHS Barber Shop",
  description: "A barbearia perfeita para você.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${alexandria.variable} ${arbutus.variable} flex flex-col antialiased bg-background text-foreground w-dvw h-dvh`}
      >
        {children}
      </body>
    </html>
  );
}
