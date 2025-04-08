import { Button } from "./button";
import MouseLight from "./MouseLight";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const handlePingAndRedirect = (url: string) => {
    setIsClicked(true);

    setTimeout(() => {
      router.push(url);
    }, 1000);
  };

  return (
    <>
      <motion.div
        animate={
          isClicked ? { scale: 2, opacity: 1 } : { scale: 1, opacity: 0 }
        }
        transition={{ duration: 1, ease: "easeOut" }}
        className={`bg-on-background opacity-0, absolute h-screen w-screen ${isClicked ? "z-100" : "-z-50"}`}
      ></motion.div>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex h-screen items-center"
      >
        <div
          className={`bg-on-background mx-auto flex aspect-square w-full max-w-md min-w-3xs flex-col items-center justify-center rounded-full px-5 shadow-[0_0_50px_var(--color-white)] transition duration-1000 ease-out hover:shadow-[0_0_200px_var(--color-white)] sm:px-10 ${isClicked ? "scale-150" : "hover:scale-105"}`}
        >
          <div>
            <h1
              className={`text-shadow-lg text-center font-bold transition duration-1000 sm:text-2xl ${isClicked ? "text-transparent" : "text-background"}`}
            >
              Illuminate your soul’s path.
            </h1>
            <p
              className={`text-background text-center text-sm transition duration-1000 sm:text-lg ${isClicked ? "text-transparent" : "text-background"}`}
            >
              A powerful set of tools to navigate it with clarity and craft with
              purpose.
            </p>
          </div>

          <Button
            onClick={() => handlePingAndRedirect("/auth")}
            className={`absolute translate-y-16 cursor-pointer text-xs transition sm:mt-8 sm:text-sm ${isClicked ? "bg-transparent text-transparent duration-1000" : "text-on-background bg-primary duration-500 hover:scale-105"}`}
          >
            Get started
          </Button>
        </div>
      </motion.section>
    </>
  );
};

export default HeroSection;
