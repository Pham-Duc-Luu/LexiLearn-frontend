import React from "react";
import Header from "./Header";
import EditPlayGroud from "./EditPlayGroud";
import CardTable from "./CardTable";
import { ReactFlowProvider } from "@xyflow/react";

const page = () => {
  return (
    <div className=" py-8 flex flex-col gap-8">
      <div className="grid grid-cols-12">
        <Header className=" col-start-2 col-span-3"></Header>
      </div>

      <div className=" grid grid-cols-12 h-[600px] gap-4">
        <ReactFlowProvider>
          <EditPlayGroud className=" col-start-2  col-span-8  border-2 boder rounded-md"></EditPlayGroud>
        </ReactFlowProvider>
        <CardTable className=" col-span-2"></CardTable>
      </div>
    </div>
  );
};

export default page;
