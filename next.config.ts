import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
});

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-c1b1115f451f49a0888914c18175cc2c.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev',
      },
    ],
  },
};

export default withPWA(nextConfig);
