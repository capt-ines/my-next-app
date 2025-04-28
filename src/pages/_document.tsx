import Document, { Html, Head, Main, NextScript } from "next/document";
export default function MyDocument() {
  const themeScript = `
    document.documentElement.classList.toggle(
      "seeker",
      localStorage.theme === "seeker" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  `;
  return (
    <Html>
      <Head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/png"
          sizes="32x32"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
