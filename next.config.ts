import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // Enable styled-components support
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
