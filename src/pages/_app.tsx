import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { Zeyada, Nunito_Sans } from "next/font/google";
import "../styles/global-styles.css";
import MouseLight from "@/components/ui/MouseLight";

const zeyada = Zeyada({
  subsets: ["latin"],
  weight: "400",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${nunito.style.fontFamily};
          background-color: var(--background);
          color: var(--on-background);
          font-size: 16px;
        }
        /* h1 {
          font-family: ${zeyada.style.fontFamily};
          font-size: 1.875rem;
        } */
      `}</style>
      {getLayout(<Component {...pageProps} />)};
    </>
  );
}
