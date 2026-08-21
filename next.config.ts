import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/work/case-study-template",
        destination: "/work/transcript-review-redesign",
        permanent: true,
      },
      {
        source: "/work/bitcoin-dev-project",
        destination: "/work/bitcoin-dev-project-redesign",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
