import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import React, { useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Reorder } from "framer-motion";
import {
  addReoderVocabCard,
  removReoderVocabCard,
  ReoderVocabCardItem,
  setReoderVocabCard,
} from "@/store/Proto-slice/newDesk.slice";
import { useAppSelector } from "@/store/Proto-slice/ProtoStore.slice";
import { useAppDispatch } from "@/store/hooks";
import { MdAdd } from "react-icons/md";
import { useAnimation } from "framer-motion";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import DndGroup from "./DndGroup";
import { initNode } from "@/store/Proto-slice/newDesk.slice";
import SideCard from "./SideCard";
import { FaList } from "react-icons/fa";
const ListFlashcardDrawer = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { reoderCards } = useAppSelector((state) => state.NewDesk);
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleAddVocabulary = () => {
    dispatch(addReoderVocabCard());
    dispatch(initNode());
    // Scroll to the bottom of the container
    if (scrollRef.current) {
      scrollRef.current.scroll({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <Button
        onPress={onOpen}
        className=" rounded-sm bg-color-4 text-white"
        startContent={<FaList />}
      >
        flashcards list
      </Button>
      <Drawer
        radius="sm"
        backdrop="blur"
        isDismissable={false}
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
                <SideCard></SideCard>
              </DrawerBody>
              <DrawerFooter>
                <Button
                  className="rounded-sm flex-1 w-full bg-color-4/20 border-color-4 border-x-2 border-t-2 border-b-4 "
                  startContent={<MdAdd />}
                  onPress={() => handleAddVocabulary()}
                >
                  add vocabulary
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ListFlashcardDrawer;
