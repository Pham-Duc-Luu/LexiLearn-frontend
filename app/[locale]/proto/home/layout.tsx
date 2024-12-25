import NavBarProtoV1 from "@/components/Navbar.Proto.v1";
import { SidebarDemo } from "./SideBarDemo";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" min-h-screen min-w-full bg-background-deemphasized flex flex-col">
      <NavBarProtoV1></NavBarProtoV1>
      <SidebarDemo>
        <div>{children}</div>
      </SidebarDemo>
    </div>
  );
}
