/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['dog-breed-selector-images.s3.ap-northeast-1.amazonaws.com'], // Add any other domains you use for images
    },
    // Keep any other existing configurations you might have
  };
  
  export default nextConfig;