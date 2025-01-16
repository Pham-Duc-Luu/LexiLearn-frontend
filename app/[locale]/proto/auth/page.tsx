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
import { LoginCard } from "./LoginCard";
import { SignUpCard } from "./SignUpCard";
import { ForgotPasswordcard } from "./ForgotPasswordCard";

export type AuthDisplay = "sign up" | "log in" | "forgot password";
const page = () => {
  const [display, setDisplay] = useState<AuthDisplay>("log in");
  const [duration, setduration] = useState(0.04);
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Card className=" lg:w-[800px] h-[600px] relative rounded-sm shadow-xl shadow-gray-600">
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover rounded-sm "
          src={backgroudImage.src}
        />
        <AnimatePresence>
          {display === "log in" && (
            <LoginCard
              display={display}
              setDisplay={setDisplay}
              duration={duration}
            ></LoginCard>
          )}
          {display === "sign up" && (
            <SignUpCard
              display={display}
              setDisplay={setDisplay}
              duration={duration}
            ></SignUpCard>
          )}
          {display === "forgot password" && (
            <ForgotPasswordcard
              display={display}
              setDisplay={setDisplay}
              duration={duration}
            ></ForgotPasswordcard>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
};

export default page;
