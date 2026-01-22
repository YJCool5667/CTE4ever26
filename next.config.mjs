/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    typedRoutes: true
  },
  async redirects() {
    return [
      { source: '/eng', destination: '/en', permanent: true },
      { source: '/eng/:path*', destination: '/en/:path*', permanent: true },
      { source: '/laos', destination: '/lo', permanent: true },
      { source: '/laos/:path*', destination: '/lo/:path*', permanent: true },
      // legacy html links
      { source: '/:slug(index|about|business|impact|actions|projects|contact|partnership).html', destination: '/ko/:slug', permanent: true },
      { source: '/eng/:slug(index|about|business|impact|actions|projects|contact|partnership).html', destination: '/en/:slug', permanent: true },
      { source: '/laos/:slug(index|about|business|impact|actions|projects|contact|partnership).html', destination: '/lo/:slug', permanent: true }
    ];
  }
};
export default nextConfig;
