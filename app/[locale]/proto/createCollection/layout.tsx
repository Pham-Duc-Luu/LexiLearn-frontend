import FooterProto from "@/components/Footer.Proto";
import MainNavbarProto from "@/components/Navbar.Proto";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="  min-h-screen min-w-full bg-background-deemphasized">
      <MainNavbarProto position="static"></MainNavbarProto>
      <div className="">
        {/* <SideBar></SideBar> */}
        <div>{children}</div>
      </div>
      <FooterProto></FooterProto>
    </div>
  );
}
