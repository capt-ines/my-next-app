import React from "react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="from-accent/80 min-h-screen overflow-hidden bg-linear-to-b to-transparent">
      <Header />
      <main className="mt-4 mb-20 min-h-[calc(100vh-180px)] md:mt-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
