import { twMerge } from "tailwind-merge";

export default function Section({
  className,
  children,
  id,
}: {
  id?: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className={twMerge(
        "w-full flex flex-col items-center justify-center p-2 sm:pt-8 sm:h-[calc(100dvh-3.125rem)] sm:grid sm:grid-rows-[min-content_auto] sm:justify-items-center",
        className
      )}
    >
      {children}
    </div>
  );
}
