import { faker } from "@faker-js/faker";
import { Button } from "@nextui-org/react";
import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { MdAutorenew } from "react-icons/md";

const InforBar = () => {
  return (
    <div className=" col-span-3 p-8">
      <div className=" text-xl font-bold">Library </div>
      <div className=" my-3 flex w-full flex-col gap-4">
        <Button
          startContent={<MdAutorenew />}
          endContent={<div>{faker.number.int({ max: 100 })}</div>}
          className=" w-full flex justify-start rounded-sm"
          variant="flat"
        >
          <div className=" flex-1 text-start">Previous</div>
        </Button>
        <Button
          startContent={<AiOutlineLike />}
          endContent={<div>{faker.number.int({ max: 100 })}</div>}
          className=" w-full flex justify-start rounded-sm"
          variant="flat"
        >
          <div className=" flex-1 text-start">Liked</div>
        </Button>
      </div>
    </div>
  );
};

export default InforBar;
