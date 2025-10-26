import type { NextConfig } from "next";
import { redirect } from "next/dist/server/api-utils";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/sv',
        permanent: true,
      },
    ]
  },
}

export default nextConfig;
