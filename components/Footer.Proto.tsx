"use client";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import SparklesText from "./magicui/sparkles-text";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  NavbarBrandProps,
  NavbarProps,
} from "@nextui-org/react";
import { useRouter } from "@/i18n/routing";
import { CiDark, CiLight } from "react-icons/ci";
import { useTheme } from "next-themes";
import ThemSwitch from "./ThemSwitch";
import { useTranslations } from "next-intl";
import DropdownAvatar from "./DropdownAvatar";
import { useAppSelector } from "@/store/hooks";
import { AUTH_SIGN_IN, DASHBOARD_ROUTE } from "@/store/route.slice";
const FooterProto = (navbarProps: NavbarProps) => {
  const router = useRouter();
  const t = useTranslations("dashboard.my collection");
  const Tutils = useTranslations("utils");

  return (
    <Navbar
      isBordered
      {...navbarProps}
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    ></Navbar>
  );
};

export default FooterProto;
