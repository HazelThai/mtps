import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // experimental: {
  //   middlewarePrefetch: 'strict',
  // }
  images: {
    domains: ["www.google.com"],
  }
};

export default nextConfig;
