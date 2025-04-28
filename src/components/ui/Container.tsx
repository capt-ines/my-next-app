import clsx from "clsx";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={clsx("aero rounded-lg border-1 p-3 shadow-xs", className)}>
      {children}
    </div>
  );
};

export default Container;
