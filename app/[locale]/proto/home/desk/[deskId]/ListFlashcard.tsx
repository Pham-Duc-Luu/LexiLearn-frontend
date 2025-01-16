"use client";
import { IPreviewFlashcard } from "@/store/Proto-slice/Desk.proto.slice";
import { useAppSelector } from "@/store/Proto-slice/ProtoStore.slice";
import { Card, CardBody, Divider, Image } from "@nextui-org/react";
import React from "react";

const FlashcardPre = ({ data }: { data: IPreviewFlashcard }) => {
  return (
    <Card className=" rounded-md">
      <CardBody className=" flex justify-center items-center gap-4 flex-row">
        <div className=" flex-1 flex items-center justify-start gap-4 text-lg font-bold">
          <Image
            height={80}
            className=" aspect-square rounded-md"
            src={data.frontImage}
          />
          <div>{data.front}</div>
        </div>
        <Divider orientation="vertical" className=" h-20"></Divider>
        <div className=" flex-1 flex items-center justify-start gap-4 text-lg font-bold">
          <Image
            className=" aspect-square rounded-md"
            height={80}
            src={data.backImage}
          />
          <div>{data.back}</div>
        </div>
      </CardBody>
    </Card>
  );
};
const ListFlashcard = () => {
  const { deskInfo, previewFlashcards } = useAppSelector(
    (state) => state.DeskPage
  );

  return (
    <div className=" py-4 px-16 flex flex-col gap-3">
      {previewFlashcards &&
        previewFlashcards.length > 0 &&
        previewFlashcards.map((card, index) => {
          return <FlashcardPre data={card}></FlashcardPre>;
        })}
    </div>
  );
};

export default ListFlashcard;
