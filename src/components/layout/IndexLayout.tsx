import React from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import MouseLight from "../ui/MouseLight";

interface LayoutProps {
  children: React.ReactNode;
}

function IndexLayout({ children }: LayoutProps) {
  return (
    <>
      <div className="from-accent/30 absolute h-[1000px] w-screen bg-linear-to-b to-transparent" />
      <div className="from-index-background to-index-background2 overflow-hidden bg-linear-to-b to-60%">
        <div className="absolute h-screen w-screen blur-2xl">
          <MouseLight />
        </div>

        <div className="relative">
          <div className="absolute right-0 left-0">
            <Header />
          </div>
          <main className="mx-6 mb-20">{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default IndexLayout;
