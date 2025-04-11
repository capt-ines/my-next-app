import React from "react";
// import Logo from "../../../public/logospiral";
import HamburgerMenu from "./HamburgerMenu";
import Navbar from "./Navbar";
import { PiSpiralFill } from "react-icons/pi";

import Link from "next/link";
import useMediaQuery from "@/hooks/useMediaQuery";

const Header = ({ color }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <header className="mx-content flex items-center justify-between pt-4">
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
      {isDesktop ? <Navbar color={color} /> : <HamburgerMenu color={color} />}
    </header>
  );
};

export default Header;
