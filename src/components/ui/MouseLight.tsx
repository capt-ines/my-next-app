import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MouseLight = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  //setposition x i y , 2 state

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const scrollX = window.scrollX || 0;
      const scrollY = window.scrollY || 0;
      setPosition({
        x: event.clientX + scrollX,
        y: event.clientY + scrollY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "tween" }}
      className="from-accent pointer-events-none absolute hidden h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-radial to-transparent to-70% lg:inline"
    ></motion.div>
  );
};

export default MouseLight;
