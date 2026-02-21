/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
      {
        protocol: 'https',
        hostname: 'www.themoviedb.org',
      },
    ],
  },
  // Enable static exports for Vercel optimization
  output: 'standalone',
  // Compression for better performance
  compress: true,
  // Strict mode for React 18+
  reactStrictMode: true,
  // Power optimizations
  swcMinify: true,
  // i18n config
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localeDetection: true,
  },
}

module.exports = nextConfig
