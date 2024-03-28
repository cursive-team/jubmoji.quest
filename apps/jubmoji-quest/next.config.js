const withPWA = require("next-pwa")({
  dest: "public",
  cacheOnFrontEndNav: true,
});

module.exports = withPWA({
  reactStrictMode: true,
  webpack: (config) => {
    // Needed to make snarkJs work client side
    config.resolve.fallback = { fs: false, readline: false };
    return config;
  },
  async redirects() {
    return [
      {
        source: "/airtable",
        destination:
          "https://airtable.com/apprikYUs5WuXJRbN/tblEFhdjC2nEWP4cQ/viwFeEgb7Kfy08Jaa?blocks=hide",
        permanent: true,
      },
      {
        source: "/cardforyou",
        destination:
          "https://airtable.com/apprikYUs5WuXJRbN/shrep6Pp59ukNJp34/tblEFhdjC2nEWP4cQ",
        permanent: true,
      },
      {
        source: "/zuhunt",
        destination: "https://www.jubmoji.quest/quests/8",
        permanent: true,
      },
      {
        source: "/zuhunt-test",
        destination: "https://www.jubmoji.quest/quests/7",
        permanent: true,
      },
      {
        source: "/kiba",
        destination: "https://www.jubmoji.quest/quests/28",
        permanent: true,
      },
      {
        source: "/card-request",
        destination: "https://airtable.com/apprikYUs5WuXJRbN/shrIHSLl3CiJ76OxI",
        permanent: true,
      },
      {
        source: "/quest-proposal",
        destination: "https://airtable.com/apprikYUs5WuXJRbN/shrmBY44Nzg3o2nn8",
        permanent: true,
      },
      {
        source: "/about",
        destination:
          "https://cursive-team.notion.site/Jubmoji-Quest-About-d22f93fdc3c74c2a83d4e2b4d7e93d52",
        permanent: true,
      },
      {
        source: "/feedback",
        destination: "https://airtable.com/apprikYUs5WuXJRbN/shrFAEnmSEuaCiGw2",
        permanent: true,
      },
    ];
  },
});
