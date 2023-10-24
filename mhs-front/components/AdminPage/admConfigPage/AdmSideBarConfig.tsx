import { PageComponents } from "@/components/common/PageComponents";
import { useState } from "react";

export default function AdmSideBarConfig({ userId }: { userId: string }) {
  const [sideBarToggle, setSideBarToggle] = useState(false);

  return (
    <PageComponents.SideBar
      userId={userId}
      sidebarWrapperToggle={sideBarToggle}
      setSidebarWrapperToggle={setSideBarToggle}
    >
      <h1>s</h1>
    </PageComponents.SideBar>
  );
}
