"use client";
import React, { useState } from "react";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  MdArrowBack,
  MdDashboard,
  MdHome,
  MdLibraryBooks,
  MdOutlineHome,
  MdOutlineLibraryBooks,
  MdOutlineSettings,
  MdOutlineSpaceDashboard,
  MdOutlineSupervisedUserCircle,
  MdSettings,
} from "react-icons/md";
import { FaRegUser, FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  Sidebar,
  SidebarBody,
  SideBarButton,
  SideBarItemButon,
  SidebarLink,
} from "@/components/aceternity/sidebar";
import { useAppSelector } from "@/store/Proto-slice/ProtoStore.slice";
import { Divider } from "@nextui-org/react";

export function SidebarDemo({ children }: { children: React.ReactNode }) {
  const topSideBar: SideBarButton[] = [
    {
      label: "Dashboard",
      iconLine: (
        <MdOutlineHome
          size={24}
          className="text-neutral-700 dark:text-neutral-200 font-thin text-sm  flex-shrink-0"
        />
      ),
      iconFill: (
        <MdHome
          size={24}
          className="text-neutral-700 dark:text-neutral-200  flex-shrink-0"
        />
      ),
    },

    {
      label: "Library",
      iconLine: (
        <MdOutlineLibraryBooks
          size={24}
          className="text-neutral-700 dark:text-neutral-200  flex-shrink-0"
        />
      ),
      iconFill: (
        <MdLibraryBooks
          size={24}
          className="text-neutral-700 dark:text-neutral-200  flex-shrink-0"
        />
      ),
    },
    {
      label: "User",
      iconLine: (
        <FaRegUserCircle
          size={24}
          className="text-neutral-700 dark:text-neutral-200 font-thin text-sm  flex-shrink-0"
        />
      ),
      iconFill: (
        <FaUserCircle
          size={24}
          className="text-neutral-700 dark:text-neutral-200  flex-shrink-0"
        />
      ),
    },
  ];

  const bottomSideBar: SideBarButton[] = [
    {
      label: "Settings",
      iconLine: (
        <MdOutlineSettings
          size={24}
          className="text-neutral-700 dark:text-neutral-200  flex-shrink-0"
        />
      ),
      iconFill: (
        <MdSettings
          size={24}
          className="text-neutral-700 dark:text-neutral-200  flex-shrink-0"
        />
      ),
    },
  ];
  const { sidebar } = useAppSelector((state) => state.HomePage);
  const [selectButton, setselectButton] = useState<string>();
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "flex-1" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <div>
        <Sidebar open={sidebar.isOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 justify-between overflow-y-auto overflow-x-hidden">
              <div className=" flex flex-col gap-4 ">
                {topSideBar.map((link, idx) => (
                  <SideBarItemButon
                    onClick={() => setselectButton(link.label)}
                    className={
                      selectButton === link.label ? "bg-color-4/40" : ""
                    }
                    key={idx}
                    button={{
                      ...link,
                      icon:
                        selectButton === link.label
                          ? link.iconFill
                          : link.iconLine,
                    }}
                    variant="light"
                  />
                ))}
              </div>
              <div className=" flex flex-col ">
                {bottomSideBar.map((link, idx) => (
                  <SideBarItemButon
                    onClick={() => setselectButton(link.label)}
                    className={
                      selectButton === link.label ? "bg-color-4/40" : ""
                    }
                    key={idx}
                    button={{
                      ...link,
                      icon:
                        selectButton === link.label
                          ? link.iconFill
                          : link.iconLine,
                    }}
                    variant="light"
                  />
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
      </div>
      {/* <Dashboard /> */}
      <div>
        <Divider orientation="vertical" className=" h-full"></Divider>
      </div>
      <>{children}</>
    </div>
  );
}
