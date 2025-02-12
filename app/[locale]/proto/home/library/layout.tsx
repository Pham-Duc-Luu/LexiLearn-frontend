import ReLoginNotify from "@/components/Re-login.notify";
import InforBar from "./InforBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className=" grid grid-cols-12 h-full bg-background-deemphasized gap-4 w-full">
        <InforBar></InforBar>
        <>{children}</>
      </div>
      <ReLoginNotify></ReLoginNotify>
    </>
  );
}
