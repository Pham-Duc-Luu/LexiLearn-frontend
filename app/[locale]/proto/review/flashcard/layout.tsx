import Header from "./Header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" h-screen min-w-full bg-background-deemphasized flex flex-col">
      <Header></Header>
      <>{children}</>
    </div>
  );
}
