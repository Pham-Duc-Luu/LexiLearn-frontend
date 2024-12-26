"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

type CardType = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        House in the woods
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A serene and tranquil retreat, this house in the woods offers a peaceful
        escape from the hustle and bustle of city life.
      </p>
    </div>
  );
};

export const LayoutGrid = () => {
  const [selected, setSelected] = useState<CardType | null>(null);
  const [lastSelected, setLastSelected] = useState<CardType | null>(null);

  const handleClick = (card: CardType) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };
  const cards: CardType[] = Array.from({ length: 30 }, (item, index) => {
    return {
      id: index + 1,
      content: <SkeletonOne />,
      className: "md:col-span-1",
      thumbnail: faker.image.urlPicsumPhotos(),
    };
  });
  return (
    <div className=" grid lg:grid-cols-12 grid-cols-4 md:grid-cols-8  gap-6 p-4 ">
      {cards.map((card, i) => (
        <div key={i} className={cn("col-span-2")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              "relative overflow-hidden  ",
              selected?.id === card.id
                ? "rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                : lastSelected?.id === card.id
                ? "z-40 bg-white rounded-xl h-full w-full"
                : "bg-white rounded-xl h-full w-full"
            )}
            layoutId={`card-${card.id}`}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <Card
              isFooterBlurred
              isPressable
              className=" border-2 w-full h-full border-white/20"
              radius="lg"
            >
              <CardBody className=" p-0">
                <Image
                  className="w-full object-cover h-[140px]"
                  radius="lg"
                  shadow="sm"
                  width="100%"
                  src={faker.image.urlPicsumPhotos()}
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b className="truncate">{faker.book.title()}</b>
                <p className="text-default-500">{faker.finance.amount()}</p>
              </CardFooter>
              {/* <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Available soon.</p>
              <Button
                className="text-tiny text-white bg-black/20"
                color="default"
                radius="lg"
                size="sm"
                variant="flat"
              >
                Notify me
              </Button>
            </CardFooter> */}
            </Card>
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};

const ImageComponent = ({ card }: { card: CardType }) => {
  return (
    <>
      <Card
        isFooterBlurred
        isPressable
        className=" border-2 h-full border-white/20"
        radius="lg"
      >
        <CardBody className=" p-0 overflow-hidden">
          <Image
            className=" object-fill "
            radius="lg"
            shadow="sm"
            width={"100%"}
            src={faker.image.urlPicsumPhotos()}
          />
        </CardBody>
        <CardFooter className="text-small justify-between">
          <b className="truncate">{faker.book.title()}</b>
          <p className="text-default-500">{faker.finance.amount()}</p>
        </CardFooter>
        {/* <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white/80">Available soon.</p>
              <Button
                className="text-tiny text-white bg-black/20"
                color="default"
                radius="lg"
                size="sm"
                variant="flat"
              >
                Notify me
              </Button>
            </CardFooter> */}
      </Card>
    </>
  );
};

const SelectedCard = ({ selected }: { selected: CardType | null }) => {
  return (
    <div className="bg-transparent a h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-999"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 100,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative px-8 pb-4 z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
