"use client";
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
import { Button, Divider } from "@nextui-org/react";
import { MdAdd } from "react-icons/md";
import { PiDotsNineBold } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useAnimation } from "framer-motion";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DndGroup from "./DndGroup";
import { initNode } from "@/store/Proto-slice/newDesk.slice";

const SideCardOrderItem = ({ item }: { item: ReoderVocabCardItem }) => {
  return <Reorder.Item value={item}></Reorder.Item>;
};
const SideCard = ({}) => {
  const { reoderCards } = useAppSelector((state) => state.NewDesk);
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollAnimation = useAnimation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
    <Card radius="none" className=" col-start-1 col-span-3">
      <CardHeader>
        <span className="text-lg font-bold">List of vocabulary</span>
      </CardHeader>
      <Divider></Divider>
      <CardBody className=" flex flex-col gap-4">
        <DndGroup></DndGroup>
        <div>
          <Button
            className="rounded-sm flex-1 w-full bg-color-4/20 border-color-4 border-x-2 border-t-2 border-b-4 "
            startContent={<MdAdd />}
            onPress={() => handleAddVocabulary()}
          >
            add vocabulary
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default SideCard;
