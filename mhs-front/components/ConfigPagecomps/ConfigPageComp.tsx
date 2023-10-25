"use client";

import { useState } from "react";
import { CommonBtnIcons, CommonLinkIcons } from "../common/CommonButons";
import AdmSideBarConfig from "./SideBarConfig";
import EditPersonalData from "./EditPersonalData";
import { LinksList } from "@/interfaces";
import EditPasswordComp from "./EditPasswordComp";
import LogOutComp from "@/components/ConfigPagecomps/LogOutComp";

export default function AdmConfigPageConp({ userId }: { userId: string }) {
  const [sideBarToggle, setSideBarToggle] = useState(false);

  const [linksList, setLinksList] = useState<LinksList[]>([
    {
      title: "dados pessoais",
      selected: true,
      link: "personal-data",
    },
    {
      title: "senhas",
      selected: false,
      link: "password",
    },
    {
      title: "sair",
      selected: false,
      link: "logout",
    },
  ]);

  return (
    <div className="crudBody">
      <div className="fixed top-2 right-2 bg-zinc-200 z-[2] hidden wrapper:block rounded">
        <CommonBtnIcons.MoreOptsBtn
          func={() => setSideBarToggle((old) => !old)}
          type="lines"
        />
      </div>
      <div className="max-h-screen w-full overflow-hidden scroll-smooth grid justify-center relative">
        <CommonLinkIcons.BackArrowLink
          coordXY="top-1 left-1"
          position="fixed"
        />
        <div id="personal-data" className="h-screen w-full">
          <EditPersonalData userId={userId} />
        </div>

        <div id="password" className="h-screen w-full">
          <EditPasswordComp userId={userId} />
        </div>

        <div id="logout" className="h-screen w-full">
          <LogOutComp />
        </div>
      </div>

      <AdmSideBarConfig
        userId={userId}
        linksList={linksList}
        setLinksList={setLinksList}
        setSideBarToggle={setSideBarToggle}
        sideBarToggle={sideBarToggle}
      />
    </div>
  );
}
