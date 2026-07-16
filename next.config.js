/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i0.wp.com',
        },
        {
          protocol: 'https',
          hostname: 'longwebstudio.io.vn',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
      ],
      loader: 'custom',
      loaderFile: './lib/wpImageLoader.js', // Chỉ đường dẫn tới tệp loader vừa tạo
    },
  };
  
  module.exports = nextConfig;