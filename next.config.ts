import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'memocast.b-cdn.net', protocol: 'https', port: '', pathname: '/**' }
    ]
  }
};

export default nextConfig;
