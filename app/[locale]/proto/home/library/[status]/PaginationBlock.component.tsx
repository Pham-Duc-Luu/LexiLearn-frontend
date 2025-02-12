"use client";
import { useRouter } from "@/i18n/routing";
import { routeProto } from "@/store/legacy store/route.slice";
import { Pagination } from "@heroui/react";
import React from "react";

const PaginationBlock = () => {
  const route = useRouter();
  return (
    <>
      <Pagination
        onChange={(e) => {
          route.push(routeProto.LIBRARY(undefined, e));
        }}
        showControls
        className="gap-2 "
        initialPage={1}
        classNames={{
          cursor: " bg-color-4",
          wrapper: "bg-color-4/20",
        }}
        isCompact
        total={10}
        variant="light"
      />
    </>
  );
};

export default PaginationBlock;
