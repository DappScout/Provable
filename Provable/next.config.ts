import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Allow deployment despite ESLint warnings
  },
  typescript: {
    ignoreBuildErrors: false, // Keep TypeScript type checking
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
