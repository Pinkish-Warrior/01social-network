/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    ppr: 'incremental'
  },
  images: { // new way to add external domains, to allow use it
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',  // Allow any path under 'picsum.photos'
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*', // Proxy to your Go backend
      },
    ];
  },
};

export default nextConfig;
