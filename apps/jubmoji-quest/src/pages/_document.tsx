import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      ></meta>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* PREFECT IMAGES */}
      <link rel="prefetch" href="/images/no-jubmojis.png" />
      <link rel="prefetch" href="/images/onboarding-privacy.svg" />
      <link rel="prefetch" href="/images/onboarding-backup.svg" />
      <link rel="prefetch" href="/images/onboarding-quests.svg" />

      {/* PWA HEAD META */}

      <meta name="application-name" content="jubmoji.quest" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="jubmoji.quest" />
      <meta name="description" content="" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#000000" />

      <link rel="apple-touch-icon" href="/ios/64.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/ios/152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/ios/180.png" />

      <link rel="icon" type="image/png" sizes="32x32" href="/ios/32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/ios/16.png" />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="mask-icon"
        href="/icons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <link rel="shortcut icon" href="/favicon.ico" />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
