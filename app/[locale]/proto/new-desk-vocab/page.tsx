"use client";
import { cn } from "@/lib/utils";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/Proto-slice/ProtoStore.slice";
import { Card, CardBody, Image } from "@nextui-org/react";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import Text from "@tiptap/extension-text";
import "./Header.css";
import {
  ReoderVocabCardItem,
  setCurrentReoderVocabCardItem,
} from "@/store/Proto-slice/newDesk.slice";

import * as _ from "lodash";
import EditFlashcard from "./Editflashcard";
const page = () => {
  const { reoderCards, currentReoderCardIndex } = useAppSelector(
    (state) => state.NewDesk
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    reoderCards &&
      reoderCards.length > 0 &&
      dispatch(setCurrentReoderVocabCardItem(reoderCards[0].id));
  }, []);
  const [card, setCard] = useState<ReoderVocabCardItem>();

  useEffect(() => {
    const card = _.find(reoderCards, function (card) {
      return card.id === currentReoderCardIndex;
    });

    if (card) {
      setCard(card);
    }
  }, [currentReoderCardIndex, reoderCards]);

  return (
    <div className="h-fit p-4 overflow-y-scroll flex-1 grid grid-cols-12 gap-4">
      {reoderCards.map((item, index) => {
        if (item.id !== currentReoderCardIndex) {
          return <></>;
        }
        return (
          <>
            <EditFlashcard
              type="front"
              id={item.id}
              cardContent={item.word}
            ></EditFlashcard>
            <EditFlashcard
              type="back"
              id={item.id}
              cardContent={item.mean}
            ></EditFlashcard>
          </>
        );
      })}
    </div>
  );
};

export default page;