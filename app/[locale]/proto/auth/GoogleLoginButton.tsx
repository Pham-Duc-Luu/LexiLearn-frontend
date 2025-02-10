"use client";
import {useGoogleOAuth2Mutation} from "@/api/user service/authentication.api";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "@/i18n/routing";
import {routeProto} from "@/store/legacy store/route.slice";
import {Button, Spinner} from "@heroui/react";
import {useGoogleLogin} from "@react-oauth/google";
import {useTranslations} from "next-intl";
import React, {useEffect} from "react";
import {FcGoogle} from "react-icons/fc";

const GoogleLoginButton = () => {
    const t = useTranslations("auth.sign up");

    const router = useRouter();
    const {toast} = useToast();
    // * define google auth mutation
    const [useGoogleOAuth2MutationTrigger, useGoogleOAuth2MutationResult] =
        useGoogleOAuth2Mutation();
    const GoogleLogin = useGoogleLogin({
        flow: "auth-code",
        onSuccess: (tokenResponse) => {
            // * trigger verification in backend after gain google oauth token
            useGoogleOAuth2MutationTrigger(tokenResponse.code);
            // console.log(tokenResponse);
        },
        onError: (error) => console.log(error),
        scope: "",
    });
    // * catch the google oauth 2 data change event
    useEffect(() => {
        if (useGoogleOAuth2MutationResult.isError) {
            if (useGoogleOAuth2MutationResult.error) {
                const {error} = useGoogleOAuth2MutationResult;
                if ("status" in error) {
                    if (error.status && error.status >= 400 && error.status < 500) {
                        toast({
                            variant: "destructive",
                            title: String(error.data),
                        });
                    }
                }
            }
        }

        if (useGoogleOAuth2MutationResult.isLoading) {
            toast({
                variant: "default",
                description: (
                    <>
                        <Spinner/>
                    </>
                ),
            });
        }
        if (useGoogleOAuth2MutationResult.isSuccess) {
            toast({}).dismiss();

            router.push(routeProto.HOME());
        }
    }, [useGoogleOAuth2MutationResult]);
    return (
        <>
            <Button
                radius="sm"
                className=" w-full"
                variant="bordered"
                size="lg"
                onPress={() => GoogleLogin()}
                startContent={<FcGoogle/>}
            >
                {t("sign up with google")}
            </Button>
        </>
    );
};

export default GoogleLoginButton;
