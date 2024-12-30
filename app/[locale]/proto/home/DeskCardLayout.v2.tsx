"use client";
import { faker } from "@faker-js/faker";
import { CardType, LayoutGrid } from "./LayoutGrid";
import React, { useEffect, useState } from "react";

const DeskCardLayoutV2 = () => {
  const [cards, setCard] = useState<CardType[]>([]);
  useEffect(() => {
    setCard(
      Array.from({ length: faker.number.int({ max: 20 }) }, (item, index) => {
        return {
          id: index + 1,
          description: faker.lorem.paragraph(),
          thumbnail: faker.image.urlPicsumPhotos(),
          title: faker.music.songName(),
        };
      })
    );
  }, []);

  return (
    <div className="flex-1 w-full ">
      <LayoutGrid cards={cards} />
    </div>
  );
};

export default DeskCardLayoutV2;
