import { Input } from "@heroui/react";
import React from "react";
import { MdSearch } from "react-icons/md";

const SearchInput = () => {
  return (
    <>
      <Input
        startContent={<MdSearch />}
        placeholder="find in your library"
        className=" rounded-sm sticky top-0 z-20"
        variant="bordered"
        radius="sm"
      />
    </>
  );
};

export default SearchInput;
