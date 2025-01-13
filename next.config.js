// @ts-check
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://34.47.132.153:8080/api',
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
 
module.exports = nextConfig