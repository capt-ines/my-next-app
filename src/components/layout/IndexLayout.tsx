import React from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import MouseLight from "../ui/MouseLight";

interface LayoutProps {
  children: React.ReactNode;
}

function IndexLayout({ children }: LayoutProps) {
  return (
    <div className="from-accent/20 overflow-hidden bg-linear-to-b to-transparent">
      <MouseLight />
      <div className="relative">
        <div className="absolute right-0 left-0">
          <Header />
        </div>
        <main className="mx-6">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default IndexLayout;
