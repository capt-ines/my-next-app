import React from "react";
// import Container from "./Container";
// import { PiBookThin } from "react-icons/pi";
// import { PiBookmarksSimpleThin } from "react-icons/pi";
// import { PiButterflyThin } from "react-icons/pi";
// import { PiSquaresFourThin } from "react-icons/pi";
// import { PiUserCircleThin } from "react-icons/pi";
// import { PiCompassRoseThin } from "react-icons/pi";
// import { PiPlusCircleThin } from "react-icons/pi";
// import Link from "next/link";
// import clsx from "clsx";

type NavIslandProps = {
  children: React.ReactNode;
};

const NavIsland = ({ children }: NavIslandProps) => {
  return (
    <div className="blur-gradient-top fixed right-0 bottom-0 left-0 flex items-center justify-center px-4.5 pt-5 pb-3">
      <div className="flex items-center justify-center gap-2">{children}</div>
    </div>
  );
};

export default NavIsland;
