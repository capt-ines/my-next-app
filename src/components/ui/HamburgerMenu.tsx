import React from "react";
import { useState } from "react";
import clsx from "clsx";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <button
      onClick={toggleMenu}
      className="group m-2 flex cursor-pointer flex-col items-center gap-1"
    >
      <div className="flex gap-1">
        <div
          className={clsx(
            "bg-on-background z-50 h-1 w-1 transform rounded-full transition-transform duration-100",
            isOpen ? "scale-[900%]" : "group-hover:scale-120",
          )}
        ></div>
        <div
          className={clsx(
            "bg-on-background z-50 h-1 w-1 transform rounded-full transition-transform duration-100",
            isOpen ? "scale-[900%]" : "group-hover:scale-120",
          )}
        ></div>
        <div
          className={clsx(
            "bg-on-background z-50 h-1 w-1 transform rounded-full transition-transform duration-100",
            isOpen ? "scale-[900%]" : "group-hover:scale-120",
          )}
        ></div>
      </div>
      <div className="flex gap-1">
        <div
          className={clsx(
            "bg-on-background z-50 h-1 w-1 transform rounded-full transition-transform duration-100",
            isOpen ? "scale-[900%]" : "group-hover:scale-120",
          )}
        ></div>
        <div
          className={clsx(
            "bg-on-background z-[51] h-1 w-1 transform rounded-full transition duration-700",
            isOpen ? "bg-primary scale-[90000%]" : "group-hover:scale-120",
          )}
        ></div>
        <div
          className={clsx(
            "bg-on-background z-50 h-1 w-1 transform rounded-full transition-transform duration-100",
            isOpen ? "scale-[900%]" : "group-hover:scale-120",
          )}
        ></div>
      </div>
      <div className="flex gap-1">
        <div
          className={clsx(
            "bg-on-background z-50 h-1 w-1 transform rounded-full transition-transform duration-100",
            isOpen ? "scale-[900%]" : "group-hover:scale-120",
          )}
        ></div>
        <div
          className={clsx(
            "bg-on-background z-50 h-1 w-1 transform rounded-full transition-transform duration-100",
            isOpen ? "scale-[900%]" : "group-hover:scale-120",
          )}
        ></div>
        <div
          className={clsx(
            "bg-on-background z-50 h-1 w-1 transform rounded-full transition-transform duration-100",
            isOpen ? "scale-[900%]" : "group-hover:scale-120",
          )}
        ></div>
      </div>
    </button>
  );
};

export default HamburgerMenu;
