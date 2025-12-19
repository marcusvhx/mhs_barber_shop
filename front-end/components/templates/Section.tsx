import { twMerge } from "tailwind-merge";

export default function Section({className,children}:{className:string; children:React.ReactNode}) {return <div className={twMerge("w-full flex flex-col", className)}>{children}</div>}