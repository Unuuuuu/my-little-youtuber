/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "yt3.ggpht.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/__/auth/handler",
        destination:
          "https://my-little-y0utuber.firebaseapp.com/__/auth/handler",
      },
      {
        source: "/__/auth/handler.js",
        destination:
          "https://my-little-y0utuber.firebaseapp.com/__/auth/handler.js",
      },
      {
        source: "/__/auth/experiments.js",
        destination:
          "https://my-little-y0utuber.firebaseapp.com/__/auth/experiments.js",
      },
      {
        source: "/__/auth/iframe",
        destination:
          "https://my-little-y0utuber.firebaseapp.com/__/auth/iframe",
      },
      {
        source: "/__/auth/iframe.js",
        destination:
          "https://my-little-y0utuber.firebaseapp.com/__/auth/iframe.js",
      },
    ];
  },
};

module.exports = nextConfig;
