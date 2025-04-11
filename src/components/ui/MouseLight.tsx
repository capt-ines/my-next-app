import React, { useEffect, useState, RefObject, useRef } from "react";
import { frame, motion, useSpring } from "framer-motion";

export default function MouseLight() {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useFollowPointer(ref);

  return (
    <motion.div
      className="via-accent bg-radial from-white to-transparent blur-xl"
      ref={ref}
      style={{ ...ball, x, y }}
    />
  );
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
  width: 200,
  height: 200,
  borderRadius: "50%",
  position: "absolute",
};
