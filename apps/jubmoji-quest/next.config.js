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
    ];
  },
};

module.exports = nextConfig;
