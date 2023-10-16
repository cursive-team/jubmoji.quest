import { Html, Head, Main, NextScript } from "next/document";

// TODO: change meta APP values with constants
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="application-name" content="Jumboji" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Jumboji" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://nfctap.xyz" />
        <meta name="twitter:title" content="Jumboji" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="PWA App" />
        <meta property="og:site_name" content="PWA App" />
        <meta property="og:url" content="https://nfctap.xyz" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
