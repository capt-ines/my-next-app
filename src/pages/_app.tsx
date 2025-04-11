import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import "../styles/global-styles.css";
import { Button } from "@/components/ui/button";

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      {/* <style jsx global>{`
        html {
          color: var(--foreground);
          background-color: black;
        }
      `}</style> */}
      {getLayout(<Component {...pageProps} />)}
      <Button className="fixed bottom-0 left-0" onClick={toggleTheme} />
    </>
  );
}
