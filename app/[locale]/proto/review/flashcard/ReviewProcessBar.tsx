"use client";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/Proto-slice/ProtoStore";
import { Progress } from "@nextui-org/react";
import { useScroll, motion, useSpring } from "framer-motion";
import React, { useEffect, useState } from "react";
const ReviewProcessBar = () => {
  const { scrollYProgress } = useScroll();

  const { currentFlashcardIndex, flashcards } = useAppSelector(
    (state) => state.ReviewFlashCard
  );

  const scaleX = useSpring(0, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  useEffect(() => {
    scaleX.set(currentFlashcardIndex / flashcards.length);
  }, [currentFlashcardIndex, flashcards]);

  return (
    <motion.div
      className={cn(
        "fixed inset-x-0 top-0 z-[1000] h-1 origin-left bg-gradient-to-r from-color-2 via-color-3 to-color-4"
      )}
      style={{
        scaleX,
      }}
    />
  );
};

export default ReviewProcessBar;
