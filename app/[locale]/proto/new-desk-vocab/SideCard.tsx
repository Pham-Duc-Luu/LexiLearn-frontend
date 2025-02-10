"use client";
import React, {useRef} from "react";
import {Reorder, useAnimation} from "framer-motion";
import {addReoderVocabCard, initNode, ReoderVocabCardItem,} from "@/store/Proto-slice/newDesk.slice";
import {useAppSelector} from "@/store/Proto-slice/ProtoStore.slice";
import {useAppDispatch} from "@/store/legacy store/hooks";
import {KeyboardSensor, PointerSensor, useSensor, useSensors,} from "@dnd-kit/core";
import {sortableKeyboardCoordinates,} from "@dnd-kit/sortable";
import DndGroup from "./DndGroup";

const SideCardOrderItem = ({item}: { item: ReoderVocabCardItem }) => {
    return <Reorder.Item value={item}></Reorder.Item>;
};
const SideCard = ({}) => {
    const {reoderCards} = useAppSelector(
        (state) => state.persistedReducer.NewDesk
    );
    const dispatch = useAppDispatch();
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollAnimation = useAnimation();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAddVocabulary = () => {
        dispatch(addReoderVocabCard());
        dispatch(initNode());
        // Scroll to the bottom of the container
        if (scrollRef.current) {
            scrollRef.current.scroll({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            <DndGroup></DndGroup>
        </>
    );
};

export default SideCard;
