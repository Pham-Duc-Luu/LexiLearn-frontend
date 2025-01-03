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

import { useAppDispatch } from "@/store/Proto-slice/ProtoStore.slice";
import { useAppSelector } from "@/store/Proto-slice/ProtoStore.slice";
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
import FileImportButton from "../../../create/collection/FileImportButton";
import ImageFileZone from "@/components/cuicui/ImageFileZone";
import {
  MdAbc,
  MdAddCircleOutline,
  MdAutoFixHigh,
  MdBorderColor,
} from "react-icons/md";
import * as _ from "lodash";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import "./Header.css";

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

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        // Use a placeholder:
        // Use different placeholders depending on the node type:
        placeholder: ({ node }) => {
          return "Enter your vocabulary here...";
        },
      }),
    ],
    content: "", // Initial empty content
    onUpdate: ({ editor }) => {
      // Truncate content if there's more than one line
      const content = editor.getText();
      const truncatedContent = content.split("\n")[0]; // Only take the first line
      if (content !== truncatedContent) {
        editor.commands.setContent(truncatedContent);
      }
    },
  });

  return (
    <div className=" bg-white" style={{ width: 442, height: 168 }}>
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

      <Card className=" shadow-xl border-2 border-color-4 bg-color-4/40  rounded-sm">
        <CardHeader className="   py-4 drag-handle__label drag-handle__custom  light: pt-2 px-4 flex justify-between items-center ">
          {/* <div className=" flex text-xl text-white justify-center items-center gap-4">
            <MdAbc size={20} />

            <span className=" font-bold">
              {frontCard?.index && frontCard?.index + 1}
            </span>
          </div> */}
          {/* <Dropdown radius="sm">
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
          </Dropdown> */}
        </CardHeader>
        <CardBody className="overflow-visible py-2   cursor-default">
          <div className=" flex gap-4 justify-center items-center ">
            {/* <Input
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
            ></Input> */}
            <div className="editor-container bg-color-4/70 p-2 h-14 text-white rounded-sm  flex-1">
              <EditorContent editor={editor}></EditorContent>
            </div>
            {/* <ImageFileZone></ImageFileZone> */}
          </div>
        </CardBody>

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
