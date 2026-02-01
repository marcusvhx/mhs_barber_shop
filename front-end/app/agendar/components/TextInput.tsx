import { ReactNode } from "react";

export default function TextInput({
  children,
  placeholder,
}: {
  placeholder: string;
  children?: ReactNode;
}) {
  return (
    <input
      placeholder={placeholder}
      className="w-full py-2 px-4 bg-foreground text-background rounded-full capitalize"
    >
      {children}
    </input>
  );
}
