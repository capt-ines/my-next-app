import React from "react";
import { GrNext } from "react-icons/gr";
import clsx from "clsx";

const ArrowButton = ({
  onClick,
  className,
  direction = "up",
}: {
  onClick?: () => void;
  direction?: string;
  className?: string;
}) => {
  return (
    <button
      className="hover:text-foreground/80 active:text-foreground/60 cursor-pointer p-4 transition-transform duration-200 hover:scale-120 active:scale-140"
      onClick={onClick}
    >
      <GrNext
        className={clsx(
          direction === "right" && "",
          direction === "left" && "-rotate-180",
          direction === "down" && "rotate-90",
          direction === "up" && "-rotate-90",
          className,
        )}
      />
    </button>
  );
};

export default ArrowButton;
