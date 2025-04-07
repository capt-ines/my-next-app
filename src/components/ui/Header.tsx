import React from "react";
import { Button } from "./button";
import Image from "next/image";
import Logo from "../../../public/logospiral";
import HamburgerMenu from "./HamburgerMenu";

const Header = () => {
  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
  }

  return (
    <div className="absolute right-0 left-0 w-full pt-6">
      <div className="flex items-center justify-between">
        <div className="m-2 flex items-center gap-1">
          <h1 className="text-white">soulscape</h1>
          <Logo className="text-white" />
        </div>
        <HamburgerMenu />
        {/* <Button onClick={toggleTheme} /> */}
      </div>
    </div>
  );
};

export default Header;
