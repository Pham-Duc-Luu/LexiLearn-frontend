"use client";
import React, { useState } from "react";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  MdArrowBack,
  MdDashboard,
  MdLibraryBooks,
  MdOutlineSpaceDashboard,
  MdOutlineSupervisedUserCircle,
  MdSettings,
} from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  Sidebar,
  SidebarBody,
  SideBarItemButon,
  SidebarLink,
} from "@/components/aceternity/sidebar";
import { useAppSelector } from "@/store/Proto-slice/ProtoStore";
import { Divider } from "@nextui-org/react";

export function SidebarDemo({ children }: { children: React.ReactNode }) {
  const links = [
    {
      label: "Dashboard",
      icon: (
        <MdDashboard
          size={24}
          className="text-neutral-700 dark:text-neutral-200  flex-shrink-0"
        />
      ),
    },
    {
      label: "Library",
      icon: (
        <MdLibraryBooks
          size={24}
          className="text-neutral-700 dark:text-neutral-200  flex-shrink-0"
        />
      ),
    },

    {
      label: "Settings",
      icon: (
        <MdSettings
          size={24}
          className="text-neutral-700 dark:text-neutral-200  flex-shrink-0"
        />
      ),
    },
    {
      label: "Logout",
      icon: (
        <MdArrowBack
          size={24}
          className="text-neutral-700 dark:text-neutral-200  flex-shrink-0"
        />
      ),
    },
  ];

  const { sidebar } = useAppSelector((state) => state.HomePage);
  const [selectButton, setselectButton] = useState<number>();
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
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SideBarItemButon
                    onClick={() => setselectButton(idx)}
                    className={selectButton === idx ? "bg-color-4/40" : ""}
                    key={idx}
                    button={link}
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
