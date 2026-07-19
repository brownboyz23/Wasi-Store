/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },

  transpilePackages: [],
}

module.exports = nextConfig