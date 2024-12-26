import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React from "react";
import { MdNavigateNext, MdSearch } from "react-icons/md";

const SearchingArea = () => {
  return (
    <div className=" h-52 bg-color-4/25 flex justify-center items-center">
      <div className=" grid w-full grid-cols-12">
        <div className=" col-span-8 col-start-3 relative">
          <Input
            endContent={<MdNavigateNext size={24} />}
            startContent={<MdSearch size={24} />}
            size="lg"
            className=" mb-2"
          ></Input>
          <Card
            radius="sm"
            className=" absolute bottom-0 w-full hidden"
            style={{
              transform: "translateY(100%)",
            }}
          >
            <CardBody className=" hover:bg-color-4/40 cursor-pointer">
              asdasd
            </CardBody>
            <CardBody>asdasd</CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SearchingArea;
