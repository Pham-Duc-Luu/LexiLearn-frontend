"use client";
import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image,
  Input,
  Pagination,
  PaginationItemRenderProps,
} from "@heroui/react";
import { BsCollection } from "react-icons/bs";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { IoTrashBinOutline } from "react-icons/io5";
import { TbMenuOrder } from "react-icons/tb";
import { CiFilter } from "react-icons/ci";
import { useRouter } from "@/i18n/routing";
import {
  LibraryRouteStatusType,
  routeProto,
} from "@/store/legacy store/route.slice";
import { MdChecklist, MdOutlineEditNote } from "react-icons/md";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
const FilterBlock = () => {
  const route = useRouter();
  const param = useParams<{ status: LibraryRouteStatusType }>();
  return (
    <>
      <div className=" flex justify-between items-center py-4">
        <div>
          <Button
            onPress={() => route.push(routeProto.LIBRARY("all", 1))}
            startContent={<BsCollection />}
            variant={param.status === "all" ? "flat" : "light"}
            className={cn(
              " rounded-t-sm rounded-b-none border-b-2 text-color-4 font-semibold ",
              param.status === "all" && "border-color-4 bg-color-4/20 "
            )}
          >
            Desk
          </Button>
          <Button
            onPress={() => route.push(routeProto.LIBRARY("published", 1))}
            startContent={<MdChecklist />}
            variant={param.status === "published" ? "flat" : "light"}
            className={cn(
              " rounded-t-sm rounded-b-none border-b-2 text-color-4 font-semibold ",
              param.status === "published" && "border-color-4 bg-color-4/20 "
            )}
          >
            Published
          </Button>

          <Button
            onPress={() => route.push(routeProto.LIBRARY("drafted", 1))}
            variant={param.status === "drafted" ? "flat" : "light"}
            className={cn(
              " rounded-t-sm rounded-b-none border-b-2 text-color-4 font-semibold ",
              param.status === "drafted" && "border-color-4 bg-color-4/20 "
            )}
            startContent={<MdOutlineEditNote />}
          >
            Drafted
          </Button>

          <Button
            onPress={() => route.push(routeProto.LIBRARY("bin", 1))}
            variant={param.status === "bin" ? "flat" : "light"}
            className={cn(
              " rounded-t-sm rounded-b-none border-b-2 text-color-4 font-semibold ",
              param.status === "bin" && "border-color-4 bg-color-4/20 "
            )}
            startContent={<IoTrashBinOutline />}
          >
            Bin
          </Button>
        </div>

        <div className=" flex justify-center items-center gap-4">
          <Dropdown>
            <DropdownTrigger>
              <Button
                className=" rounded-sm"
                size="sm"
                startContent={<CiFilter />}
              >
                Filter
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">New file</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <Button
                className=" rounded-sm"
                size="sm"
                startContent={<TbMenuOrder />}
              >
                Filter
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">New file</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default FilterBlock;
