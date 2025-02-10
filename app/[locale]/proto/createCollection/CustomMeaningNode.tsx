import React from "react";
import {Handle, NodeProps, NodeResizer, Position,} from "@xyflow/react";
import {Button, Card, CardBody, CardHeader, Divider, Textarea,} from "@heroui/react";
import {MdDeleteOutline} from "react-icons/md";
import {CustomtNodeType, deleteNode,} from "@/store/Proto-slice/CardNode.proto.slice";
import {useAppDispatch} from "@/store/legacy store/hooks";

const CustomMeaninNode = ({
                              isConnectable,
                              id,
                          }: NodeProps<CustomtNodeType>) => {
    const dispatch = useAppDispatch();

    return (
        <>
            <NodeResizer></NodeResizer>

            <Handle
                type="target"
                position={Position.Left}
                onConnect={(params) => console.log("handle onConnect", params)}
                isConnectable={isConnectable}
            />
            <Card className="py-4" radius="sm">
                <CardHeader
                    className="drag-handle__label drag-handle__custom pb-0  pt-2 px-4 flex justify-between items-center ">
                    <span className=" text-2xl font-bold">Meaning</span>
                    <Button
                        isIconOnly
                        onClick={() => {
                            dispatch(deleteNode(id));
                        }}
                    >
                        <MdDeleteOutline size={28}/>
                    </Button>
                </CardHeader>
                <Divider className="my-2"></Divider>
                <CardBody className="overflow-visible py-2  cursor-default">
                    <div className=" flex gap-4">
                        <Textarea
                            disableAnimation
                            disableAutosize
                            classNames={{
                                base: "max-w-xs",
                                input: "resize-y min-h-[40px]",
                            }}
                            variant="bordered"
                            onChange={(e) => {
                            }}
                        ></Textarea>
                    </div>
                </CardBody>
            </Card>
        </>
    );
};

export default CustomMeaninNode;
