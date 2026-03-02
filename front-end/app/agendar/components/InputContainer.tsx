import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function InputsContainer({
  children,
  className,
  formStage,
}: {
  children: ReactNode;
  className?: string;
  formStage: number;
}) {
  return (
    <div
      data-form-stage={formStage}
      className={twMerge(
        `
        flex flex-col gap-4 items-center 
        transition-all`,
        className,
      )}
    >
      {children}
    </div>
  );
}
