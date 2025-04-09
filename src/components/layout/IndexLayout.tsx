import React from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import MouseLight from "../ui/MouseLight";

interface LayoutProps {
  children: React.ReactNode;
}

function IndexLayout({ children }: LayoutProps) {
  return (
    <div className="overflow-hidden bg-slate-900">
      <MouseLight />
      <div className="relative mx-6">
        <div className="absolute right-0 left-0">
          <Header />
        </div>
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default IndexLayout;
