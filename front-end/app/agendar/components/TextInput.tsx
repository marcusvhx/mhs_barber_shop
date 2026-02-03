import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function TextInput({
  children,
  placeholder,
  className,
}: {
  placeholder: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <input
      placeholder={placeholder}
      className={twMerge(
        "w-full py-2 px-4 bg-foreground text-background rounded-full max-w-80 outline-0 placeholder:text-background/50",
        className,
      )}
    >
      {children}
    </input>
  );
}
