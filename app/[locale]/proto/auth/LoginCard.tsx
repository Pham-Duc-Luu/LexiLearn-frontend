"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Input,
} from "@nextui-org/react";
import React, { useState } from "react";
import backgroudImage from "@/public/sign in backgroud.jpg";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AuthDisplay } from "./page";

import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,

  //   googleLogout,
} from "@react-oauth/google";
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
  return (
    <motion.div
      initial={{ opacity: 0, right: 0 }}
      className="absolute w-1/2  h-full"
      animate={{
        opacity: display === "log in" ? 1 : 0,
        left: 0,
        right: "unset",
      }}
      transition={{ duration, ease: "linear" }}
    >
      <Card className=" col-span-1 w-full h-full shadow-none rounded-r-none rounded-l-sm">
        <CardHeader>
          <h1 className=" m-4 text-xl font-bold">{t("label")}</h1>
        </CardHeader>
        <CardBody className=" flex flex-col justify-start p-8 items-center gap-10">
          <Button
            radius="sm"
            className=" w-full"
            variant="bordered"
            size="lg"
            onPress={() => GoogleLogin()}
            startContent={<FcGoogle />}
          >
            {t("sign in with google")}
          </Button>
          <div className=" grid grid-cols-12 w-full grid-rows-1">
            <Divider className=" col-span-4 my-3"></Divider>
            <div className=" col-span-4 w-full text-center">
              {t("or email")}
            </div>
            <Divider className=" col-span-4 my-3"></Divider>
          </div>
          <div className=" w-full flex-col flex justify-center items-center gap-4">
            <Input
              placeholder={t("email.label")}
              className="w-full"
              radius="sm"
              variant="underlined"
              labelPlacement="outside"
              size="lg"
              startContent={<MdOutlineEmail />}
            ></Input>
            <Input
              placeholder={t("password.label")}
              className="w-full"
              radius="sm"
              variant="underlined"
              startContent={<MdOutlinePassword />}
              labelPlacement="outside"
              size="lg"
            ></Input>
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
            <Button className=" w-full bg-color-3/30 text-color-4 font-bold rounded-sm">
              {t("action")}
            </Button>
          </div>
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
