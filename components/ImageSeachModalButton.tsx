"use client";
import React, {
  type DragEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  Tab,
  Tabs,
  useDisclosure,
  TabsProps,
  Image,
  Progress,
} from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { File, Upload } from "lucide-react";

import { MdOutlineImage } from "react-icons/md";
import Cropper, { Area } from "react-easy-crop";
import {
  AiOutlineDelete,
  AiOutlineSearch,
  AiOutlineUpload,
} from "react-icons/ai";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useDebounce } from "@uidotdev/usehooks";
import { useSearchPhotosMutation } from "@/api/search/search.photo.api";

interface FileWithPreview extends File {
  preview: string;
}

const DropImageModalButton = (props: {
  Button?: typeof Button;
  onSave?: (localUrl: string) => void;
  modalProps?: Partial<ModalProps>;
  tabProps?: Partial<TabsProps>;
  tab?: ReactNode;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {props.Button ? (
        <props.Button
          onPress={onOpen}
          isIconOnly
          size="sm"
          className=" rounded-md"
        ></props.Button>
      ) : (
        <Button onPress={onOpen} isIconOnly size="sm" className=" rounded-md">
          <MdOutlineImage size={18} />
        </Button>
      )}

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        radius="sm"
        className=" lg:h-[800px] lg:w-[1200px] max-w-full"
        {...props.modalProps}
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
                  {...props?.tabProps}
                >
                  {props?.tab ? (
                    <>{props.tab}</>
                  ) : (
                    <>
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
                        <CropImageComponentTabs
                          onClose={onClose}
                        ></CropImageComponentTabs>
                      </Tab>
                      <Tab
                        key="search"
                        className="h-full flex flex-col justify-center items-center"
                        title={
                          <div className=" flex justify-center gap-1 items-center">
                            <AiOutlineSearch size={20} />
                            <span>search</span>
                          </div>
                        }
                      >
                        <SearchImageComponentTabs></SearchImageComponentTabs>
                      </Tab>
                    </>
                  )}
                </Tabs>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export const CropImageComponentTabs = ({
  onClose,
}: Partial<ReturnType<typeof useDisclosure>>) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  // const { id, type, cardContent } = props;
  // const getCroppedImage = async () => {
  //   try {
  //     if (files && files.length > 0 && files[0].preview) {
  //       const croppedImage = (await getCroppedImg(
  //         files[0].preview,
  //         croppedAreaPixels,
  //         rotation
  //       )) as string;

  //       return croppedImage;
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const dispatch = useAppDispatch();

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

  return (
    <>
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

              {/* <ImagePintunaEditor
          src={files[0].preview}
        ></ImagePintunaEditor> */}
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
          onPress={async () => {
            // const croppedImage = await getCroppedImage();
            // croppedImage && props?.onSave && props.onSave(croppedImage);
            onClose && onClose();
          }}
        >
          Save
        </Button>
      </ModalFooter>
    </>
  );
};

const marsoryLayoutStyle: { rows: number; cols: number }[] = [
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 1,
  },
  {
    rows: 1,
    cols: 2,
  },
];

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export interface ISearchImageComponentTabsProps {
  ImageDisplayLayout?: typeof ImageList;
}
export const SearchImageComponentTabs =
  ({}: ISearchImageComponentTabsProps) => {
    const [searchTerm, setSearchTerm] = React.useState("image");
    const debouncedSearchTerm = useDebounce(searchTerm, 900);

    const [searchPhotosMutation, searchPhotosMutationResult] =
      useSearchPhotosMutation({});

    useEffect(() => {
      searchPhotosMutation({ limit: 30, q: debouncedSearchTerm! });
    }, [debouncedSearchTerm]);

    return (
      <>
        <Input
          startContent={<AiOutlineSearch size={20} />}
          className=" w-full my-2 rounded-sm"
          placeholder="Search for ..."
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="bordered"
        ></Input>
        {searchPhotosMutationResult.isLoading && (
          <Progress
            isIndeterminate
            aria-label="Loading..."
            className="max-w-full"
            size="sm"
          />
        )}

        <div className=" flex-1 overflow-y-scroll w-full relative">
          {searchPhotosMutationResult.data?.metadata && (
            <div className=" absolute">
              <ImageList
                className="h-full w-full overflow-y-scroll"
                variant="masonry"
                cols={3}
                gap={12}
              >
                {searchPhotosMutationResult.data?.metadata.map((item) => (
                  <ImageListItem key={item.id}>
                    <Image
                      srcSet={item.photo_image_url}
                      src={item.photo_image_url}
                      alt={item.photo_description}
                      isZoomed={true}
                      className=" cursor-pointer"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          )}
        </div>
      </>
    );
  };
export default DropImageModalButton;
