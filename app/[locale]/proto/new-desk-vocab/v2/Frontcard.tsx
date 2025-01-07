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
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  User,
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
  onReoderVocabCardItemFrontChange,
  ReoderVocabCardItem,
} from "@/store/Proto-slice/newDesk.slice";
import Dropcursor from "@tiptap/extension-dropcursor";
import ImageExtension from "@tiptap/extension-image";
import { useDebounce } from "@uidotdev/usehooks";
import { searchEnglishWords } from "@/utils/wordService";
import { AiOutlineDelete } from "react-icons/ai";
import TextStyle from "@tiptap/extension-text-style";
import DropDrowRecommend from "@/components/DropDrowRecommend";
import { useOnClickOutside } from "@/hooks/use-click-outside";

const Frontcard = ({ card }: { card: ReoderVocabCardItem }) => {
  const dispatch = useAppDispatch();
  const frontText = useEditor({
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
        class: "text-2xl w-full text-center text recommendation",
      },
    },

    onUpdate: ({ editor }) => {
      // Truncate content if there's more than one line
      const content = editor.getText();

      const truncatedContent = content.split("\n")[0]; // Only take the first line
      if (!content) {
        editor.commands.setContent(`<p></p>`);
      }
      if (content !== truncatedContent) {
        editor.commands.setContent(`<p>${truncatedContent} </p>`);
      }

      const card = _.find(reoderCards, function (card) {
        return card.id === currentReoderCardIndex;
      });

      if (card) {
        const word = {
          ...card.word,
          text: truncatedContent,
        };
        dispatch(onReoderVocabCardItemFrontChange({ id: card.id, word }));
      }

      if (content !== truncatedContent) {
        editor.commands.setContent(
          `<p class="text-2xl">${truncatedContent}</p>`
        );
      }
    },
  });

  const { currentReoderCardIndex, reoderCards } = useAppSelector(
    (state) => state.NewDesk
  );

  useEffect(() => {
    if (card && card.word?.text) {
      frontText?.commands.setContent(`<p> ${card.word?.text} </p>`);
    } else {
      frontText?.commands.setContent(`<p></p>`);
    }
  }, [frontText]);

  const debouncedSearchTerm = useDebounce(card?.word?.text, 0);

  const [filters, setFilters] = useState<string[]>();

  // // * catch debounced search term
  useEffect(() => {
    debouncedSearchTerm && setFilters(searchEnglishWords(debouncedSearchTerm));
    if (!debouncedSearchTerm || debouncedSearchTerm?.length < 0) {
      setIsDropdownVisible(false);
    } else {
      setIsDropdownVisible(true);
    }
  }, [debouncedSearchTerm]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)?.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      card &&
        dispatch(
          onReoderVocabCardItemFrontChange({
            id: card.id,
            word: {
              ...card.word,
              image: files?.[0].preview,
            },
          })
        );
    }
  };
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setIsDropdownVisible(false);
  });
  return (
    <div className="row-span-6 w-full flex justify-center items-center">
      <Card
        className={cn(
          "h-full aspect-video rounded-sm overflow-visible border-t-6 border-b-[8px] border-color-4 bg-color-4/20 border-x-4 "
        )}
      >
        <CardHeader className=" bg-color-4 rounded-none flex justify-between items-center">
          <span className=" text-lg text-white"> front</span>
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
            " py-2  grid overflow-visible  gap-6 grid-rows-1 grid-cols-2 "
          )}
        >
          {card?.word?.image && (
            <div className=" w-full relative rounded-sm  col-span-1 p-2">
              <Image
                alt="Card front"
                removeWrapper
                src={card?.word?.image}
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
                    onReoderVocabCardItemFrontChange({
                      id: card.id,
                      word: {
                        ...card.word,
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
              " editor-container relative flex  justify-center items-center ",
              card?.word?.image ? "col-span-1 " : "col-span-2"
            )}
            onFocus={() => {
              card.word?.text &&
                card.word?.text.length > 0 &&
                setIsDropdownVisible(true);
            }}
          >
            <EditorContent
              ref={ref}
              className="  flex justify-center items-center relative origin-bottom"
              editor={frontText}
            >
              {isDropdownVisible && (
                <DropDrowRecommend
                  filters={filters?.slice(0, 4)}
                  className=" w-56"
                ></DropDrowRecommend>
              )}
            </EditorContent>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Frontcard;
