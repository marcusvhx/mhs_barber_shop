import { twMerge } from "tailwind-merge";

export default function Section({
  className,
  children,
  id
}: {
  id?: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className={twMerge("w-full flex flex-col items-center justify-center p-2", className)}>{children}</div>
  );
}
