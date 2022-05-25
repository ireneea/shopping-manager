/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [
      path.join(__dirname, "node_modules", "foundation-sites", "scss"),
    ],
  },
};

module.exports = nextConfig;
