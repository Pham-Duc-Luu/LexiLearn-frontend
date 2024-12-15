import React, { memo, useEffect } from "react";
import {
  Handle,
  NodeProps,
  Position,
  Node,
  NodeResizeControl,
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

type CustomFrontNodeData = {
  width?: number;
  onTextChange?: (e: string) => {};

  height?: number;
  onAddMeaningNode?: () => void;
  onAddExamplesNode?: () => void;
};
type CustomFrontNode = Node<CustomFrontNodeData, "size">;

const CustomFrontNode = ({
  data,
  isConnectable,
  positionAbsoluteX,
  positionAbsoluteY,
}: NodeProps<CustomFrontNode>) => {
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
    <div className="">
      <Handle
        type="source"
        position={Position.Right}
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
                    data.onAddMeaningNode && data.onAddMeaningNode();
                  }}
                >
                  Meaning
                </DropdownItem>
                <DropdownItem
                  key="Exapmles"
                  onPress={() => {
                    data.onAddExamplesNode && data.onAddExamplesNode();
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
