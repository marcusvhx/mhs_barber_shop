import { PageComponents } from "@/components/common/PageComponents";
import { LinksList, SetBool } from "@/interfaces";
import { Dispatch, SetStateAction, useState } from "react";

export default function AdmSideBarConfig({
  userId,
  linksList,
  setLinksList,
  sideBarToggle,
  setSideBarToggle,
}: {
  userId: string;
  linksList: LinksList[];
  setLinksList: Dispatch<SetStateAction<LinksList[]>>;
  sideBarToggle: boolean;
  setSideBarToggle: SetBool;
}) {
  const [reload, setReload] = useState(false);

  function configFocusHandler(e: any) {
    const newList = linksList;

    newList.map((link) => (link.selected = false));

    newList.find(
      (link) => link.title === e.target.textContent && (link.selected = true)
    );
    setLinksList(() => newList);
    setReload((old) => !old);
  }
  return (
    <PageComponents.SideBar
      userId={userId}
      sidebarWrapperToggle={sideBarToggle}
      setSidebarWrapperToggle={setSideBarToggle}
    >
      <div className="w-full ">
        {linksList.map((link) => (
          <a
            key={link.link}
            href={"#" + link.link}
            onClick={configFocusHandler}
            className={`${
              link.selected ? "bg-neutral-200" : ""
            } close_aside w-full py-2 block border-b-2 border-neutral-400 capitalize cursor-pointer text-center hover:bg-neutral-200 transition`}
          >
            {link.title}
          </a>
        ))}
      </div>
    </PageComponents.SideBar>
  );
}
