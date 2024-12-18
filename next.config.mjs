/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net', // För Contentful bilder
        pathname: '/**', // Tillåt alla bildvägar
      },
      {
        protocol: 'https',
        hostname: 'videos.ctfassets.net', // För Contentful videor (om du använder dem för bakgrundsbilder)
        pathname: '/**', // Tillåt alla videovägar
      },
    ],
  },
};

export default nextConfig;
