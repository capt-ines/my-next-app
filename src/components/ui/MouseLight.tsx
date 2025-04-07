import React, { useEffect } from "react";
import useMousePosition from "@/hooks/useMousePosition.js";
import { motion } from "framer-motion";

const MouseLight = () => {
  const { x, y } = useMousePosition();
  return (
    <motion.div
      animate={{ x, y }}
      transition={{ type: "tween" }}
      className="to-background from-glow absolute hidden h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-radial to-70% lg:inline"
    ></motion.div>
  );
};

export default MouseLight;
