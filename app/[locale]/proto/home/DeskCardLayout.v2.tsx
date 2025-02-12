"use client";
import { faker } from "@faker-js/faker";
import { CardType, LayoutGrid } from "./LayoutGrid";
import React, { useEffect, useState } from "react";
import { useGetDesksQuery } from "@/api/user service/graphql/types.generated";
import { ToastContainer, toast } from "react-toastify";
const DeskCardLayoutV2 = () => {
  const [cards, setCard] = useState<CardType[]>([]);
  const getDesksQuery = useGetDesksQuery({});

  useEffect(() => {
    if (getDesksQuery.isSuccess) {
      const desks = getDesksQuery.data.getDesks;
      desks?.desks &&
        desks.desks.length > 0 &&
        setCard(
          desks.desks.map((desk) => ({
            id: Number(desk?.id!),
            title: desk?.name!,
            description: desk?.description!,
            thumbnail: desk?.thumbnail!,
            owner: {
              id: desk?.owner?.id!,
              name: desk?.owner?.name!,
              avatar: desk?.owner?.avatar!,
            },
            flashcardQuantity: desk?.flashcardQuantity!,
          }))
        );
    }
  }, [getDesksQuery]);

  useEffect(() => {
    if (getDesksQuery.isError) {
      toast("something went wrong", {
        type: "error",
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  }, [getDesksQuery, getDesksQuery.isError]);

  return (
    <div className="flex-1 w-full ">
      <ToastContainer />
      <LayoutGrid cards={cards} />
    </div>
  );
};

export default DeskCardLayoutV2;
