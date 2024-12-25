"use client";
import { Button, Navbar } from "@nextui-org/react";
import React from "react";
import { FaBars } from "react-icons/fa";
import SparklesText from "./magicui/sparkles-text";
import { useAppDispatch } from "@/store/Proto-slice/ProtoStore";
import { toggleSideBar } from "@/store/Proto-slice/HomePage.proto.slice";

const NavBarProtoV1 = () => {
  const dispatch = useAppDispatch();
  return (
    <Navbar className=" flex justify-between">
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
    </Navbar>
  );
};

export default NavBarProtoV1;
