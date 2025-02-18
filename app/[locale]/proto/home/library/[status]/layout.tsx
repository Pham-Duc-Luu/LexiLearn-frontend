"use client";
import { useParams } from "next/navigation";
import FilterBlock from "./FilterBlock.component";
import PaginationBlock from "./PaginationBlock.component";
import SearchInput from "./SearchInput.component";
import {
  LibraryRouteStatusType,
  URLParameterType,
} from "@/store/Proto-slice/route.slice";
import { useGetUserDesksQuery } from "@/api/user service/graphql/user.graphql.api";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/Proto-slice/ProtoStore.slice";
import {
  DeskQueryFilter,
  DeskStatus,
} from "@/api/user service/graphql/types.generated";
import { useEffect } from "react";
import { setLibraryList } from "@/store/Proto-slice/LibraryStore.slice";

export const getDeskQueryStatus = (
  status: LibraryRouteStatusType
): DeskStatus | null => {
  switch (status) {
    case "bin":
      return DeskStatus.Bin;
    case "drafted":
      return DeskStatus.Drafted;
    case "published":
      return DeskStatus.Published;
    default:
      return null;
  }
};

export default function layout({ children }: { children: React.ReactNode }) {
  const { status, page } = useParams<URLParameterType>();

  const { deskLimit } = useAppSelector(
    (state) => state.persistedReducer.LibraryPage
  );

  const getUserDesks = useGetUserDesksQuery({
    limit: deskLimit,
    skip: (Number(page!) - 1) * deskLimit,
    filter: {
      status: getDeskQueryStatus(status),
    },
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (getUserDesks.isSuccess) {
      getUserDesks.data.getUserDesks?.desks &&
        dispatch(setLibraryList(getUserDesks.data.getUserDesks?.desks));
    }
  }, [getUserDesks]);

  return (
    <>
      <div className=" col-span-9 p-4 flex flex-col">
        <SearchInput></SearchInput>
        <FilterBlock></FilterBlock>
        <div className=" overflow-y-scroll flex-1 relative">
          <div className=" absolute w-full gap-2 flex flex-col p-2 justify-center items-center">
            {children}
          </div>
        </div>
        <div className="w-full m-2 flex justify-center items-center">
          <PaginationBlock
            page={Number(page!)}
            total={
              getUserDesks.data?.getUserDesks?.total
                ? Math.ceil(getUserDesks.data?.getUserDesks?.total / deskLimit)
                : 1
            }
          ></PaginationBlock>
        </div>
      </div>
    </>
  );
}
