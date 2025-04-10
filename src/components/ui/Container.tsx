import React from "react";

const Container = ({ children, style }) => {
  return (
    <div
      className={`aero mx-auto rounded-lg border-1 px-3 py-3 shadow-xs backdrop-blur-xs min-[400px]:px-9 sm:py-5 ${style}`}
    >
      {children}
    </div>
  );
};

export default Container;
