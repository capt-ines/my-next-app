import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const bbebb: any = 100;
  return (
    <Html lang="en">
      <Head />
      {bbebb}
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
