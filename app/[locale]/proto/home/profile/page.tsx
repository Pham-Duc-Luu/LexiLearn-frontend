import { faker } from "@faker-js/faker";
import { Avatar, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React from "react";
import { IoAddOutline } from "react-icons/io5";

const page = () => {
  return (
    <div className=" w-full h-full">
      <Card className=" rounded-sm m-10">
        <CardHeader>
          <h1 className=" text-lg font-semibold">Personal information</h1>
        </CardHeader>
        <Divider></Divider>
        <CardBody>
          <h1 className=" m-4 text-lg font-semibold">Avatar</h1>
          <div className=" grid grid-cols-12">
            <div className=" flex justify-center items- col-span-2 aspect-square">
              <Avatar
                className=" w-2/3 h-2/3"
                src={faker.image.avatar()}
              ></Avatar>
            </div>
            <div className=" col-span-10 grid grid-cols-12">
              {Array.from({ length: 25 }, (i, j) => {
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
                  fallback={<IoAddOutline size={20} />}
                ></Avatar>
              </div>
            </div>
          </div>
          <Divider></Divider>
          <div className=" m-4">
            <h1 className=" text-lg font-semibold">Username</h1>

            <div> {faker.person.fullName()}</div>
          </div>
          <Divider></Divider>

          <div className=" m-4">
            <h1 className=" text-lg font-semibold">Email</h1>

            <div> {faker.internet.email()}</div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default page;
