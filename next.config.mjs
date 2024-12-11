/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'flowbite.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'pagedone.io',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'imgur.com',
      },
    ],
  },
  // We handle PDFs separately in your backend API or other logic
  async rewrites() {
    return [
      {
        source: '/uploads/images/:path*',
        destination: '/uploads/images/:path*', // handle image file rewrites if necessary
      },
      {
        source: '/uploads/pdfs/:path*',
        destination: '/uploads/pdfs/:path*', // handle PDF file rewrites if necessary
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Additional settings can be added here based on your app's requirements
};

export default nextConfig;
