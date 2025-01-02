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
const page = () => {
  const [display, setDisplay] = useState<"sign up" | "log in">("log in");
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
                  <h1 className=" m-4 text-xl font-bold">
                    Login in to Lexilearn
                  </h1>
                </CardHeader>
                <CardBody className=" flex flex-col justify-start p-8 items-center gap-10">
                  <Button
                    radius="sm"
                    className=" w-full"
                    variant="bordered"
                    size="lg"
                    startContent={<FcGoogle />}
                  >
                    Login with google
                  </Button>
                  <div className=" grid grid-cols-12 w-full grid-rows-1">
                    <Divider className=" col-span-4 my-3"></Divider>
                    <div className=" col-span-4 w-full text-center">
                      or email
                    </div>
                    <Divider className=" col-span-4 my-3"></Divider>
                  </div>
                  <div className=" w-full flex-col flex justify-center items-center gap-4">
                    <Input
                      placeholder="Enter your email address"
                      className="w-full"
                      radius="sm"
                      variant="underlined"
                      labelPlacement="outside"
                      size="lg"
                      startContent={<MdOutlineEmail />}
                    ></Input>
                    <Input
                      placeholder="Enter your password"
                      className="w-full"
                      radius="sm"
                      variant="underlined"
                      startContent={<MdOutlinePassword />}
                      labelPlacement="outside"
                      size="lg"
                    ></Input>
                    <Button className=" w-full bg-color-3/30 text-color-4 font-bold rounded-sm">
                      Login
                    </Button>
                  </div>
                </CardBody>
                <CardFooter className=" bg-gray-100 flex justify-center items-center gap-3">
                  <div>Don't have an account?</div>
                  <Button
                    className="  bg-color-3/30 text-color-4 font-bold rounded-sm"
                    onPress={() => setDisplay("sign up")}
                  >
                    Sign up
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
          {display === "sign up" && (
            <motion.div
              initial={{ opacity: 0, left: 0 }}
              className="absolute w-1/2  h-full"
              animate={{
                opacity: display === "sign up" ? 1 : 0,
                right: 0,
                left: "unset",
              }}
              transition={{ duration, ease: "linear" }}
            >
              <Card className=" col-span-1 w-full h-full shadow-none rounded-r-sm rounded-l-none">
                <CardHeader>
                  <h1 className=" m-4 text-xl font-bold">
                    Sign up to Lexilearn
                  </h1>
                </CardHeader>
                <CardBody className=" flex flex-col justify-start p-8 items-center gap-10">
                  <Button
                    radius="sm"
                    className=" w-full"
                    variant="bordered"
                    size="lg"
                    startContent={<FcGoogle />}
                  >
                    Login with google
                  </Button>
                  <div className=" grid grid-cols-12 w-full grid-rows-1">
                    <Divider className=" col-span-4 my-3"></Divider>
                    <div className=" col-span-4 w-full text-center">
                      or email
                    </div>
                    <Divider className=" col-span-4 my-3"></Divider>
                  </div>
                  <div className=" w-full flex-col flex justify-center items-center gap-4">
                    <Input
                      placeholder="Enter your email address"
                      className="w-full"
                      radius="sm"
                      variant="underlined"
                      labelPlacement="outside"
                      size="lg"
                      startContent={<MdOutlineEmail />}
                    ></Input>
                    <Input
                      placeholder="Enter your password"
                      className="w-full"
                      radius="sm"
                      variant="underlined"
                      startContent={<MdOutlinePassword />}
                      labelPlacement="outside"
                      size="lg"
                    ></Input>
                    <Input
                      placeholder="Enter your username"
                      className="w-full"
                      radius="sm"
                      variant="underlined"
                      startContent={<AiOutlineUser />}
                      labelPlacement="outside"
                      size="lg"
                    ></Input>
                    <Button className=" w-full bg-color-3/30 text-color-4 font-bold rounded-sm">
                      Sign up
                    </Button>
                  </div>
                </CardBody>
                <CardFooter className=" bg-gray-100 flex justify-center items-center gap-3">
                  <div>Already have a account?</div>
                  <Button
                    className="  bg-color-3/30 text-color-4 font-bold rounded-sm"
                    onPress={() => setDisplay("log in")}
                  >
                    Login
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
};

export default page;
