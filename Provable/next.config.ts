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
    
    // Handle React Native dependencies for web
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "react-native": false,
    };
    
    // Mock React Native modules for web
    config.resolve.alias = {
      ...config.resolve.alias,
      "@react-native-async-storage/async-storage": require.resolve("./lib/async-storage-mock.js"),
    };
    
    return config;
  },
};

export default nextConfig;
