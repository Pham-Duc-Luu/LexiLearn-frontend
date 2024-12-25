import React, { memo, useEffect } from "react";
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
  CustomtNodeType,
  deleteNode,
} from "@/store/Proto-slice/CardNode.proto.slice";
import { useAppDispatch } from "@/store/Proto-slice/ProtoStore";
import { useAppSelector } from "@/store/Proto-slice/ProtoStore";
import { MdDeleteOutline } from "react-icons/md";

const CustomExampleNode = ({
  data,
  isConnectable,
  positionAbsoluteX,
  id,
  positionAbsoluteY,
}: NodeProps<CustomtNodeType>) => {
  const dispatch = useAppDispatch();

  return (
    <div className="">
      <NodeResizer></NodeResizer>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <Card className="py-4" radius="sm">
        <CardHeader className=" drag-handle__label drag-handle__custom pb-0  pt-2 px-4 flex justify-between items-center ">
          <span className=" text-2xl font-bold">Example</span>
          <Button
            isIconOnly
            onClick={() => {
              dispatch(deleteNode(id));
            }}
          >
            <MdDeleteOutline size={28} />
          </Button>
        </CardHeader>
        <Divider className="my-2"></Divider>
        <CardBody className="overflow-visible py-2  cursor-default">
          <div className=" flex gap-4 ">
            <Textarea
              disableAnimation
              className=" w-[200px]"
              width={200}
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
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default memo(CustomExampleNode);
