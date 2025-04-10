import React from "react";
// import Logo from "../../../public/logospiral";
import HamburgerMenu from "./HamburgerMenu";
import Navbar from "./Navbar";
import useMediaQuery from "@/hooks/useMediaQuery";
import { PiSpiralFill } from "react-icons/pi";

import Link from "next/link";

const Header = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <header className="mx-content pt-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          <div className="my-2 flex items-center gap-0.5">
            <h1 className="text-foreground text-logo">soulscape</h1>
            <PiSpiralFill
              size={20}
              className="text-foreground animate-quickspin"
            />
          </div>
        </Link>
        {isDesktop ? <Navbar /> : <HamburgerMenu />}
      </div>
    </header>
  );
};

export default Header;
