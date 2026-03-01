import { twMerge } from "tailwind-merge";

export default function Circle({
  className,
  isCurrent,
}: {
  className?: string;
  isCurrent: boolean;
}) {
  return (
    <div
      className={twMerge(
        `rounded-full bg-gray-300 size-4 overflow-hidden flex items-center`,
        className,
      )}
    >
      <div data-is-current={isCurrent} className="h-4 w-0 bg-primary data-[is-current=true]:w-4 transition-all data-[is-current=true]:delay-75" />
    </div>
  );
}
