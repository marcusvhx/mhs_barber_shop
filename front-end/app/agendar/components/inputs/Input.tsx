'use client'
import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return <input ref={ref} {...props} />;
  }
);

Input.displayName = "Input";

export {Input}