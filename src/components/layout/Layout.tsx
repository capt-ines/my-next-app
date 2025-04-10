import React from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="from-accent/80 overflow-hidden bg-linear-to-b to-transparent">
      <Header />
      <main className="mx-6 mb-20">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
