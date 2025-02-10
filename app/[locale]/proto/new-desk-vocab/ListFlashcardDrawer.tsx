import {Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, useDisclosure,} from "@heroui/react";
import React, {useRef} from "react";
import {addReoderVocabCard, initNode,} from "@/store/Proto-slice/newDesk.slice";
import {useAppSelector} from "@/store/Proto-slice/ProtoStore.slice";
import {useAppDispatch} from "@/store/legacy store/hooks";
import {MdAdd} from "react-icons/md";
import SideCard from "./SideCard";
import {FaList} from "react-icons/fa";

const ListFlashcardDrawer = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {reoderCards} = useAppSelector(
        (state) => state.persistedReducer.NewDesk
    );
    const dispatch = useAppDispatch();
    const scrollRef = useRef<HTMLDivElement>(null);

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
            <Button
                onPress={onOpen}
                className=" rounded-sm bg-color-4 text-white"
                startContent={<FaList/>}
            >
                flashcards list
            </Button>
            <Drawer
                radius="sm"
                backdrop="blur"
                isDismissable={false}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">
                                Drawer Title
                            </DrawerHeader>
                            <DrawerBody>
                                <SideCard></SideCard>
                            </DrawerBody>
                            <DrawerFooter>
                                <Button
                                    className="rounded-sm flex-1 w-full bg-color-4/20 border-color-4 border-x-2 border-t-2 border-b-4 "
                                    startContent={<MdAdd/>}
                                    onPress={() => handleAddVocabulary()}
                                >
                                    add vocabulary
                                </Button>
                                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default ListFlashcardDrawer;
