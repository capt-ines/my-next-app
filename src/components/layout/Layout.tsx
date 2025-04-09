import React from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-global-background flex h-screen flex-col justify-between">
      <div className="mx-6">
        <Header />
        <main className="mt-8 mb-20">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
