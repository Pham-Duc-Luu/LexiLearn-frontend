import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { ReactFlowProvider } from "@xyflow/react";
import EditPlayGroud from "./EditPlayGroud";
const MainCard = () => {
  return (
    <Card radius="none" className="col-span-9">
      <ReactFlowProvider>
        <EditPlayGroud className=" col-start-2  col-span-8  border-2 boder rounded-md"></EditPlayGroud>
      </ReactFlowProvider>
    </Card>
  );
};

export default MainCard;
