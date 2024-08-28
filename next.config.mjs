/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', "flowbite.s3.amazonaws.com", "pagedone.io", "placehold.co", "i.imgur.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
};
}

export default nextConfig;
