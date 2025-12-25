import { ReactNode } from "react";

export default function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="flex text-lg font-bold border-b-2 border-primary px-5">
      {children}
    </h1>
  );
}
