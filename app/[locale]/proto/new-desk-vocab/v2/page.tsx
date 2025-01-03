"use client";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/Proto-slice/ProtoStore.slice";
import { Card, CardBody, Image } from "@nextui-org/react";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import Text from "@tiptap/extension-text";
import "./Header.css";
import Frontcard from "./Frontcard";
import BackCard from "./BackCard";

const page = () => {
  const { currentFlashcardIndex, flashcards } = useAppSelector(
    (state) => state.ReviewFlashCard
  );

  return (
    <div className="h-full p-4 overflow-hidden  flex-1 grid grid-rows-12 gap-4">
      <Frontcard></Frontcard>

      <BackCard></BackCard>
    </div>
  );
};

export default page;
