import React, { memo, useEffect, useState } from "react";
import {
  Handle,
  NodeProps,
  Position,
  Node,
  useNodeId,
  useReactFlow,
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
import { MdAddCircleOutline, MdDeleteOutline } from "react-icons/md";
import {
  CardContent,
  CustomtNodeType,
  deleteNode,
  languages,
  onNodeContentsChange,
  ReoderVocabCardItem,
} from "@/store/Proto-slice/newDesk.slice";
import { useAppDispatch } from "@/store/hooks";
import ImageFileZone from "@/components/cuicui/ImageFileZone";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useAppSelector } from "@/store/Proto-slice/ProtoStore";
import * as _ from "lodash";
const CustomMeaninNode = ({
  data,
  isConnectable,
  positionAbsoluteX,
  positionAbsoluteY,
  type,
  id,
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
    card?.word && setNodeCard(card.mean);
  }, [
    _.find(reoderCards, function (o) {
      return o.id == currentReoderCardIndex;
    }),
    reoderCards,
  ]);

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <Card className=" shadow-xl border-1" radius="sm">
        <CardHeader className=" py-4 drag-handle__label drag-handle__custom  light: pt-2 px-4 flex justify-between items-center ">
          <div className=" flex justify-center items-center gap-4">
            <MdAddCircleOutline size={20} />
            <span className=" font-bold">meaning</span>
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
            <Input
              value={nodeCard?.text}
              size="lg"
              onChange={(e) => {
                dispatch(
                  onNodeContentsChange({
                    data: { ...nodeCard, text: e.target.value },
                    type,
                  })
                );
              }}
              className=" text-lg w-80"
              radius="sm"
            ></Input>
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
                {nodeCard?.lanuage ? nodeCard.lanuage : "lanuage"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu selectionMode="single">
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
                    key={item}
                  >
                    {item}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </CardFooter>
      </Card>
    </>
  );
};

export default CustomMeaninNode;
