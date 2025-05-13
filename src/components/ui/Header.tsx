import React from "react";
// import Logo from "../../../public/logospiral";
import HamburgerMenu from "./HamburgerMenu";
import Navbar from "./Navbar";
import { PiSpiralFill } from "react-icons/pi";
import Link from "next/link";
import useMediaQuery from "@/hooks/useMediaQuery";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { CiSettings } from "react-icons/ci";
import { useRouter } from "next/router";
import { SignOut } from "@supabase/supabase-js";
import { GrNext } from "react-icons/gr";
import { PiDoorOpenThin } from "react-icons/pi";
import ArrowButton from "@/components/ui/arrowButton";
import { RxDotsHorizontal } from "react-icons/rx";
import { signOut } from "@/utils/auth/signOut";
import { PiNutThin } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const pathname = usePathname();
  const isIndex = pathname === "/";
  // const isDashboard = pathname.startsWith("/dashboard");
  const color = isIndex ? "white" : "foreground";

  return (
    <header
      className={clsx(
        "blur-gradient fixed z-[20] flex w-full items-center justify-between px-4.5 pt-2 pb-5",
      )}
    >
      <Link href="/">
        <div className="my-2 flex items-center gap-0.5">
          <h1 translate="no" className={`text-${color} text-logo`}>
            soulscape
          </h1>
          <PiSpiralFill
            size={20}
            className={`text-${color} animate-quickspin`}
          />
        </div>
      </Link>
      {/* {isDesktop ? (
        <Navbar />
      ) : isDashboard ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2">
            <RxDotsHorizontal size={30} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mx-content min-w-36">
            <DropdownMenuLabel>
              <div className="flex gap-2 items-center">
                <CiSettings size={20} />
                <span>Create</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem className="">
              <Link
                href="/dashboard/dream-preview"
                className="flex gap-2 items-center"
              >
                <span>Dream Preview</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="">
              <Link
                href="/dashboard/journal"
                className="flex gap-2 items-center"
              >
                <span>Journal</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="">
              <Link
                href="/dashboard/affirmations"
                className="flex gap-2 items-center"
              >
                <span>Affirmations</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="">
              <Link
                href="/dashboard/mockup-studio"
                className="flex gap-2 items-center"
              >
                <span>Mockup Studio</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>
              <div className="flex items-center gap-2">
                <CiSettings size={20} />
                <span>Settings</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem className="">
              <Link
                href="/dashboard/settings/details"
                className="flex items-center gap-2"
              >
                <span>Personal details</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="">
              <Link
                href="/dashboard/settings/details"
                className="flex items-center gap-2"
              >
                <span>Profile management</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="">
              <Link
                href="/dashboard/settings/aura"
                className="flex items-center gap-2"
              >
                <span>Aura</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="">
              <div
                onClick={() => signOut(router)}
                className="flex items-center gap-2"
              >
                <PiDoorOpenThin className="text-foreground size-5"></PiDoorOpenThin>
                <span>Sign out</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <HamburgerMenu />
      )} */}
    </header>
  );
};

export default Header;
