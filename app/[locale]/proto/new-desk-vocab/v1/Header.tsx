"use client";
import {
  Button,
  Card,
  CardBody,
  Divider,
  ModalProps,
  Navbar,
  NavbarContent,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { IoCaretBack } from "react-icons/io5";
import { MdArrowBackIos, MdOutlineImage } from "react-icons/md";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import { FiEdit } from "react-icons/fi";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HeaderStyle from "./Header.module.scss";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import "./Header.css";
import TitleEditor from "./TitleEditor";
import DescriptionEditor from "./DescriptionEditor";
import ImageEditor from "./ImageEditor";
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
            <span>Create new desk</span>
          </div>

          <div className="col-span-1  flex items-center   gap-4  justify-center">
            <Button
              variant="bordered"
              radius="sm"
              onPress={onOpen}
              startContent={<FiEdit />}
            >
              Open Modal
            </Button>
            <Modal
              backdrop="blur"
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              radius="sm"
              isDismissable={false}
              scrollBehavior={scrollBehavior}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1 justify-center items-center">
                      Give your desk a title
                    </ModalHeader>
                    <Divider></Divider>
                    <ModalBody
                      className="[&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                    >
                      <div className="editor-container">
                        <TitleEditor />
                        <DescriptionEditor />
                        <ImageEditor></ImageEditor>
                      </div>

                      <Card
                        radius="sm"
                        className=" shadow-md border-default border-1 mt-6  "
                      >
                        <CardBody className=" flex justify-between items-center flex-row ">
                          <p>Add to your desk</p>
                          <div>
                            <Button isIconOnly radius="full" variant="light">
                              <MdOutlineImage size={20} />
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        className=" bg-color-4 text-medium w-full text-white "
                        radius="sm"
                      >
                        keep editing vocabulary
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </NavbarContent>
      </Navbar>
      <Divider></Divider>
    </div>
  );
};

export default Header;
