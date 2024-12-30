import React, { memo, useEffect, useState } from "react";
import {
  Handle,
  NodeProps,
  Position,
  Node,
  NodeResizeControl,
  useNodeId,
  NodeResizer,
} from "@xyflow/react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Textarea,
  Button,
  Divider,
  Input,
  CardFooter,
} from "@nextui-org/react";
import { FaRegPlayCircle } from "react-icons/fa";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/react";
import { IoAdd } from "react-icons/io5";
import { useMeasure } from "@/hooks/use-measure";
import {
  CardContent,
  CustomtNodeType,
  deleteNode,
  languages,
  onNodeContentsChange,
  ReoderVocabCardItem,
} from "@/store/Proto-slice/newDesk.slice";
import { useAppDispatch } from "@/store/Proto-slice/ProtoStore.slice";
import { useAppSelector } from "@/store/Proto-slice/ProtoStore.slice";
import { MdBorderColor, MdDeleteOutline } from "react-icons/md";
import * as _ from "lodash";
import ImageFileZone from "@/components/cuicui/ImageFileZone";
import { RiArrowDropDownLine } from "react-icons/ri";
const CustomExampleNode = ({
  data,
  isConnectable,
  positionAbsoluteX,
  id,
  positionAbsoluteY,
  type,
}: NodeProps<CustomtNodeType>) => {
  const dispatch = useAppDispatch();

  const { allNodes } = useAppSelector((state) => state.NewDesk);

  const { currentReoderCardIndex, reoderCards } = useAppSelector(
    (state) => state.NewDesk
  );

  const [nodeCard, setNodeCard] = useState<CardContent>();

  useEffect(() => {
    const card = _.find(reoderCards, function (o) {
      return o.id == currentReoderCardIndex;
    });
    const exampleCard = _.find(card?.examples, function (o) {
      return o.index == data.index;
    });
    exampleCard && setNodeCard(exampleCard);
  }, [
    _.find(reoderCards, function (o) {
      return o.id == currentReoderCardIndex;
    }),
    reoderCards,
  ]);
  return (
    <div className="">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <Card className=" shadow-xl border-1" radius="sm">
        <CardHeader className=" py-4 drag-handle__label drag-handle__custom  light: pt-2 px-4 flex justify-between items-center ">
          <div className=" flex justify-center items-center gap-4">
            <MdBorderColor size={20} />
            <span className=" font-bold">example</span>
          </div>
          <Button
            radius="full"
            isIconOnly
            variant="light"
            color="danger"
            onClick={() => {
              dispatch(deleteNode(id));
            }}
          >
            <MdDeleteOutline size={20} />
          </Button>
        </CardHeader>
        <Divider className=""></Divider>
        <CardBody className="overflow-visible py-2  cursor-default">
          <div className=" flex gap-4 justify-center items-center ">
            <Textarea
              onChange={(e) => {
                dispatch(
                  onNodeContentsChange({
                    data: { ...nodeCard, text: e.target.value },
                    type,
                  })
                );
              }}
              value={data.index != undefined && nodeCard ? nodeCard.text : ""}
              size="lg"
              className=" text-lg w-80"
              radius="sm"
            ></Textarea>
            <ImageFileZone></ImageFileZone>
          </div>
        </CardBody>
        <Divider></Divider>

        <CardFooter className="p-0 flex justify-end">
          <Dropdown placement="bottom" radius="sm">
            <DropdownTrigger>
              <Button
                variant="bordered"
                radius="none"
                size="sm"
                className=" border-0 "
                endContent={<RiArrowDropDownLine size={22} />}
              >
                languages
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {languages.map((item, index) => {
                return (
                  <DropdownItem
                    onSelect={(e) => {
                      dispatch(
                        onNodeContentsChange({
                          data: { ...nodeCard, lanuage: item },
                          type,
                        })
                      );
                    }}
                  >
                    {item}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </CardFooter>
      </Card>
    </div>
  );
};

export default memo(CustomExampleNode);
