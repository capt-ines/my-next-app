import React, { useEffect, useState } from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import Particle from "./Particle";
import { randomize } from "@/utils/randomize";
import { useThemeContext } from "@/contexts/themeContext";
import MouseLight from "../ui/MouseLight";
import { Button } from "../ui/button";
import useMediaQuery from "@/hooks/useMediaQuery";
import { themesData } from "@/constants/themes";
import { usePathname } from "next/navigation";
import NavIsland from "../ui/NavIsland";

interface LayoutProps {
  children: React.ReactNode;
}

const AuthWrapper = () => <></>;

function Layout({ children }: LayoutProps) {
  const { theme } = useThemeContext();

  const currentTheme = themesData.find((t) => t.key === theme);
  const currentPalette = currentTheme ? currentTheme.palette : [];
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <div className="absolute top-0 left-0 -z-40 h-screen w-screen overflow-hidden blur-3xl">
        <MouseLight />
        <div className="bg-mask/20 pointer-events-none absolute top-0 left-0 z-10 h-full w-full" />
        <div className="absolute -z-30 h-screen w-screen bg-transparent backdrop-blur-3xl"></div>
        {currentPalette && (
          <>
            <Particle
              {...(currentPalette.length > 1 && {
                color: randomize(currentPalette),
              })}
              center={{ x: 100, y: 100 }}
            />
            <Particle
              {...(currentPalette.length > 1 && {
                color: randomize(currentPalette),
              })}
              center={{ x: 100, y: 100 }}
            />
            <Particle
              {...(currentPalette.length > 1 && {
                color: randomize(currentPalette),
              })}
              center={{ x: 800, y: 400 }}
            />
            <Particle
              {...(currentPalette.length > 1 && {
                color: randomize(currentPalette),
              })}
              center={{ x: 200, y: 100 }}
            />
            <Particle
              {...(currentPalette.length > 1 && {
                color: randomize(currentPalette),
              })}
            />
          </>
        )}
      </div>
      <div className="overflow-hidden">
        <div className="relative min-h-screen">
          <div className="absolute right-0 left-0">
            <Header />
          </div>
          <main className="mx-4.5 pt-20 pb-6 sm:pt-26 md:mx-8">
            {children}
            {/* {!isHome && !isDesktop ? <NavIsland /> : null} */}
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
