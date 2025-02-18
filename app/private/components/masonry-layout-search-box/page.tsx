"use client";
import { useSearchPhotosMutation } from "@/api/search/search.photo.api";
import { LayoutGrid } from "@/components/aceternity/layout-grid";
import DropImageModalButton, {
  SearchImageComponentTabs,
} from "@/components/ImageSeachModalButton";
import { faker } from "@faker-js/faker";
import { Input, Tab } from "@heroui/react";
import ImageList from "@mui/material/ImageList/ImageList";
import ImageListItem from "@mui/material/ImageListItem/ImageListItem";
import { useDebounce } from "@uidotdev/usehooks";
import React, { useEffect } from "react";
import { Progress } from "@heroui/react";
import { Image } from "@heroui/react";
import { AiOutlineSearch } from "react-icons/ai";

const ImageLayout = () => {
  const [searchTerm, setSearchTerm] = React.useState("cats");
  const debouncedSearchTerm = useDebounce(searchTerm, 800);

  const [searchPhotosMutation, searchPhotosMutationResult] =
    useSearchPhotosMutation({});

  useEffect(() => {
    searchPhotosMutation({ limit: 30, q: debouncedSearchTerm! });
  }, [debouncedSearchTerm]);

  return (
    <>
      <Input
        startContent={<AiOutlineSearch size={20} />}
        className=" w-full my-2 rounded-sm"
        placeholder="Search for ..."
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="bordered"
      ></Input>
      {searchPhotosMutationResult.isLoading && (
        <Progress
          isIndeterminate
          aria-label="Loading..."
          className="max-w-full"
          size="sm"
        />
      )}

      <div className=" flex-1 overflow-y-scroll w-full relative">
        {searchPhotosMutationResult.data?.metadata && (
          <ImageList variant="masonry" cols={3} gap={12}>
            {searchPhotosMutationResult.data?.metadata.map((item) => (
              <ImageListItem key={item.id}>
                <Image
                  srcSet={item.photo_image_url}
                  src={item.photo_image_url}
                  alt={item.photo_description}
                  isZoomed={true}
                  loading="lazy"
                  className=" cursor-pointer"
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </div>
    </>
  );
};

const page = () => {
  return (
    <>
      <DropImageModalButton
        modalProps={{ isDismissable: false, isOpen: true }}
        tabProps={{ defaultSelectedKey: "search" }}
        tab={
          <Tab
            key="search"
            className="h-full flex flex-col justify-center items-center"
            title={
              <div className=" flex justify-center gap-1 items-center">
                <AiOutlineSearch size={20} />
                <span>search</span>
              </div>
            }
          >
            <ImageLayout></ImageLayout>
          </Tab>
        }
      ></DropImageModalButton>
    </>
  );
};

export default page;
