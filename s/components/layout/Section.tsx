import { twMerge } from "tailwind-merge";

export default function Section({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div className={twMerge("w-full flex flex-col items-center justify-center p-2", className)}>{children}</div>
  );
}
