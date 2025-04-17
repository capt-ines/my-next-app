import { Button } from "./button";
import MouseLight from "./MouseLight";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useUser } from "@/contexts/userContext";

const HeroSection = () => {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const handlePingAndRedirect = (url: string) => {
    setIsClicked(true);

    setTimeout(() => {
      router.push(url);
    }, 1000);
  };

  return (
    <>
      <motion.div
        animate={isClicked ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`absolute h-screen w-screen scale-120 transition-colors duration-2000 ${isClicked ? "bg-global-background z-100" : "bg-accent -z-50"}`}
      ></motion.div>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex h-screen items-center"
      >
        <div
          className={`mx-auto flex aspect-square w-full max-w-md min-w-3xs flex-col items-center justify-center rounded-full bg-white px-5 shadow-[0_0_30px_#ffffff,0_0_20px_var(--accent),0_0_100px_var(--accent)] transition duration-1000 ease-out hover:shadow-[0_0_40px_#ffffff,0_0_60px_var(--accent),0_0_300px_var(--accent)] sm:px-10 ${isClicked ? "bg-foreground/30 scale-150" : "hover:scale-105"}`}
        >
          <div>
            <h1
              className={`text-center text-xl transition duration-1000 min-[400px]:text-2xl min-[480px]:text-3xl ${isClicked ? "text-transparent" : "text-accent"}`}
            >
              Illuminate your soul’s path.
            </h1>
            <p
              className={`min-[400px]:text-md text-center text-sm transition duration-1000 min-[480px]:text-lg ${isClicked ? "text-transparent" : "text-accent"}`}
            >
              A powerful set of tools to navigate it with clarity and craft with
              purpose.
            </p>
          </div>

          <Button
            onClick={() =>
              handlePingAndRedirect(user ? "/explore" : "/register")
            }
            variant={"secondary"}
            className={`bg-accent absolute translate-y-16 cursor-pointer text-xs transition min-[480px]:mt-8 sm:text-sm ${isClicked ? "bg-transparent text-transparent duration-1000" : "duration-500 hover:scale-105"}`}
          >
            Get started
          </Button>
        </div>
      </motion.section>
    </>
  );
};

export default HeroSection;
