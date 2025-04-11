import React, { useEffect, useState, RefObject, useRef } from "react";
import { frame, motion, useSpring } from "framer-motion";

// const [position, setPosition] = useState({ x: 0, y: 0 });
// //setposition x i y , 2 state

// useEffect(() => {
//   const handleMouseMove = (event: MouseEvent) => {
//     const scrollX = window.scrollX || 0;
//     const scrollY = window.scrollY || 0;
//     setPosition({
//       x: event.clientX + scrollX,
//       y: event.clientY + scrollY,
//     });
//   };

//   window.addEventListener("mousemove", handleMouseMove);
//   return () => window.removeEventListener("mousemove", handleMouseMove);
// }, []);

export default function MouseLight() {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useFollowPointer(ref);

  return <motion.div ref={ref} style={{ ...ball, x, y }} />;
}

const spring = { damping: 30, stiffness: 100, restDelta: 0.001 };

export function useFollowPointer(ref: RefObject<HTMLDivElement | null>) {
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!;

      frame.read(() => {
        x.set(clientX - element.offsetLeft - element.offsetWidth / 2);
        y.set(clientY - element.offsetTop - element.offsetHeight / 2);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return { x, y };
}

const ball = {
  width: 100,
  height: 100,
  backgroundColor: "#ffffff",
  borderRadius: "50%",
  position: "absolute",
};
