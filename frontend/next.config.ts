import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const nextConfig: NextConfig = {
  output: 'standalone', // ✅ Important for Railway Deployment
  sassOptions: {
    includePaths: ['./src'],
  },

  webpack(config: Configuration) {
    if (config.module?.rules) {
      config.module.rules.forEach((rule) => {
        if (rule && typeof rule === 'object' && rule.test instanceof RegExp && rule.test.toString().includes('scss')) {
          if (Array.isArray(rule.use)) {
            rule.use.forEach((loader) => {
              if (loader && typeof loader === 'object' && loader.loader?.includes('sass-loader')) {
                loader.options = {
                  implementation: require('sass'),
                };
              }
            });
          }
        }
      });
    }

    config.module?.rules?.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;