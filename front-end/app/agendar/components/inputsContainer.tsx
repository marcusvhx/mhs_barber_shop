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
        grid gap-4
        transition-all
        data-[form-stage=1]:-translate-x-80
        data-[form-stage=2]:-translate-x-160
`,
        className,
      )}
    >
      {children}
    </div>
  );
}
