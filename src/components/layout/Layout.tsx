import React, { useEffect, useState } from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import Particle from "./Particle";
import { randomize } from "@/utils/randomize";
import { useThemeContext } from "@/contexts/themeContext";
import { V } from "vitest/dist/chunks/reporters.d.CfRkRKN2.js";
import { Button } from "../ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

const AuthWrapper = () => <></>;

function Layout({ children }: LayoutProps) {
  const palettesData = {
    sage: [
      "#34c6e3",
      "#c8df77",
      "#b577f3",
      "#c5b3d6",
      "#87ff5f",
      "#8ef5b4",
      "#a3ab78",
    ],
    twinFlame: [
      "#e8a6f4",
      "#ce93d8",
      "#ab47bc",
      "#ea1e2c",
      "#ff2466",
      "#ff8e8e",
      "#4f47bc",
    ],
  };

  const { theme, setTheme } = useThemeContext();

  const currentPalette = palettesData[theme] || null;

  return (
    <>
      <div className="absolute top-0 left-0 -z-40 h-screen w-screen overflow-hidden blur-3xl">
        <div className="absolute -z-30 h-screen w-screen bg-transparent backdrop-blur-3xl"></div>
        <Particle
          {...(currentPalette && { color: randomize(currentPalette) })}
          center={{ x: 100, y: 100 }}
        />
        <Particle
          {...(currentPalette && { color: randomize(currentPalette) })}
          center={{ x: 100, y: 100 }}
        />
        <Particle
          {...(currentPalette && { color: randomize(currentPalette) })}
          center={{ x: 800, y: 400 }}
        />
        <Particle
          {...(currentPalette && { color: randomize(currentPalette) })}
          center={{ x: 200, y: 100 }}
        />
        <Particle
          {...(currentPalette && { color: randomize(currentPalette) })}
        />
      </div>
      <div className="overflow-hidden">
        <div className="relative min-h-screen">
          <div className="absolute right-0 left-0">
            <Header />
          </div>
          <main className="mx-6 mb-20 py-18 md:mx-8">{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
