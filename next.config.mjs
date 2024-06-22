import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/files/:path*',
                destination: 'http://localhost:4000/files/:path*',
            }
        ]
    },images: {
        domains: ['cosi.bu.ac.th'],
    },
};

export default withNextIntl(nextConfig);