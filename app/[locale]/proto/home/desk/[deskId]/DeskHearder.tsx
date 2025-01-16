"use client";
import PressableButton from "@/components/PressableButton";
import { useAppSelector } from "@/store/Proto-slice/ProtoStore.slice";
import { Avatar, Button, Card, CardBody, Chip, Image } from "@nextui-org/react";
import React from "react";
import { BsSave2 } from "react-icons/bs";
import { FaRegClone } from "react-icons/fa";
import { GiCardExchange } from "react-icons/gi";
import { MdPlayArrow } from "react-icons/md";
const DeskHearder = () => {
  const { deskInfo } = useAppSelector((state) => state.DeskPage);
  return (
    <div className=" p-4">
      <Card className=" h-64 rounded-sm flex justify-center gap-4 flex-row  items-center p-4">
        <Image
          src={deskInfo.thumbnail}
          removeWrapper
          className=" h-52 rounded-sm aspect-square"
        />
        <CardBody className=" flex-1 gap-4 h-full flex flex-col justify-center items-start">
          <div className=" flex-1 flex justify-start items-start flex-col gap-4">
            <div className=" text-lg font-bold">{deskInfo.name}</div>
            <div className=" flex justify-center items-center gap-2 cursor-pointer">
              {/* <Avatar
                className="w-5 h-5"
                isBordered
                src={deskInfo.author?.avatarUrl}
              />
              <div>{deskInfo.author?.name}</div> */}
              <Chip
                avatar={<Avatar name="JW" src={deskInfo.author?.avatarUrl} />}
                variant="bordered"
                size="lg"
              >
                {deskInfo.author?.name}
              </Chip>
              •
              <Chip
                startContent={<GiCardExchange />}
                variant="bordered"
                size="lg"
              >
                {deskInfo.numberOfFlashcards} flashcards
              </Chip>
            </div>
          </div>
          <div className=" flex w-full items-center justify-between">
            <div className=" flex gap-4">
              <Button
                className=" rounded-sm"
                variant="bordered"
                startContent={<FaRegClone />}
              >
                Clone
              </Button>
              <Button
                className=" rounded-sm"
                variant="bordered"
                startContent={<BsSave2 />}
              >
                Save
              </Button>
            </div>
            <div>
              <Button
                className=" rounded-sm bg-color-4/20 border-color-4 border-x-2 border-t-2 border-b-4"
                startContent={<MdPlayArrow />}
              >
                Start reivew
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DeskHearder;
