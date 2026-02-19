import { RefObject,  } from "react";
import { twMerge } from "tailwind-merge";

export default function TextInput({
  placeholder,
  className,
  ref,
  disabled
}: {
  placeholder: string;
  className?: string;
  ref?: RefObject<null | HTMLInputElement>;
  disabled?:boolean;
}) {
  return (
    <input
      disabled={disabled}
      ref={ref}
      placeholder={placeholder}
      className={twMerge(
        `w-full py-2 px-4 max-w-80
        bg-foreground
        text-background placeholder:text-background/50
        rounded-full
        outline-0
        `,
        className,
      )}
    />
  );
}
