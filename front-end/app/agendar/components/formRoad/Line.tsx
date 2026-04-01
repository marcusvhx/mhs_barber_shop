import { twMerge } from "tailwind-merge";

export default function Line({
  className,
  isCurrent,
}: {
  className?: string;
  isCurrent: boolean;
}) {
  return (
    <div
      className={twMerge(`bg-gray-300 h-1.5 w-20 -ml-px relative`, className)}
    >
      <div
        data-is-current={isCurrent}
        className={`

        h-full w-0 data-[is-current=true]:w-20
        bg-primary 
        transition-all data-[is-current=false]:delay-75
        absolute top-0 left-0 z-2
        `}
      />
    </div>
  );
}
