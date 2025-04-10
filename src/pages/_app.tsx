import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { Zeyada, Nunito_Sans } from "next/font/google";
import "../styles/global-styles.css";
import { Button } from "@/components/ui/button";

const zeyada = Zeyada({
  subsets: ["latin"],
  weight: "400",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "200",
});

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${nunito.style.fontFamily};
          color: var(--foreground);
          background-color: black;
        }
        /* h1 {
          font-family: ${zeyada.style.fontFamily};
          font-size: 1.875rem;
        } */
      `}</style>
      {getLayout(<Component {...pageProps} />)}
      <Button className="fixed bottom-0 left-0" onClick={toggleTheme} />
    </>
  );
}
