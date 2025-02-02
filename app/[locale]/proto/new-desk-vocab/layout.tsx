import NavBarProtoV1 from "@/components/Navbar.Proto.v1";
import Header from "./Header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" h-screen overflow-hidden min-w-full bg-background-deemphasized flex flex-col">
      <Header></Header>
      <>{children}</>
    </div>
  );
}
