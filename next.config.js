/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "videos.pexels.com" },
      { protocol: "https", hostname: "assets.mixkit.co" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
};

module.exports = nextConfig;
