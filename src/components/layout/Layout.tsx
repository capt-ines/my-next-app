import React from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import Particle from "./Particle";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="absolute top-0 left-0 -z-40 h-screen w-screen overflow-hidden blur-3xl">
        <div className="absolute -z-30 h-screen w-screen bg-transparent backdrop-blur-3xl"></div>
        <Particle center={{ x: 100, y: 100 }} />
        <Particle center={{ x: 100, y: 100 }} />
        <Particle center={{ x: 800, y: 400 }} />
        <Particle center={{ x: 200, y: 100 }} />
        <Particle />
      </div>
      <div className="bg-global-background/30 min-h-screen min-w-screen overflow-hidden">
        <Header />
        <main className="mt-4 mb-20 min-h-[calc(100vh-160px)] md:mt-6">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
