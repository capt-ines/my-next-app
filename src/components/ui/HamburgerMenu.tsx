import React from "react";
import { useState } from "react";
import clsx from "clsx";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <button
        onClick={toggleMenu}
        className="group m-2 flex cursor-pointer flex-col items-center gap-1"
      >
        <div className="flex gap-1">
          <div
            className={clsx(
              "bg-foreground z-50 h-1 w-1 transform rounded-full transition-transform duration-100",
              isOpen ? "scale-[900%]" : "group-hover:scale-120",
            )}
          ></div>
          <div
            className={clsx(
              "bg-foreground z-50 h-1 w-1 transform rounded-full transition-transform duration-100",
              isOpen ? "scale-[900%]" : "group-hover:scale-120",
            )}
          ></div>
          <div
            className={clsx(
              "bg-foreground z-50 h-1 w-1 transform rounded-full transition-transform duration-100",
              isOpen ? "scale-[900%]" : "group-hover:scale-120",
            )}
          ></div>
        </div>
        <div className="flex gap-1">
          <div
            className={clsx(
              "bg-foreground z-50 h-1 w-1 transform rounded-full transition-transform duration-100",
              isOpen ? "scale-[900%]" : "group-hover:scale-120",
            )}
          ></div>
          <div
            className={clsx(
              "bg-foreground z-[51] h-1 w-1 transform rounded-full transition duration-700",
              isOpen ? "bg-primary scale-[90000%]" : "group-hover:scale-120",
            )}
          ></div>
          <div
            className={clsx(
              "bg-foreground z-50 h-1 w-1 transform rounded-full transition-transform duration-100",
              isOpen ? "scale-[900%]" : "group-hover:scale-120",
            )}
          ></div>
        </div>
        <div className="flex gap-1">
          <div
            className={clsx(
              "bg-foreground z-50 h-1 w-1 transform rounded-full transition-transform duration-100",
              isOpen ? "scale-[900%]" : "group-hover:scale-120",
            )}
          ></div>
          <div
            className={clsx(
              "bg-foreground z-50 h-1 w-1 transform rounded-full transition-transform duration-100",
              isOpen ? "scale-[900%]" : "group-hover:scale-120",
            )}
          ></div>
          <div
            className={clsx(
              "bg-foreground z-50 h-1 w-1 transform rounded-full transition-transform duration-100",
              isOpen ? "scale-[900%]" : "group-hover:scale-120",
            )}
          ></div>
        </div>
      </button>
      {isOpen && (
        <ul className="text-primary-foreground absolute top-20 right-10 z-52 flex flex-col gap-3 text-right text-xl transition duration-500 ease-in-out min-[580px]:right-30 min-[580px]:gap-4 min-[580px]:text-2xl">
          <li>Sign in</li>
          <li>Our mission</li>
          <li>Find inspiration</li>
        </ul>
      )}
    </div>
  );
};

export default HamburgerMenu;
