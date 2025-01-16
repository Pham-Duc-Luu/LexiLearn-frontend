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
  InputOtp,
} from "@nextui-org/react";
import React, { useState } from "react";
import backgroudImage from "@/public/sign in backgroud.jpg";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail, MdOutlinePassword } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AuthDisplay } from "./page";
import { RiSendPlane2Line } from "react-icons/ri";

export const ForgotPasswordcard = ({
  display,
  duration,
  setDisplay,
}: {
  display: AuthDisplay;
  duration: number;
  setDisplay: React.Dispatch<React.SetStateAction<AuthDisplay>>;
}) => {
  const t = useTranslations("auth.forgotPassword");
  const t1 = useTranslations("auth.sign up");
  return (
    <motion.div
      initial={{ opacity: 0, top: "100%" }}
      className="absolute w-1/2  h-full"
      animate={{
        opacity: display === "forgot password" ? 1 : 0,
        top: 0,
      }}
      transition={{ duration, ease: "linear" }}
    >
      <Card className=" col-span-1 w-full h-full shadow-none rounded-r-none rounded-l-sm">
        <CardHeader className="m-4  flex flex-col justify-center items-start">
          <h1 className=" text-xl font-bold">{t("label")}</h1>
        </CardHeader>
        <CardBody className="  flex flex-col justify-start p-8  items-center gap-10">
          <Input
            placeholder={t("email.label")}
            endContent={
              <Button
                className="  bg-color-3/30 text-color-4 font-bold rounded-sm"
                endContent={<RiSendPlane2Line />}
              >
                {t("action.send OTP")}
              </Button>
            }
            className="w-full"
            radius="sm"
            variant="underlined"
            labelPlacement="outside"
            size="lg"
            startContent={<MdOutlineEmail />}
          ></Input>

          <div className=" w-full  flex justify-between items-center">
            <InputOtp description="enter otp" variant="underlined" length={6} />
          </div>

          <Input
            placeholder={t("password.label")}
            className="w-full"
            radius="sm"
            variant="underlined"
            type="password"
            startContent={<MdOutlinePassword />}
            labelPlacement="outside"
            size="lg"
          ></Input>
          <Button className=" w-full bg-color-3/30 text-color-4 font-bold rounded-sm">
            Reset password
          </Button>
        </CardBody>
        <CardFooter className=" bg-gray-100 flex justify-center items-center gap-3">
          <div>{t1("sign in.label")}</div>
          <Button
            className="  bg-color-3/30 text-color-4 font-bold rounded-sm"
            onPress={() => setDisplay("log in")}
          >
            {t1("sign in.action")}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
