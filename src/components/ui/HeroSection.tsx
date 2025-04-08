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
        className="bg-on-background absolute h-screen w-screen opacity-0"
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
            <h1 className="text-background text-shadow-lg text-center font-bold sm:text-2xl">
              Illuminate your soul’s path.
            </h1>
            <p className="text-background text-center text-sm sm:text-lg">
              A powerful set of tools to navigate it with clarity and craft with
              purpose.
            </p>
          </div>

          <Button
            onClick={() => handlePingAndRedirect("/auth")}
            className="bg-primary absolute translate-y-16 cursor-pointer text-xs transition duration-500 hover:scale-105 sm:mt-8 sm:text-sm"
          >
            Get started
          </Button>
        </div>
      </motion.section>
    </>
  );
};

export default HeroSection;
