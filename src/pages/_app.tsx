import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import "../styles/global-styles.css";
import { Button } from "@/components/ui/button";
import UserProvider from "@/contexts/userContext";

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <UserProvider initialUser={pageProps.user ?? null}>
      <style jsx global>{`
        html {
          background-color: var(--color-global-background);
        }
      `}</style>
      {getLayout(<Component {...pageProps} />)}
      <Button className="fixed bottom-0 left-0" onClick={toggleTheme} />
    </UserProvider>
  );
}
