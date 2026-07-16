/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      loader: 'custom',
      loaderFile: './lib/wpImageLoader.js', // Chỉ đường dẫn tới tệp loader vừa tạo
    },
  };
  
  module.exports = nextConfig;