import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["picsum.photos"], // Add placeholder domain to allow external image loading
  },
}

export default nextConfig
