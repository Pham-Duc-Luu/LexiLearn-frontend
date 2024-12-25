"use client";
import { ProtoStore } from "@/store/Proto-slice/ProtoStore";
import { Provider } from "react-redux";

export default function layout({ children }: { children: React.ReactNode }) {
  return <Provider store={ProtoStore}>{children}</Provider>;
}
