// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_URL: 'http://localhost:8080/api'
    },
    eslint: {

        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                hostname: '185.32.84.190',
            },
            {
                hostname: 'localhost'
            }
        ],
    }
}

module.exports = nextConfig