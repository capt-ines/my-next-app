import React from "react";

const Container = ({ children, style }) => {
  return (
    <div
      className={`bg-background/30 border-secondary/35 mx-auto rounded-lg border-1 px-3 py-3 backdrop-blur-md min-[400px]:px-9 sm:py-5 ${style}`}
    >
      {children}
    </div>
  );
};

export default Container;
