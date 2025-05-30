import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import "../styles/global-styles.css";
import { Button } from "@/components/ui/button";
import UserProvider from "@/contexts/userContext";
import { ThemeProvider } from "@/contexts/themeContext";

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <UserProvider initialUser={pageProps.user ?? null}>
      <ThemeProvider>
        <style jsx global>{`
          html {
            background-color: var(--color-global-background);
            transition:
              background-color 0.5s ease,
              color 0.5s ease;
          }
        `}</style>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </UserProvider>
  );
}
