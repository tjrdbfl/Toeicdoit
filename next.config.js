const { withNextVideo } = require('next-video/process')

const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      dirs: ['src'],
    },
    
    reactStrictMode: true,
    swcMinify: true,
  
    // Uncoment to add domain whitelist
    // images: {
    //  domains: [
    //    'res.cloudinary.com',
    //  ],
    // },
  
    webpack(config,{isServer}) {
      // Grab the existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.('.svg')
      );

      config.resolve.alias['jotai'] = path.resolve(__dirname, 'node_modules/jotai');
      
      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: { not: /\.(css|scss|sass)$/ },
          resourceQuery: { not: /url/ }, // exclude if *.svg?url
          loader: '@svgr/webpack',
          options: {
            dimensions: false,
            titleProp: true,
          },
        }
      );
  
      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      fileLoaderRule.exclude = /\.svg$/i;
  
      return config;
    },
  };
  
  module.exports = withNextVideo(nextConfig);
  module.exports = {
    images:{
      domains:['dummyimage.com','lh3.googleusercontent.com','kr.object.ncloudstorage.com']
    }
  }