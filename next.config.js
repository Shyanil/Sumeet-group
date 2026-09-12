const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return ['/home-two', '/home_two', '/home-2'].map((source) => ({ source, destination: '/', permanent: true }))
  },
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    ] }]
  },
}

export default nextConfig
