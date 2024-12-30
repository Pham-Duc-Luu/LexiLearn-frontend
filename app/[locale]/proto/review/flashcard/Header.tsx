"use client";
import {
  Button,
  Card,
  CardBody,
  Divider,
  ModalProps,
  Navbar,
  NavbarContent,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { IoCaretBack } from "react-icons/io5";

const Header = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] =
    React.useState<ModalProps["scrollBehavior"]>("inside");
  return (
    <div className="grid grid-cols-1 bg-color-4/25n">
      <Navbar maxWidth="full">
        <NavbarContent className=" flex-1 grid gap-4 grid-cols-3">
          <div className="col-span-1 flex items-center   gap-4  justify-start ">
            <Button isIconOnly variant="bordered" radius="sm" size="sm">
              <IoCaretBack size={22} />
            </Button>
            <span>Flashcard</span>
          </div>
        </NavbarContent>
      </Navbar>
      <Divider></Divider>
    </div>
  );
};

export default Header;
