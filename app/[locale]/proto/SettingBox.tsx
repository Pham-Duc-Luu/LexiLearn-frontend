import React, { useEffect, useState } from "react";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
  IconBrandMeta,
  IconAdjustmentsAlt,
  IconFileDescription,
  IconCards,
  IconMoon,
  IconSun,
  IconLogin,
  IconUser,
  IconLibrary,
} from "@tabler/icons-react";
import Image from "next/image";
import { FloatingDock } from "./floating-dock";
import { Button } from "@nextui-org/react";

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "@/i18n/routing";
import { useTheme } from "next-themes";

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const route = useRouter();
  return (
    <div
      onClick={() => {
        if (href.startsWith("http")) {
          window.open(href, "_blank");
        }
        if (href.startsWith("/proto")) {
          route.push(href);
        }
      }}
      className=" cursor-pointer"
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </div>
  );
}

function ThemModeIcon({ mouseX }: { mouseX: MotionValue }) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, []);

  const route = useRouter();
  return (
    <div
      className=" cursor-pointer"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
            >
              Switch to {theme === "light" ? "dark mode" : "light mode"}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {theme === "dark" ? (
            <IconMoon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ) : (
            <IconSun className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-4 items-end  rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
      <ThemModeIcon mouseX={mouseX}></ThemModeIcon>
    </motion.div>
  );
};

export function SettingBox() {
  const links = [
    {
      title: "Home page",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/proto/home",
    },
    {
      title: "Login",
      icon: (
        <IconLogin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/proto/auth",
    },
    {
      title: "Edit desk page",
      icon: (
        <IconFileDescription className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/proto/new-desk-vocab",
    },
    {
      title: "library",
      icon: (
        <IconLibrary className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/proto/home/library",
    },
    {
      title: "Review flashcard page",
      icon: (
        <IconCards className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/proto/review/flashcard",
    },
    {
      title: "Meta",
      icon: (
        <IconBrandMeta className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.facebook.com/profile.php?id=100054196254333",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/Pham-Duc-Luu/LexiLearn-frontend",
    },
  ];
  const [toggle, setToggle] = useState(true);

  return (
    <div
      className=" absolute right-6 bottom-6 flex flex-row-reverse justify-center origin-left items-center h-14"
      style={{ zIndex: 999 }}
    >
      <Button
        radius="full"
        size="lg"
        isIconOnly
        onPress={() => {
          setToggle(!toggle);
        }}
      >
        <IconAdjustmentsAlt className=" text-neutral-500 dark:text-neutral-300 "></IconAdjustmentsAlt>
      </Button>
      <motion.div
        animate={{ scaleX: toggle ? 1 : 0, display: toggle ? "block" : "none" }}
        style={{ transformOrigin: "right center" }} // Set transform origin to the right
        className={cn(
          "flex items-center absolutes justify-center left-0  -translate-x-full"
        )}
      >
        <FloatingDockDesktop items={links}></FloatingDockDesktop>
      </motion.div>
    </div>
  );
}
