import React from "react";
import SearchingArea from "./SearchingArea";
import DeskCardLayout from "./DeskCardLayout";
import DeskCardLayoutV2 from "./DeskCardLayout.v2";

const page = () => {
  return (
    <div className="flex-1 flex flex-col overflow-scroll">
      <SearchingArea></SearchingArea>
      <DeskCardLayout></DeskCardLayout>
    </div>
  );
};

export default page;
