// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: 'http://185.32.84.190/api',
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
            }
        ],
    }
}

module.exports = nextConfig