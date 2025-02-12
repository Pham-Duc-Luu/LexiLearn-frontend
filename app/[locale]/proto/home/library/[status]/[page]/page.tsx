"use client";
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
import React, { useEffect, useState } from "react";
import {
  MdOutlineNavigateBefore,
  MdOutlineNavigateNext,
  MdPlayArrow,
  MdSearch,
} from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";

import { CiFilter } from "react-icons/ci";
import { TbMenuOrder, TbVocabulary } from "react-icons/tb";
import { useAppSelector } from "@/store/Proto-slice/ProtoStore.slice";
import { RxIdCard } from "react-icons/rx";
import { IconVocabulary } from "@tabler/icons-react";
import dayjs from "dayjs";
import { BsCollection } from "react-icons/bs";
dayjs.extend(relativeTime);
import { PaginationItemType } from "@heroui/react";
import relativeTime from "dayjs/plugin/relativeTime";
import { IoTrashBin, IoTrashBinOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { useGetUserDesksQuery } from "@/api/user service/graphql/user.graphql.api";
import { useRouter } from "@/i18n/routing";
import {
  LibraryRouteStatusType,
  routeProto,
} from "@/store/legacy store/route.slice";
import { useParams } from "next/navigation";
import {
  DeskQueryFilter,
  DeskStatus,
} from "@/api/user service/graphql/types.generated";

const renderItem = ({
  ref,
  key,
  value,
  isActive,
  onNext,
  onPrevious,
  setPage,
  className,
}: PaginationItemRenderProps) => {
  if (value === PaginationItemType.NEXT) {
    return (
      <button
        key={key}
        className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
        onClick={onNext}
      >
        <MdOutlineNavigateNext />
      </button>
    );
  }

  if (value === PaginationItemType.PREV) {
    return (
      <button
        key={key}
        className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
        onClick={onPrevious}
      >
        <MdOutlineNavigateBefore />
      </button>
    );
  }

  if (value === PaginationItemType.DOTS) {
    return (
      <button key={key} className={className}>
        ...
      </button>
    );
  }

  // cursor is the default item
  return (
    <button
      key={key}
      ref={ref}
      className={cn(
        className,
        isActive &&
          "text-white bg-gradient-to-br from-indigo-500 to-pink-500 font-bold"
      )}
      onClick={() => setPage(value)}
    >
      {value}
    </button>
  );
};
const ListBar = () => {
  const { libraryList } = useAppSelector(
    (state) => state.persistedReducer.LibraryPage
  );
  const { isAuthenticatedError } = useAppSelector(
    (state) => state.persistedReducer.auth
  );
  const route = useRouter();
  // * extract the library view status and page from the route
  const { status, page } = useParams<{
    status: LibraryRouteStatusType;
    page: string;
  }>();
  const [filter, setFilter] = useState<DeskQueryFilter>();

  // IMPORTANT : define each page have 20 desk
  const LIMIT = 20;
  const getUserDesks = useGetUserDesksQuery({
    filter: { status: DeskStatus.Drafted },
    limit: LIMIT,
    skip: (Number(page) - 1) * LIMIT,
  });

  useEffect(() => {}, [status, page]);

  return (
    <>
      {getUserDesks.data?.getUserDesks?.desks?.map((item, index) => {
        const dateCreated = dayjs(item?.createdAt);
        const dateNow = dayjs();

        return (
          <Card
            isPressable
            className=" w-full rounded-sm flex flex-row justify-start items-center p-2 md:h-36"
          >
            <Image
              className=" h-full aspect-square  rounded-sm"
              removeWrapper
              src={item?.thumbnail!}
            ></Image>
            <CardBody className=" flex h-full gap-2 mx-2">
              <div className=" flex justify-start items-center gap-4">
                <h1 className=" truncate text-xl font-semibold">
                  {item?.name}
                </h1>
                <Chip size="sm">flashcards</Chip>
              </div>
              <div className=" flex gap-8 ">
                <div className=" flex gap-2 text-sm  font-extralight justify-start items-center">
                  <TbVocabulary></TbVocabulary>
                  {`${0} vocabularies`}
                </div>
                <div className=" flex gap-2 text-sm  font-extralight justify-start items-center">
                  <RxIdCard></RxIdCard>
                  {`${item?.flashcardQuantity!} flashcards`}
                </div>
              </div>

              {/* <div className=" flex justify-start gap-3 items-end flex-1 text-sm font-extralight text-gray-600">
                <Avatar
                  isBordered
                  className="h-6 w-6"
                  src={item.avatarUrl}
                ></Avatar>
                <p>{item.author.name}</p>•<p>{dateCreated.to(dateNow)}</p>
              </div> */}
            </CardBody>
            <CardFooter className=" flex flex-col h-full justify-between items-end">
              <div>
                <Button isIconOnly radius="full" variant="light">
                  <HiDotsVertical />
                </Button>
              </div>
              <div className=" flex justify-end items-center gap-4">
                <Button
                  size="sm"
                  isIconOnly
                  className=" rounded-sm"
                  variant="flat"
                >
                  <IoTrashBin size={18} />
                </Button>
                <Button
                  className=" rounded-sm bg-color-4 text-white text-md"
                  variant="flat"
                  size="sm"
                  startContent={<MdPlayArrow size={20} />}
                >
                  review
                </Button>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
};

export default ListBar;
