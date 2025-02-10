"use client";
import {useProfileQuery} from "@/api/user service";
import {Toaster} from "@/components/ui/toaster";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "@/i18n/routing";
import {routeProto} from "@/store/legacy store/route.slice";
import {faker} from "@faker-js/faker";
import {Avatar, Button, Card, CardBody, CardHeader, Divider, Skeleton,} from "@heroui/react";
import React, {useEffect} from "react";
import {IoAddOutline} from "react-icons/io5";

const Page = () => {
    const {data, isLoading, isFetching, error, isError} = useProfileQuery(null);
    const {toast} = useToast();

    const route = useRouter();

    useEffect(() => {
        if (error && "status" in error) {
            toast({
                variant: "destructive",
                description: (
                    <>
                        Your working session is end, please
                        <Button
                            onPress={() => route.push(routeProto.AUTH())}
                            className=" rounded-sm"
                            variant="flat"
                            size="sm"
                        >
                            Sign in
                        </Button>
                    </>
                ),
            });
        }
    }, [error, isError]);

    return (
        <>
            <Toaster></Toaster>
            <div className=" w-full h-full">
                <Card className=" rounded-sm m-10">
                    <CardHeader>
                        <h1 className=" text-lg font-semibold">Personal information</h1>
                    </CardHeader>
                    <Divider></Divider>
                    <CardBody>
                        <h1 className=" m-4 text-lg font-semibold">Avatar</h1>
                        {isLoading ? (
                            <Skeleton className="h-20 w-1/4 rounded-sm"></Skeleton>
                        ) : (
                            <div className=" grid grid-cols-12">
                                <div className=" flex justify-center items- col-span-2 aspect-square">
                                    <Avatar
                                        className=" w-2/3 h-2/3"
                                        src={faker.image.avatar()}
                                    ></Avatar>
                                </div>
                                <div className=" col-span-10 grid grid-cols-12">
                                    {Array.from({length: 25}, (i, j) => {
                                        return (
                                            <div className=" aspect-square">
                                                <Avatar
                                                    as="button"
                                                    className=""
                                                    size="lg"
                                                    src={faker.image.avatar()}
                                                ></Avatar>
                                            </div>
                                        );
                                    })}
                                    <div className=" aspect-square">
                                        <Avatar
                                            as="button"
                                            className=""
                                            size="lg"
                                            showFallback
                                            fallback={<IoAddOutline size={20}/>}
                                        ></Avatar>
                                    </div>
                                </div>
                            </div>
                        )}
                        <Divider></Divider>
                        <div className=" m-4">
                            <h1 className=" text-lg font-semibold">Username</h1>

                            <div className=" flex justify-between items-center">
                                {isLoading ? (
                                    <Skeleton className=" h-10 w-1/4 rounded-sm"> </Skeleton>
                                ) : (
                                    <>
                                        {data?.metadata?.name}
                                        {/*<Button isIconOnly variant="flat">*/}
                                        {/*    <MdOutlineEdit/>*/}
                                        {/*</Button>*/}
                                    </>
                                )}
                            </div>
                        </div>
                        <Divider></Divider>

                        <div className=" m-4">
                            <h1 className=" text-lg font-semibold">Email</h1>

                            <div>
                                {isLoading ? (
                                    <Skeleton className=" h-10 w-1/4 rounded-sm"></Skeleton>
                                ) : (
                                    data?.metadata?.email
                                )}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default Page;
