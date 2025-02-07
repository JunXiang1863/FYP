/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['vercel.com'], // Add any domains you're using for images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    serverActions: true,
  },
  // Add this to handle potential timeout issues
  serverRuntimeConfig: {
    timeoutMs: 30000, // 30 seconds
  },
}

module.exports = nextConfig 