import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
} from "framer-motion";
import { getRandomRGBColor } from "@/utils/getRandomRGBColor";
import { useRef } from "react";
import { getRandomOne } from "@/utils/getRandomOne";
import { getRandomInt } from "@/utils/getRandomInt";
import { getRandomFloat } from "@/utils/getRandomFloat";

type ParticleProps = {
  speed?: number;
  center?: { x: number; y: number };
  color?: string;
  size?: string;
  direction?: "clockwise" | "counterclockwise";
};

export default function Particle({
  speed,
  direction,
  center,
  color,
  size,
}: ParticleProps) {
  const radius = 200;
  const angle = useMotionValue(0);
  const ref = useRef(null);

  const getCenterConst = () => {
    return { x: getRandomInt(100, 800), y: getRandomInt(100, 800) };
  };

  const directionConst = direction === "clockwise" ? 1 : -1 || getRandomOne();
  const speedConst = speed || getRandomFloat(0.02, 0.07);
  const constX = center ? center.x : getCenterConst().x;
  const constY = center ? center.y : getCenterConst().y;
  const sizeConst = size || getRandomInt(400, 800);

  useAnimationFrame((t) => {
    const angleInRadians =
      (t / 1000) * speedConst * 2 * Math.PI * directionConst; // default 1 rotation per second
    angle.set(angleInRadians);
  });

  const x = useTransform(angle, (a) => constX + radius * Math.cos(a));
  const y = useTransform(angle, (a) => constY + radius * Math.sin(a));

  return (
    <motion.div
      ref={ref}
      style={{
        x,
        y,
        backgroundColor: color || getRandomRGBColor(),
        boxShadow: `0 0 20px ${color || getRandomRGBColor()}`,
        width: sizeConst,
      }}
      className="absolute aspect-square rounded-full mix-blend-color-dodge"
    />
  );
}
