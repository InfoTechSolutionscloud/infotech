import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', "flowbite.s3.amazonaws.com", "pagedone.io", "placehold.co", "i.imgur.com"],
  },
};

export default withNextVideo(nextConfig);
