import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { Zeyada, Nunito, Italiana } from "next/font/google";
import "../styles/global-styles.css";
import { Button } from "@/components/ui/button";

const zeyada = Zeyada({
  subsets: ["latin"],
  weight: "400",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
});

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
