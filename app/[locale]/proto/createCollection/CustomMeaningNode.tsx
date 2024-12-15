import React, { memo, useEffect } from "react";
import { Handle, NodeProps, Position, Node } from "@xyflow/react";
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

type CustomMeanningNodeData = {
  width: number;
  height: number;
  onTextChange: () => {};
  onRemove: () => void;
  onChange: () => void;
};
type CustomMeaninNode = Node<CustomMeanningNodeData, "size">;

const CustomMeaninNode = ({
  data,
  isConnectable,
}: NodeProps<CustomMeaninNode>) => {
  const [ref, nodeSize] = useMeasure();
  useEffect(() => {
    if (nodeSize.height) {
      data.height = nodeSize.height;
    }
    if (nodeSize.width) {
      data.width = nodeSize.width;
    }
  }, [nodeSize]);
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <Card className="py-4" radius="sm" ref={ref}>
        <CardHeader className="pb-0  pt-2 px-4 flex justify-between items-center ">
          <span className=" text-2xl font-bold">Front</span>
          <Button isIconOnly>
            <FaRegPlayCircle size={28} />
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
              onChange={(e) => {
                // data.onTextChange && data.onTextChange(e.target.value);
              }}
            ></Textarea>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CustomMeaninNode;
