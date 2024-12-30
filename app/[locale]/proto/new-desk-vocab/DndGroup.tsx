import React, { useEffect, useRef, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/Proto-slice/ProtoStore.slice";
import * as _ from "lodash";
import { setReoderVocabCard } from "@/store/Proto-slice/newDesk.slice";
export default function DndGroup() {
  const { reoderCards } = useAppSelector((state) => state.NewDesk);
  const dispatch = useAppDispatch();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    console.log({ active, over });
    if (active.id !== over?.id) {
      const oldIndex = _.findIndex(reoderCards, function (o) {
        return o.id === active.id;
      });
      const newIndex = _.findIndex(reoderCards, function (o) {
        return o.id === over?.id;
      });

      dispatch(setReoderVocabCard(arrayMove(reoderCards, oldIndex, newIndex)));
    }
  }
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  useEffect(() => {
    const checkScrollbar = () => {
      if (containerRef.current) {
        // Check if the container has a vertical scrollbar
        const isScrollable =
          containerRef.current.scrollHeight > containerRef.current.clientHeight;
        setHasScrollbar(isScrollable);
      }
    };

    // Check scrollbar on load and whenever the window resizes
    checkScrollbar();
    window.addEventListener("resize", checkScrollbar);

    return () => {
      window.removeEventListener("resize", checkScrollbar);
    };
  }, [containerRef.current]);
  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-12 gap-2 overflow-auto py-2 ${
        hasScrollbar ? "px-0" : "px-1"
      } [&::-webkit-scrollbar]:w-1
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[
          restrictToFirstScrollableAncestor,
          restrictToVerticalAxis,
          restrictToWindowEdges,
        ]}
      >
        <SortableContext
          items={reoderCards}
          strategy={verticalListSortingStrategy}
        >
          {reoderCards.map((item, index) => (
            <SortableItem
              key={item.id}
              index={index + 1}
              item={item}
              id={item.id}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
