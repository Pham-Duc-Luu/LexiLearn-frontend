"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { File, Trash2, Upload } from "lucide-react";
import type React from "react";
import { type DragEvent, useRef, useState } from "react";

import { MdImage, MdOutlineImage } from "react-icons/md";
import {
  CardContent,
  onReoderVocabCardItemFrontChange,
  ReoderVocabCardItem,
  updateReoderCarditem,
} from "@/store/Proto-slice/newDesk.slice";
import { useAppDispatch } from "@/store/Proto-slice/ProtoStore.slice";
import { EditFlashcardProps } from "./Editflashcard";
import Cropper, { Area } from "react-easy-crop";
import {
  AiOutlineCloudUpload,
  AiOutlineDelete,
  AiOutlineSearch,
  AiOutlineUpload,
} from "react-icons/ai";
import getCroppedImg from "@/utils/cropImage";
import { CiImageOn } from "react-icons/ci";

interface FileWithPreview extends File {
  preview: string;
}
const DropImageModalButton = (props: EditFlashcardProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const { id, type, cardContent } = props;
  const showCroppedImage = async () => {
    try {
      if (files && files.length > 0 && files[0].preview) {
        const croppedImage = await getCroppedImg(
          files[0].preview,
          croppedAreaPixels,
          rotation
        );

        dispatch(
          updateReoderCarditem({
            id,
            type,
            data: {
              ...cardContent,
              image: croppedImage,
            },
          })
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const dispatch = useAppDispatch();

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFiles = (fileList: File[]) => {
    const newFiles = fileList.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles([...newFiles]);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleOutputFile = async () => {};

  return (
    <>
      <Button onPress={onOpen} isIconOnly size="sm" className=" rounded-md">
        <MdOutlineImage size={18} />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        radius="sm"
        className=" lg:h-[600px] lg:w-[800px] max-w-full"
      >
        <ModalContent className=" h-full">
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-start items-center gap-4">
                <div className=" p-3 rounded-full bg-color-4/20">
                  <MdOutlineImage size={26} />
                </div>
                <div>Drop your image here</div>
              </ModalHeader>
              <ModalBody className=" h-full w-full">
                <Tabs
                  aria-label="Options"
                  variant="underlined"
                  classNames={{
                    tabList:
                      "gap-6 w-full h-full relative rounded-none  p-0 group-data-[selected=true]:border-color-4 border-b border-divider",
                    cursor: "w-full bg-color-4",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-color-4",
                  }}
                >
                  <Tab
                    key="upload"
                    className=" h-full flex justify-center flex-col items-center"
                    title={
                      <div className=" flex justify-center gap-1 items-center">
                        <AiOutlineUpload size={20} />
                        <span>upload</span>
                      </div>
                    }
                  >
                    <div className=" flex-1 w-full">
                      {files && files.length > 0 && files[0].preview ? (
                        <div className="  relative rounded-sm h-full  col-span-1 w-full ">
                          <div className="w-full h-full">
                            <Cropper
                              image={files[0].preview}
                              crop={crop}
                              zoom={zoom}
                              aspect={1}
                              onCropChange={setCrop}
                              onCropComplete={onCropComplete}
                              onZoomChange={setZoom}
                            />
                          </div>
                          <Button
                            className=" absolute top-4 right-4 z-10 rounded-sm"
                            color="danger"
                            variant="flat"
                            size="sm"
                            onPress={() => {
                              setFiles([]);
                            }}
                            isIconOnly
                          >
                            <AiOutlineDelete size={20} />
                          </Button>
                        </div>
                      ) : (
                        <motion.div
                          className={`relative size-full cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
                            isDragActive
                              ? "border-blue-500 bg-blue-500/5"
                              : "border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-500"
                          }`}
                          onClick={handleButtonClick}
                          onDragEnter={handleDragEnter}
                          onDragLeave={handleDragLeave}
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <input
                            accept="image/*"
                            className="hidden"
                            multiple={true}
                            onChange={handleFileInputChange}
                            ref={fileInputRef}
                            type="file"
                          />
                          <AnimatePresence>
                            {isDragActive ? (
                              <motion.div
                                animate={{ opacity: 1, y: 0 }}
                                className=" pointer-events-none select-none"
                                exit={{ opacity: 0, y: -10 }}
                                initial={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Upload className="pointer-events-none mx-auto size-8 select-none text-blue-500" />
                                <p className="pointer-events-none mt-2 select-none text-blue-500 text-sm">
                                  Drop files here...
                                </p>
                              </motion.div>
                            ) : (
                              <motion.div
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                initial={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Upload className="mx-auto size-8 text-neutral-400 dark:text-neutral-500" />
                                <p className="mt-2 text-balance font-medium text-neutral-400 text-sm tracking-tighter dark:text-neutral-500">
                                  Drag and drop files here, or click to select
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}
                    </div>

                    <ModalFooter className=" w-full flex items-center justify-end">
                      <Button
                        variant="light"
                        onPress={onClose}
                        className=" rounded-sm bg-color-4/20 text-color-4"
                      >
                        cancel
                      </Button>
                      <Button
                        className=" rounded-sm bg-color-4 text-white"
                        onPress={() => {
                          showCroppedImage();
                          onClose();
                        }}
                      >
                        Save
                      </Button>
                    </ModalFooter>
                  </Tab>
                  <Tab
                    key="search"
                    className="h-full"
                    title={
                      <div className=" flex justify-center gap-1 items-center">
                        <AiOutlineSearch size={20} />
                        <span>search</span>
                      </div>
                    }
                  ></Tab>
                </Tabs>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DropImageModalButton;
