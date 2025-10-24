import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.pngitem.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

