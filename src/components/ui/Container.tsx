import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  style?: string;
}

const Container: React.FC<ContainerProps> = ({ children, style = "" }) => {
  return (
    <div
      className={`aero rounded-lg border-1 px-3 py-3 shadow-xs min-[400px]:px-9 sm:py-5 ${style}`}
    >
      {children}
    </div>
  );
};

export default Container;
