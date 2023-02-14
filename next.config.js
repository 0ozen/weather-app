/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'cdn.weatherapi.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
// cdn.weatherapi.com