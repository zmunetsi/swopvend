/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/dgb0jexdk/',
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
