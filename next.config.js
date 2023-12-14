/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        API: process.env.TEST_API
    }
}

module.exports = nextConfig
