import React from "react";
import SearchingArea from "./SearchingArea";
import DeskCardLayout from "./DeskCardLayout";
import DeskCardLayoutV2 from "./DeskCardLayout.v2";

const page = () => {
  return (
    <div className="flex-1 overflow-y-scroll">
      <SearchingArea></SearchingArea>
      <DeskCardLayoutV2></DeskCardLayoutV2>
    </div>
  );
};

export default page;
