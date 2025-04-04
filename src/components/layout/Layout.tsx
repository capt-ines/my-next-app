import React from "react";
import Footer from "../ui/Footer";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./themes";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <header>
          <h1>h1</h1>
        </header>
        <main>{children}</main>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default Layout;
