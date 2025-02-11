import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ✅ Place sassOptions at the root level
  sassOptions: {
    includePaths: ['./src'],
  },

  webpack(config) {
    // ✅ Fix: Remove sassOptions from Webpack rules
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
