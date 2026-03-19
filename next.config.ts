import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // recommended for dev

  typescript: {
    ignoreBuildErrors: false, // stop build if TS errors
  },

  images: {
    unoptimized: true, // optional
  },

  // ⚠ Do NOT add turbopack here unless you are sure of the root
};

export default nextConfig;