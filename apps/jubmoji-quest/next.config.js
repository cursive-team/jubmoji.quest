/** @type {import('next').NextConfig} */
const nextConfig = {
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
        source: "/card-request",
        destination: "https://airtable.com/apprikYUs5WuXJRbN/shrIHSLl3CiJ76OxI",
        permanent: true,
      },
      {
        source: "/about",
        destination:
          "https://pse-team.notion.site/Jubmojis-One-Pager-c9c9c8e6d8ed4c84a37aaa121d03d03c",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
