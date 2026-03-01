"use client";
import { twMerge } from "tailwind-merge";
import { Input } from "./Input";
import { useFormContext } from "react-hook-form";
import { IAppointmentData, IInputProps } from "../../types";

export default function TextInput({
  placeholder,
  className,
  name,
  disabled,
  type
}: { type?: string } & IInputProps) {
  const { register } = useFormContext<IAppointmentData>();
  
  return (
    <Input
      {...register(name as keyof IAppointmentData)}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className={twMerge(
        `
              w-80
              py-2 px-4
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
