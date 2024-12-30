"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import { SlOptionsVertical } from "react-icons/sl";
import { BiCopy, BiLike, BiShareAlt, BiSolidLike } from "react-icons/bi";
import { faker } from "@faker-js/faker";

export type CardType = {
  id: number;
  title: string;
  description: string;

  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: CardType[] }) => {
  const [selected, setSelected] = useState<CardType | null>(null);
  const [lastSelected, setLastSelected] = useState<CardType | null>(null);

  const handleClick = (card: CardType) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const [islike, setIslike] = useState<boolean>(false);

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };
  // const [cards, setCard] = useState(
  //   Array.from({ length: 30 }, (item, index) => {
  //     return {
  //       id: index + 1,
  //       content: <SkeletonOne />,
  //       className: "md:col-span-1",
  //       thumbnail: faker.image.urlPicsumPhotos(),
  //     };
  //   })
  // );
  return (
    <div className=" grid lg:grid-cols-12 grid-cols-4 md:grid-cols-8  gap-6 p-10 ">
      {cards?.map((card, i) => (
        <div key={i} className={cn("col-span-3 ")}>
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
              className=" border-2 w-full h-full border-gray-400 "
              onPress={() => handleClick(card)}
            >
              <CardBody className=" p-0">
                <Image
                  className="w-full object-cover h-[240px]"
                  radius="sm"
                  width="100%"
                  src={card.thumbnail}
                />
              </CardBody>
              <CardFooter className="text-small justify-between flex">
                <b className="truncate  ">{card.title}</b>
                <div className="flex justify-center items-center">
                  {islike ? (
                    <Button isIconOnly variant="flat" radius="full">
                      <BiSolidLike size={20} />
                    </Button>
                  ) : (
                    <Button variant="light" radius="full" isIconOnly>
                      <BiLike size={20} />
                    </Button>
                  )}
                  <Button variant="light" radius="full" isIconOnly>
                    <SlOptionsVertical size={20} />
                  </Button>
                </div>
              </CardFooter>
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

const AvatarUserCard = () => {
  return (
    <div className=" flex gap-4 ">
      <Avatar isBordered={true} src={faker.image.urlPicsumPhotos()}></Avatar>
      <div className=" flex flex-col justify-start items-start">
        <p className=" text-sm font-thin"> create by</p>
        <span className=" font-bold">{faker.person.fullName()}</span>
      </div>
    </div>
  );
};

const SelectedCard = ({ selected }: { selected: CardType | null }) => {
  return (
    <div
      // style={{
      //   backgroundImage: `url(${selected?.thumbnail})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
      className="bg-transparent a h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]"
    >
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
        className="relative w-full h-full z-[70]"
      >
        <Card
          className="col-span-12 sm:col-span-4 h-full border-2 cursor-default  border-gray-400  "
          radius="sm"
        >
          <div className=" max-h-20 ">
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-20 object-cover rounded-t-sm rounded-b-none"
              src={selected?.thumbnail}
            />
          </div>
          <CardBody className=" ">
            <AvatarUserCard></AvatarUserCard>
            <div className=" pt-4">
              <h1 className=" font-bold">{selected?.title}</h1>
              <h1>{selected?.description}</h1>
              <span className=" font-light text-sm">{`${faker.number.int({
                min: 20,
                max: 100,
              })} vocabularys • ${faker.number.int({
                min: 20,
                max: 100,
              })} flashcards`}</span>
            </div>
          </CardBody>
          <Divider></Divider>
          <CardFooter className=" flex justify-between p-4">
            <Button isIconOnly radius="sm" variant="flat" className=" w-36">
              <BiLike size={24} />
            </Button>
            <div className=" flex justify-center items-center gap-4">
              <Button
                startContent={<BiShareAlt size={24} />}
                radius="sm"
                variant="light"
                className=" "
              >
                Share
              </Button>
              <Button isIconOnly radius="sm" variant="light" className=" ">
                <BiCopy size={24} />
              </Button>
              <Button isIconOnly radius="sm" variant="light" className=" ">
                <SlOptionsVertical size={24} />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};
