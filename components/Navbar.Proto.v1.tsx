"use client";
import { Avatar, Button, Navbar } from "@nextui-org/react";
import React from "react";
import { FaBars } from "react-icons/fa";
import SparklesText from "./magicui/sparkles-text";
import { useAppDispatch } from "@/store/Proto-slice/ProtoStore.slice";
import { toggleSideBar } from "@/store/Proto-slice/HomePage.proto.slice";
import { BiBell } from "react-icons/bi";
const NavBarProtoV1 = () => {
  const dispatch = useAppDispatch();
  return (
    <Navbar className=" flex justify-between flex-1 max-h-16" maxWidth="full">
      <div className="flex justify-center items-center gap-6 m-2">
        <Button
          isIconOnly
          variant="light"
          radius="full"
          onPress={() => dispatch(toggleSideBar())}
        >
          <FaBars size={20} />
        </Button>
        <SparklesText
          text="LexiLearn"
          sparklesCount={4}
          className=" text-xl"
        ></SparklesText>
      </div>
      <div className=" flex gap-4 ">
        <Button isIconOnly variant="bordered" radius="sm">
          <BiBell size={26} />
        </Button>
        <Avatar
          isBordered={true}
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
      </div>
    </Navbar>
  );
};

export default NavBarProtoV1;
