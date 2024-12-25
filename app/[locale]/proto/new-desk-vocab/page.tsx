import React from "react";
import SideCard from "./SideCard";
import MainCard from "./MainCard";

const page = () => {
  return (
    <div className=" flex-1 overflow-hidden grid grid-cols-12 h-full gap-4 p-4 ">
      <SideCard></SideCard>
      <MainCard></MainCard>
    </div>
  );
};

export default page;
