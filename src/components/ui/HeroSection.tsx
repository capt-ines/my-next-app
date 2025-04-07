import React from "react";
import { Button } from "./button";

const HeroSection = () => {
  return (
    // <section className="from-primary to-secondary text-background relative flex h-screen flex-col items-center justify-center"
    <section className="flex h-screen items-center">
      <div className="mx-auto flex aspect-square w-full max-w-md min-w-3xs flex-col items-center justify-center rounded-full bg-white px-5 shadow-[0_0_50px_var(--color-white)] transition-shadow duration-1000 hover:shadow-[0_0_200px_var(--color-white)] sm:px-10">
        <div>
          <h1 className="text-shadow-lg text-center font-bold sm:text-2xl">
            Illuminate your soul’s path.
          </h1>
          <p className="text-center text-sm sm:text-lg">
            A powerful set of tools to navigate it with clarity and craft with
            purpose.
          </p>
        </div>
        <Button className="absolute translate-y-16 text-xs sm:mt-8 sm:text-sm">
          Get started
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
