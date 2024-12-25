import React, { memo, useEffect, useState } from "react";
import {
  Handle,
  NodeProps,
  Position,
  Node,
  NodeResizeControl,
  useReactFlow,
  useNodeId,
  NodeResizer,
  NodeToolbar,
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
  ButtonGroup,
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
  addExampleToCurrentCardItem,
  addMeanToCurrentCardItem,
  CardContent,
  CustomtNodeType,
  initNode,
  onNodeContentsChange,
  ReoderVocabCardItem,
} from "@/store/Proto-slice/newDesk.slice";
import { languages } from "@/store/Proto-slice/newDesk.slice";
import { RiArrowDropDownLine } from "react-icons/ri";
import FileImportButton from "../../create/collection/FileImportButton";
import ImageFileZone from "@/components/cuicui/ImageFileZone";
import {
  MdAbc,
  MdAddCircleOutline,
  MdAutoFixHigh,
  MdBorderColor,
} from "react-icons/md";
import * as _ from "lodash";
const CustomFrontNode = ({
  data,
  isConnectable,
  positionAbsoluteX,
  positionAbsoluteY,
  type,
}: NodeProps<CustomtNodeType>) => {
  const dispatch = useAppDispatch();
  const { allNodes } = useAppSelector((state) => state.NewDesk);

  const { currentReoderCardIndex, reoderCards } = useAppSelector(
    (state) => state.NewDesk
  );

  const [frontCard, setCfrontCard] = useState<CardContent>();

  useEffect(() => {
    const card = _.find(reoderCards, function (o) {
      return o.id == currentReoderCardIndex;
    });
    card?.word && setCfrontCard(card.word);
  }, [
    _.find(reoderCards, function (o) {
      return o.id == currentReoderCardIndex;
    }),
    reoderCards,
  ]);

  return (
    <div className="" style={{ width: 442, height: 168 }}>
      {/* <NodeResizer></NodeResizer> */}
      <Handle
        type="source"
        position={Position.Right}
        id={allNodes[0]?.id}
        className=""
        style={{ height: 16, width: 16 }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      ></Handle>

      <Card className=" shadow-xl border-1" radius="sm">
        <CardHeader className="   py-4 drag-handle__label drag-handle__custom  light: pt-2 px-4 flex justify-between items-center ">
          <div className=" flex justify-center items-center gap-4">
            <MdAbc size={20} />

            <span className=" font-bold">
              {frontCard?.index && frontCard?.index + 1}
            </span>
          </div>
          <Dropdown radius="sm">
            <DropdownTrigger>
              <Button variant="bordered" isIconOnly size="sm">
                <IoAdd size={28} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                startContent={<MdAddCircleOutline />}
                key="Meaning"
                onPress={() => {
                  // dispatch(addNode("mean"));
                  dispatch(addMeanToCurrentCardItem(""));
                }}
              >
                Meaning
              </DropdownItem>
              <DropdownItem
                key="Exapmles"
                startContent={<MdBorderColor />}
                onPress={() => {
                  dispatch(addExampleToCurrentCardItem(""));
                  // dispatch(addNode("example"));
                }}
              >
                Exapmles
              </DropdownItem>
              <DropdownItem
                key="Exapmles"
                startContent={<MdAutoFixHigh />}
                onPress={() => {}}
              >
                Auto genenate
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <Divider className=""></Divider>
        <CardBody className="overflow-visible py-2  cursor-default">
          <div className=" flex gap-4 justify-center items-center ">
            {/* <Textarea
              disableAnimation
              disableAutosize
              classNames={{
                base: "max-w-xs",
                input: "resize-y min-h-[70px] w-[300px]",
              }}
              minRows={4}
              maxRows={6}
              variant="bordered"
              onChange={(e) => {
                // data.onTextChange && data.onTextChange(e.target.value);
              }}
            ></Textarea> */}
            <Input
              value={frontCard?.text ? frontCard?.text : ""}
              size="lg"
              onChange={(e) => {
                dispatch(
                  onNodeContentsChange({
                    data: { ...frontCard, text: e.target.value },
                    type,
                  })
                );
              }}
              className=" text-lg"
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
                {frontCard?.lanuage ? frontCard.lanuage : "lanuage"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu selectionMode="single">
              {languages.map((item, index) => {
                return (
                  <DropdownItem
                    onSelect={(e) => {
                      dispatch(
                        onNodeContentsChange({
                          data: { ...frontCard, lanuage: item },
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
    </div>
  );
};

export default memo(CustomFrontNode);
