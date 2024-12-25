import React, { memo, useEffect } from "react";
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
import { MdDeleteOutline } from "react-icons/md";
import {
  CustomtNodeType,
  deleteNode,
} from "@/store/Proto-slice/CardNode.proto.slice";
import { useAppDispatch } from "@/store/hooks";

const CustomMeaninNode = ({
  isConnectable,
  id,
}: NodeProps<CustomtNodeType>) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <NodeResizer></NodeResizer>

      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <Card className="py-4" radius="sm">
        <CardHeader className="drag-handle__label drag-handle__custom pb-0  pt-2 px-4 flex justify-between items-center ">
          <span className=" text-2xl font-bold">Meaning</span>
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
          <div className=" flex gap-4">
            <Textarea
              disableAnimation
              disableAutosize
              classNames={{
                base: "max-w-xs",
                input: "resize-y min-h-[40px]",
              }}
              variant="bordered"
              onChange={(e) => {}}
            ></Textarea>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CustomMeaninNode;
