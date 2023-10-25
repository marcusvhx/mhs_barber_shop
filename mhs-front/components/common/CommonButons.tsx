import {
  ArrowBack,
  Close,
  Home,
  ReplayOutlined,
  Settings,
} from "@mui/icons-material";

import "../styles.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* =================================== bases =================================== */

function BtnBase({
  func,
  position,
  coordXY,
  className,
  children,
}: {
  func: () => void;
  position: "fixed" | "absolute";
  coordXY: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${position} ${coordXY} w-8 h-8`}>
      <div className="w-full h-full relative grid place-items-center cursor-pointer">
        <div
          className={`${className} kase cursor-pointer`}
          onClick={func}
        ></div>
        {children}
      </div>
    </div>
  );
}

function LinkBase({
  link,
  position,
  coordXY,
  children,
}: {
  link: string;
  position: "fixed" | "absolute";
  coordXY: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={link} className={`${position} ${coordXY} w-10 h-10 z-[5]`}>
      <div className="w-full h-full relative grid place-items-center cursor-pointer">
        <div className="kase"></div>
        {children}
      </div>
    </Link>
  );
}

/* =================================== links =================================== */

function BackArrowLink({
  position,
  coordXY,
}: {
  position: "fixed" | "absolute";
  coordXY: string;
}) {
  const router = useRouter()
  return (
    <BtnBase
      func={() => {
        router.back();
      }}
      position={position}
      coordXY={coordXY}
    >
      <ArrowBack sx={{ fontSize: "30px", fontWeight: "700" }} />
    </BtnBase>
  );
}

function SettingsLink({
  link,
  position,
  coordXY,
}: {
  link: string;
  position: "fixed" | "absolute";
  coordXY: string;
}) {
  return (
    <LinkBase position={position} link={link} coordXY={coordXY}>
      <Settings sx={{ fontSize: "30px" }} />
    </LinkBase>
  );
}

function HomeLink({
  link,
  position,
  coordXY,
}: {
  link: string;
  position: "fixed" | "absolute";
  coordXY: string;
}) {
  return (
    <LinkBase position={position} link={link} coordXY={coordXY}>
      <Home sx={{ fontSize: "30px" }} />
    </LinkBase>
  );
}

/* =================================== buttons =================================== */

function MoreOptsBtn({
  children,
  standing,
  className,
  type,
  func,
}: {
  children?: React.ReactNode;
  standing?: boolean;
  type: "lines" | "dots";
  className?: string;
  func: (e?) => void;
}) {
  // três pontinhos, é uma tag pai
  return (
    <div onClick={func} className={`${className || ""} relative`}>
      <div
        tabIndex={0}
        className={`${standing ? "flex-col" : ""} ${
          type === "dots" ? "w-10 gap-1 " : "w-10  p-1 flex-col gap-1"
        } flex justify-center items-center cursor-pointer h-8`}
      >
        <div className="absolute w-full h-full hover:bg-black hover:bg-opacity-10 rounded transition"></div>
        <div
          className={`h-1 ${
            type === "dots" ? "w-1" : "w-full"
          } bg-black  rounded-full`}
        ></div>
        <div
          className={`h-1 ${
            type === "dots" ? "w-1" : "w-full"
          } bg-black rounded-full`}
        ></div>
        <div
          className={`h-1 ${
            type === "dots" ? "w-1" : "w-full"
          } bg-black rounded-full`}
        ></div>
      </div>
      {children}
    </div>
  );
}

function ReloadBtn({
  func,
  position,
  coordXY,
}: {
  func: () => void;
  position: "fixed" | "absolute";
  coordXY: string;
}) {
  return (
    <BtnBase position={position} func={func} coordXY={coordXY}>
      <ReplayOutlined sx={{ fontSize: "30px", color: "black" }} />
    </BtnBase>
  );
}

function XBtn({
  func,
  position,
  coordXY,
  className,
}: {
  func: (e?: any) => void;
  position: "fixed" | "absolute";
  coordXY: string;
  className?: string;
}) {
  return (
    <BtnBase
      className={className}
      position={position}
      func={func}
      coordXY={coordXY}
    >
      <Close sx={{ fontSize: "30px" }} />
    </BtnBase>
  );
}

/* =================================== exports =================================== */

export const CommonLinkIcons = {
  BackArrowLink,
  SettingsLink,
  HomeLink,
};

export const CommonBtnIcons = {
  XBtn,
  ReloadBtn,
  MoreOptsBtn,
};
