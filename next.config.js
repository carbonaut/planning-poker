/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
      "/room/[id]": { page: "/room/[id]" },
    };
  },
};

module.exports = nextConfig;
