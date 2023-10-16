const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  fallbacks: {}
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withPWA(nextConfig)
