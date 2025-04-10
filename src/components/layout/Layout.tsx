import React from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="from-accent/80 flex min-h-screen flex-col justify-between overflow-hidden bg-linear-to-b to-transparent">
      <div className="block">
        <Header />
        <main className="mt-4 mb-20 md:mt-6">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
