"use client";
import { Toaster } from "@/components/ui/toaster";
import { ProtoStore } from "@/store/Proto-slice/ProtoStore.slice";
import { Provider } from "react-redux";
import { SettingBox } from "./SettingBox";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={ProtoStore}>
      <Toaster></Toaster>
      <div className=" relative">
        {children}
        <SettingBox></SettingBox>
      </div>
    </Provider>
  );
}
