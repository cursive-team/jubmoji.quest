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

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
