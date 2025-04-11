import React from "react";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface DotTypes {
  isOpen: boolean;
  isBig?: boolean;
  backgroundColor: string;
}

const Dot = ({ backgroundColor, isOpen, isBig = false }: DotTypes) => (
  <motion.div
    animate={
      isOpen ? { backgroundColor: "var(--color-global-background)" } : {}
    }
    transition={{ duration: 0.3 }}
    initial={{ backgroundColor: backgroundColor }}
    className={`h-1 w-1 transform rounded-full transition duration-800 ease-in-out ${
      isBig
        ? isOpen
          ? `scale-[50000%]`
          : `scale-[100%] group-hover:scale-[120%]`
        : isOpen
          ? `scale-[900%]`
          : `scale-[100%] group-hover:scale-[120%]`
    }`}
  />
);

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isIndex = pathname === "/";
  const backgroundColor = isIndex
    ? "var(--color-white)"
    : "var(--color-foreground)";

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="z-50">
      <button
        onClick={toggleMenu}
        className="group -my-4 -mr-6 flex cursor-pointer flex-col items-center gap-1 p-6"
      >
        <div className="flex gap-1">
          <Dot isOpen={isOpen} backgroundColor={backgroundColor} />
          <Dot isOpen={isOpen} backgroundColor={backgroundColor} />
          <Dot isOpen={isOpen} backgroundColor={backgroundColor} />
        </div>
        <div className="flex gap-1">
          <Dot isOpen={isOpen} backgroundColor={backgroundColor} />
          <Dot isOpen={isOpen} backgroundColor={backgroundColor} isBig={true} />
          <Dot isOpen={isOpen} backgroundColor={backgroundColor} />
        </div>
        <div className="flex gap-1">
          <Dot isOpen={isOpen} backgroundColor={backgroundColor} />
          <Dot isOpen={isOpen} backgroundColor={backgroundColor} />
          <Dot isOpen={isOpen} backgroundColor={backgroundColor} />
        </div>
      </button>
      <div
        className={`text-primary-foreground absolute top-10 right-8 z-52 flex flex-col items-end gap-3 text-right transition duration-600 ease-in-out min-[580px]:right-10 min-[580px]:gap-4 min-[580px]:text-2xl ${isOpen ? `opacity-100` : `translate-x-60 -translate-y-60 opacity-0`}`}
      >
        <button onClick={toggleMenu} className="cursor-pointer pb-3 pl-6">
          <ArrowUpIcon className="scale-220 rotate-45" />
        </button>
        <ul
          className={`flex flex-col gap-5 text-right text-3xl transition duration-600 ease-in-out min-[580px]:right-30 min-[580px]:gap-6 ${isOpen ? `opacity-100` : `translate-x-60 -translate-y-60 opacity-0`}`}
        >
          <li className="transition duration-400 hover:scale-110">
            <Link onClick={toggleMenu} href="/login">
              Sign in
            </Link>
          </li>
          <li className="transition duration-400 hover:scale-110">
            <Link onClick={toggleMenu} href="/about">
              Our mission
            </Link>
          </li>
          <li className="transition duration-400 hover:scale-110">
            Find inspiration
          </li>
          <li
            translate="no"
            className="transition duration-400 hover:scale-110"
          >
            Soulscape blog
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HamburgerMenu;
