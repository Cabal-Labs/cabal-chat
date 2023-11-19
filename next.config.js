/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        CLIENT_ID: process.env.CLIENT_ID,
        BASE_RPC: process.env.BASE_RPC,

      },
}

module.exports = nextConfig
