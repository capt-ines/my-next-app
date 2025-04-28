import React from "react";
import Container from "./Container";
import { PiBookThin } from "react-icons/pi";
import { PiBookmarksSimpleThin } from "react-icons/pi";
import { PiButterflyThin } from "react-icons/pi";
import { PiSquaresFourThin } from "react-icons/pi";
import { PiUserCircleThin } from "react-icons/pi";

const NavIsland = () => {
  return (
    <div className="bg-background/20 fixed right-0 bottom-0 left-0 flex items-center justify-between gap-2 px-5 py-3 backdrop-blur-md">
      <PiBookThin size={40} />
      <PiBookmarksSimpleThin size={40} />
      <PiButterflyThin size={40} />
      <PiSquaresFourThin size={40} />
      <PiUserCircleThin size={40} />
    </div>
  );
};

export default NavIsland;
