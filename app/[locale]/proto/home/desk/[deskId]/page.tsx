import React from "react";
import DeskHearder from "./DeskHearder";
import ListFlashcard from "./ListFlashcard";

const page = () => {
  return (
    <div className="flex-1 overflow-y-scroll">
      <DeskHearder></DeskHearder>
      <ListFlashcard></ListFlashcard>
    </div>
  );
};

export default page;
