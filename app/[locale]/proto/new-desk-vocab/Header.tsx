import { Button, Divider, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { IoCaretBack } from "react-icons/io5";
import { MdArrowBackIos } from "react-icons/md";

const Header = () => {
  return (
    <div>
      <Navbar className=" flex justify-start gap-4 ">
        <NavbarContent>
          <Button isIconOnly variant="bordered" radius="sm" size="sm">
            <IoCaretBack size={22} />
          </Button>
          <span>Create new desk</span>
        </NavbarContent>
      </Navbar>
      <Divider></Divider>
    </div>
  );
};

export default Header;
