import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    unoptimized: true, // quick deploy; remove if using Next.js optimization
    // domains: ["example.com"], // optional if you want optimized external images
  },

  // Optional for clean URLs
  trailingSlash: false,

  // ⚠ Do not add turbopack unless ready
};

export default nextConfig;