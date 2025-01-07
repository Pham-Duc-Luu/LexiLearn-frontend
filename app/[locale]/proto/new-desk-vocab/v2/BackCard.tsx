"use client";
import { cn } from "@/lib/utils";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/Proto-slice/ProtoStore.slice";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Input,
} from "@nextui-org/react";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useRef, useState } from "react";
import Text from "@tiptap/extension-text";
import "./Header.css";
import * as _ from "lodash";
import { MdOutlineImage, MdOutlineKeyboardVoice } from "react-icons/md";
import {
  CardContent,
  onReoderVocabCardItemBackChange,
  onReoderVocabCardItemFrontChange,
  ReoderVocabCardItem,
} from "@/store/Proto-slice/newDesk.slice";
import Dropcursor from "@tiptap/extension-dropcursor";
import ImageExtension from "@tiptap/extension-image";
import { useDebounce } from "@uidotdev/usehooks";
import { searchEnglishWords } from "@/utils/wordService";
import { AiOutlineDelete } from "react-icons/ai";

const BackCard = () => {
  const dispatch = useAppDispatch();
  const backText = useEditor({
    extensions: [
      StarterKit,
      Text,

      Placeholder.configure({
        // Use a placeholder:
        // Use different placeholders depending on the node type:
        placeholder: ({ node }) => {
          return "Enter the vocabulary here...";
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
        editor.commands.setContent(`<p>${truncatedContent}</p>`);
      }

      const card = _.find(reoderCards, function (card) {
        return card.id === currentReoderCardIndex;
      });
      if (card) {
        const mean = {
          ...card.mean,
          text: truncatedContent,
        };
        dispatch(onReoderVocabCardItemBackChange({ id: card.id, mean }));
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
  const [card, setCard] = useState<ReoderVocabCardItem>();

  // * render backcard text
  useEffect(() => {
    if (card && card.mean?.text) {
      backText?.commands.setContent(`<p >${card.mean?.text}</p>`);
    } else {
      backText?.commands.setContent(`<p ></p>`);
    }
  }, [card]);

  useEffect(() => {
    const card = _.find(reoderCards, function (card) {
      return card.id === currentReoderCardIndex;
    });

    if (card) {
      setCard(card);
    }
  }, [currentReoderCardIndex, reoderCards, backText]);

  const debouncedSearchTerm = useDebounce(card?.mean?.text, 200);

  // * catch debounced search term
  useEffect(() => {
    debouncedSearchTerm && console.log(searchEnglishWords(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)?.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      card &&
        dispatch(
          onReoderVocabCardItemBackChange({
            id: card.id,
            mean: {
              ...card.mean,
              image: files?.[0].preview,
            },
          })
        );
    }
  };

  return (
    <div className="row-span-6 w-full flex justify-center items-center">
      <Card
        className={cn(
          "h-full aspect-video overflow-hidden  rounded-sm  border-t-6 border-b-[8px] border-color-4 bg-color-4/20 border-x-4 "
        )}
      >
        <CardHeader className=" bg-color-4 rounded-none flex justify-between items-center">
          <span className=" text-lg text-white"> back</span>
          <div className=" flex justify-center items-center gap-4">
            <Button
              onPress={handleButtonClick}
              isIconOnly
              size="sm"
              className=" rounded-md"
            >
              <MdOutlineImage size={18} />
            </Button>
            <input
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
              ref={fileInputRef}
              type="file"
            />
            <Button isIconOnly size="sm" className=" rounded-md">
              <MdOutlineKeyboardVoice size={18} />
            </Button>
          </div>
        </CardHeader>
        <CardBody
          className={cn(
            " py-2  grid   gap-6 overflow-hidden grid-rows-1 grid-cols-2 "
          )}
        >
          {card?.mean?.image && (
            <div className=" relative w-full rounded-sm  col-span-1 p-2">
              <Image
                alt="Card front"
                removeWrapper
                src={card?.mean?.image}
                className=" w-full h-full"
                radius="sm"
              />
              <Button
                className=" absolute top-4 right-4 z-10 rounded-sm"
                color="danger"
                variant="flat"
                size="sm"
                onPress={() => {
                  dispatch(
                    onReoderVocabCardItemBackChange({
                      id: card.id,
                      mean: {
                        ...card.mean,
                        image: undefined,
                      },
                    })
                  );
                }}
                isIconOnly
              >
                <AiOutlineDelete size={20} />
              </Button>
            </div>
          )}

          <div
            className={cn(
              " editor-container flex justify-center items-center overflow-y-scroll",
              card?.mean?.image ? "col-span-1 " : "col-span-2"
            )}
          >
            <EditorContent
              className="  flex justify-center items-center"
              editor={backText}
            ></EditorContent>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BackCard;
