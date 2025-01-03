"use client";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/Proto-slice/ProtoStore.slice";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import Text from "@tiptap/extension-text";
import "./Header.css";
import * as _ from "lodash";
import { MdOutlineImage } from "react-icons/md";
const BackCard = () => {
  const backText = useEditor({
    extensions: [
      StarterKit,
      Text,

      Placeholder.configure({
        // Use a placeholder:
        // Use different placeholders depending on the node type:
        placeholder: ({ node }) => {
          return "Enter the meaning here...";
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: "text-2xl w-full text-center",
      },
    },
    content: `<p ></p>`, // Initial empty content
    onUpdate: ({ editor }) => {
      // Truncate content if there's more than one line
      const content = editor.getText();

      const truncatedContent = content.split("\n")[0]; // Only take the first line
      if (!content) {
        editor.commands.setContent(`<p ></p>`);
      }
      if (content !== truncatedContent) {
        editor.commands.setContent(`<p ">${truncatedContent}</p>`);
      }
      //   if (content !== truncatedContent) {
      //     editor.commands.setContent(
      //       `<p class="text-2xl">${truncatedContent}</p>`
      //     );
      //   }
    },
  });

  const { currentReoderCardIndex, reoderCards } = useAppSelector(
    (state) => state.NewDesk
  );

  useEffect(() => {
    const card = _.find(reoderCards, function (card) {
      return card.id === currentReoderCardIndex;
    });
    if (card) {
      backText?.commands.setContent(`<p >${card.mean?.text}</p>`);
    }
  }, [currentReoderCardIndex, reoderCards, backText]);

  return (
    <div className="row-span-6 w-full flex justify-center items-center">
      <Card
        className={cn(
          "h-full aspect-video overflow-hidden  rounded-sm  border-t-3 border-b-[8px] border-color-4 bg-color-4/20 border-x-3 "
        )}
      >
        <CardHeader className="">
          <Button isIconOnly>
            <MdOutlineImage />
          </Button>
        </CardHeader>
        <CardBody
          className={cn(" py-2  grid   gap-6 overflow-hidden grid-cols-2")}
        >
          {/* <Image
          alt="Card front"
          loading="lazy"
          isZoomed
          disableSkeleton={false}
          height={400}
          className=" rounded-sm order-2 border-gray-400 flex justify-center items-center content-center"
          radius="sm"
        /> */}
          <div className=" w-full h-full editor-container col-span-2 flex justify-center items-center overflow-y-scroll">
            {/* <span className=" text-6xl font-bold"></span> */}
            <EditorContent
              className=" w-full h-full flex justify-center items-center"
              editor={backText}
            ></EditorContent>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BackCard;
