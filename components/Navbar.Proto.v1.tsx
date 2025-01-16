"use client";
import { Avatar, Button, Navbar, useDisclosure } from "@nextui-org/react";
import React from "react";
import { FaBars } from "react-icons/fa";
import SparklesText from "./magicui/sparkles-text";
import { useAppDispatch } from "@/store/Proto-slice/ProtoStore.slice";
import { toggleSideBar } from "@/store/Proto-slice/HomePage.proto.slice";
import { BiBell } from "react-icons/bi";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { MdHelpOutline, MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { routeProto } from "@/store/route.slice";
import { useRouter } from "@/i18n/routing";
const NotificationSideDrawer = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button isIconOnly variant="bordered" radius="sm" onPress={onOpen}>
        <BiBell size={26} />
      </Button>
      <Drawer
        className=" rounded-sm"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Drawer Title
              </DrawerHeader>
              <DrawerBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export interface AvatarDropdownOptions {
  label: string;
  icon?: React.ReactNode;
  href?: string;
}

const AvatarSerttingDropdown = () => {
  // Important : this is the avatar options
  const options: AvatarDropdownOptions[] = [
    { label: "Profile", icon: <CgProfile />, href: routeProto.PROFILE() },
    { label: "Help & Feedback", icon: <MdHelpOutline /> },
    { label: "Log out", icon: <MdLogout /> },
  ];

  const route = useRouter();
  return (
    <Dropdown className=" rounded-sm" placement="bottom-start">
      <DropdownTrigger>
        <Avatar
          as="button"
          className="transition-transform"
          isBordered={true}
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        {options.map((option, index) => (
          <DropdownItem
            className=" rounded-sm"
            key={index}
            onPress={() => {
              option?.href && route.push(option.href);
            }}
            startContent={option.icon}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

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
        <NotificationSideDrawer></NotificationSideDrawer>
        <AvatarSerttingDropdown></AvatarSerttingDropdown>
      </div>
    </Navbar>
  );
};

export default NavBarProtoV1;
