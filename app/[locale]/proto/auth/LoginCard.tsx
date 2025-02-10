"use client";
import {Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Spinner,} from "@heroui/react";
import React, {useEffect} from "react";
import {MdOutlineEmail, MdOutlinePassword} from "react-icons/md";
import {motion} from "framer-motion";
import {useTranslations} from "next-intl";
import {AuthDisplay} from "./page";

import {useGoogleLogin,} from "@react-oauth/google";
import {useSignInMutation} from "@/api/user service/authentication.api";
import {useForm} from "react-hook-form";
import {SignInRequestDto, signInSchema} from "@/api/dto";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem,} from "@/components/ui/form";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "@/i18n/routing";
import {routeProto} from "@/store/legacy store/route.slice";
import GoogleLoginButton from "./GoogleLoginButton";
import PasswordInputComponent from "./PasswordInputComponent";

export const LoginCard = ({
                              display,
                              duration,
                              setDisplay,
                          }: {
    display: AuthDisplay;
    duration: number;
    setDisplay: React.Dispatch<React.SetStateAction<AuthDisplay>>;
}) => {
    const t = useTranslations("auth.sign in");
    const t1 = useTranslations("auth.forgotPassword");
    const GoogleLogin = useGoogleLogin({
        flow: "auth-code",
        onSuccess: (tokenResponse) => {
            console.log(tokenResponse);
        },
        onError: (error) => console.log(error),
        scope: "",
    });
    const router = useRouter();
    const {toast} = useToast();
    const [useSignInMutationTrigger, useSignInMutationResults] =
        useSignInMutation();

    // * define sign in schema
    const form = useForm<SignInRequestDto>({
        resolver: zodResolver(signInSchema),
    });

    function onSubmit(values: SignInRequestDto) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        useSignInMutationTrigger(values);
    }

    useEffect(() => {
        if (useSignInMutationResults.isError) {
            if (useSignInMutationResults.error) {
                const {error} = useSignInMutationResults;
                if ("status" in error) {
                    if (error.status === 400) {
                        toast({
                            variant: "destructive",
                            title: "Wrong email or password",
                        });
                    }
                }
            }
        }

        if (useSignInMutationResults.isLoading) {
            toast({
                variant: "default",
                description: (
                    <>
                        <Spinner/>
                    </>
                ),
            });
        }
        if (useSignInMutationResults.isSuccess) {
            toast({}).dismiss();
            router.push(routeProto.HOME());
        }
    }, [useSignInMutationResults]);

    return (
        <motion.div
            initial={{opacity: 0, right: 0}}
            className="absolute w-1/2  h-full"
            animate={{
                opacity: display === "log in" ? 1 : 0,
                left: 0,
                right: "unset",
            }}
            transition={{duration, ease: "linear"}}
        >
            <Card className=" col-span-1 w-full h-full shadow-none rounded-r-none rounded-l-sm">
                <CardHeader>
                    <h1 className=" m-4 text-xl font-bold">{t("label")}</h1>
                </CardHeader>
                <CardBody className=" flex flex-col justify-start p-8 items-center gap-10">
                    <GoogleLoginButton></GoogleLoginButton>

                    <div className=" grid grid-cols-12 w-full grid-rows-1">
                        <Divider className=" col-span-4 my-3"></Divider>
                        <div className=" col-span-4 w-full text-center">
                            {t("or email")}
                        </div>
                        <Divider className=" col-span-4 my-3"></Divider>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className=" w-full flex-col flex justify-center items-center gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="user_email"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        {/* <FormLabel>Username</FormLabel> */}
                                        <FormControl>
                                            <Input
                                                placeholder={t("email.label")}
                                                className="w-full"
                                                radius="sm"
                                                type="email"
                                                variant="underlined"
                                                labelPlacement="outside"
                                                size="lg"
                                                startContent={<MdOutlineEmail/>}
                                                isInvalid={
                                                    form.formState.errors.user_email ? true : false
                                                }
                                                errorMessage={form.formState.errors.user_email?.message}
                                                {...field}
                                            ></Input>
                                        </FormControl>
                                        {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                                        {/* <FormMessage /> */}
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="user_password"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        {/* <FormLabel>Username</FormLabel> */}
                                        <FormControl>
                                            <PasswordInputComponent
                                                placeholder={t("password.label")}
                                                className="w-full"
                                                type="password"
                                                radius="sm"
                                                variant="underlined"
                                                startContent={<MdOutlinePassword/>}
                                                labelPlacement="outside"
                                                size="lg"
                                                isInvalid={
                                                    form.formState.errors.user_password ? true : false
                                                }
                                                errorMessage={
                                                    form.formState.errors.user_password?.message
                                                }
                                                {...field}
                                            ></PasswordInputComponent>
                                        </FormControl>
                                        {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                                        {/* <FormMessage /> */}
                                    </FormItem>
                                )}
                            />

                            <div className=" w-full flex justify-end">
                                <Button
                                    className=" rounded-sm"
                                    variant="flat"
                                    onPress={() => {
                                        setDisplay("forgot password");
                                    }}
                                    size="sm"
                                >
                                    {t1("label")}
                                </Button>
                            </div>
                            <Button
                                type="submit"
                                className=" w-full bg-color-3/30 text-color-4 font-bold rounded-sm"
                            >
                                {t("action")}
                            </Button>
                        </form>
                    </Form>
                </CardBody>
                <CardFooter className=" bg-gray-100 flex justify-center items-center gap-3">
                    <div>{t("sign up.label")}</div>
                    <Button
                        className="  bg-color-3/30 text-color-4 font-bold rounded-sm"
                        onPress={() => setDisplay("sign up")}
                    >
                        {t("sign up.action")}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};
