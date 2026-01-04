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
    <div id={id} className={twMerge("w-full flex flex-col items-center justify-center p-2 sm:h-[calc(100dvh-3.5rem)] sm:grid sm:grid-rows-[min-content_auto] sm:justify-items-center pt-8 sm:pt-2", className)}>{children}</div>
  );
}
