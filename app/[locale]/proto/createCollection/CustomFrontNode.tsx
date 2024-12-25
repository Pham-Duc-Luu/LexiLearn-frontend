import React, { memo, useEffect } from "react";
import {
  Handle,
  NodeProps,
  Position,
  Node,
  NodeResizeControl,
  useReactFlow,
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

import { useAppDispatch } from "@/store/Proto-slice/ProtoStore";
import { useAppSelector } from "@/store/Proto-slice/ProtoStore";
import {
  addNode,
  CustomtNodeType,
} from "@/store/Proto-slice/CardNode.proto.slice";

const CustomFrontNode = ({
  data,
  isConnectable,
  positionAbsoluteX,
  positionAbsoluteY,
}: NodeProps<CustomtNodeType>) => {
  const dispatch = useAppDispatch();
  const { allNodes } = useAppSelector((state) => state.CardNode);
  const nodeId = useNodeId();
  const reactFlow = useReactFlow();

  return (
    <div className="">
      <NodeResizer></NodeResizer>
      <Handle
        type="source"
        position={Position.Right}
        id={allNodes[0].id}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <Card className="py-4" radius="sm">
        <CardHeader className=" drag-handle__label drag-handle__custom pb-0  pt-2 px-4 flex justify-between items-center ">
          <span className=" text-2xl font-bold">Front</span>
          <Button isIconOnly>
            <FaRegPlayCircle size={28} />
          </Button>
        </CardHeader>
        <Divider className="my-2"></Divider>
        <CardBody className="overflow-visible py-2  cursor-default">
          <div className=" flex gap-4 ">
            <Textarea
              disableAnimation
              disableAutosize
              classNames={{
                base: "max-w-xs",
                input: "resize-y min-h-[40px]",
              }}
              minRows={4}
              maxRows={6}
              variant="bordered"
              onChange={(e) => {
                // data.onTextChange && data.onTextChange(e.target.value);
              }}
            ></Textarea>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" isIconOnly>
                  <IoAdd size={28} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="Meaning"
                  onPress={() => {
                    dispatch(addNode("meaningNode"));
                  }}
                >
                  Meaning
                </DropdownItem>
                <DropdownItem
                  key="Exapmles"
                  onPress={() => {
                    dispatch(addNode("exampleNode"));
                  }}
                >
                  Exapmles
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default memo(CustomFrontNode);
