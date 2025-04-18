/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: 'http://localhost:4000/graphql',
      },
    ];
  },
};

export default nextConfig; 
