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
<<<<<<< HEAD
    <html className="scroll-pt-12.5 scroll-smooth" lang="pt-br">
=======
    <html className="scroll-pt-12 scroll-smooth" lang="pt-br">
>>>>>>> e638f700d9b76ba6f2b1c1479d21af01dfceca17
      <body
        className={`${alexandria.variable} ${arbutus.variable} flex flex-col antialiased bg-background text-foreground w-full h-dvh `}
      >
        {children}
      </body>
    </html>
  );
}
