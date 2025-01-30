// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_API_URL: 'https://kz-history.kz/api'
    },
    eslint: {

        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                hostname: 'https://kz-history.kz',
            },
            {
                hostname: 'localhost'
            }
        ],
    }
}

module.exports = nextConfig