/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co'
            }
        ]
    }
};

module.exports = nextConfig;
